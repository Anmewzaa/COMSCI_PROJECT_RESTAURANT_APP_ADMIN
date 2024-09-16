// React Hook
import { useState, useEffect } from "react";
// SWAL
import Swal from "sweetalert2";
// Axios
import axios from "axios";
// Components
import BackFooter from "../../Components/BackFooter";

const CreateEmployeePage = () => {
  const [userinfo, setUserInfo] = useState({
    user_fullname: "",
    user_nickname: "",
    user_telnum: "",
    user_role: "",
    user_access_rights: "",
    account_username: "",
    account_password: "",
  });
  const inputValue = (name) => (event) => {
    setUserInfo({ ...userinfo, [name]: event.target.value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/user/create`,
        {
          user_fullname: userinfo.user_fullname,
          user_nickname: userinfo.user_nickname,
          user_telnum: userinfo.user_telnum,
          user_role: userinfo.user_role,
          user_access_rights: userinfo.user_access_rights,
          account_username: userinfo.account_username,
          account_password: userinfo.account_password,
        },
        {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        }
      )
      .then((result) => {
        if (result.data.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: result.data.error,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "เพิ่มพนักงานเสร็จสมบูรณ์",
            text: "...",
          }).then(() => {
            window.location.href = "/admin/employee";
          });
        }
      });
  };
  return (
    <>
      <form onSubmit={submitForm} className="form">
        <div className="form-menu-container">
          <div>
            <label className="sarabun-semibold">ชื่อพนักงาน</label>
            <input
              type="text"
              placeholder="ชื่อพนักงาน"
              value={userinfo.user_fullname}
              onChange={inputValue("user_fullname")}
              className="sarabun-regular"
              required
            />
          </div>
          <div>
            <label className="sarabun-semibold">ชื่อเล่นพนักงาน</label>
            <input
              type="text"
              placeholder="ชื่อเล่นพนักงาน"
              value={userinfo.user_nickname}
              onChange={inputValue("user_nickname")}
              className="sarabun-regular"
              required
            />
          </div>
          <div>
            <label className="sarabun-semibold">เบอร์พนักงาน</label>
            <input
              type="text"
              placeholder="เบอร์พนักงาน"
              value={userinfo.user_telnum}
              onChange={inputValue("user_telnum")}
              className="sarabun-regular"
              required
            />
          </div>
          <div>
            <label className="sarabun-semibold">ตำแหน่ง</label>
            <select
              value={userinfo.user_role}
              onChange={inputValue("user_role")}
              className="sarabun-regular"
            >
              <option value="">เลือกตัวเลือก</option>
              <option value="ผู้จัดการ">ผู้จัดการ</option>
              <option value="พนักงานเสิร์ฟ">พนักงานเสิร์ฟ</option>
              <option value="พนักงานครัว">พนักงานครัว</option>
            </select>
          </div>
          <div>
            <label className="sarabun-semibold">สิทธิการเข้าถึงพนักงาน</label>
            <select
              value={userinfo.user_access_rights}
              onChange={inputValue("user_access_rights")}
              className="sarabun-regular"
            >
              <option value="">เลือกตัวเลือก</option>
              <option value="Employee">Employee</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="sarabun-semibold">username</label>
            <input
              type="text"
              placeholder="username"
              value={userinfo.account_username}
              onChange={inputValue("account_username")}
              className="sarabun-regular"
              required
            />
          </div>
          <div>
            <label className="sarabun-semibold">password</label>
            <input
              type="text"
              placeholder="password"
              value={userinfo.account_password}
              onChange={inputValue("account_password")}
              className="sarabun-regular"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn-full btn-green cursor sarabun-semibold"
        >
          เพิ่มพนักงาน
        </button>
      </form>
      <BackFooter props={"/admin/employee"} />
    </>
  );
};

export default CreateEmployeePage;
