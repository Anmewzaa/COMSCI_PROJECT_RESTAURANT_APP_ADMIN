// React Hook
import { useState } from "react";
// SWAL
import Swal from "sweetalert2";
// Axios
import axios from "axios";
// Antd
import { Select, Input, Button } from "antd";

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
            <label className="prompt-semibold">ชื่อพนักงาน</label>
            <Input
              placeholder="ชื่อพนักงาน"
              onChange={inputValue("user_fullname")}
              className="prompt-regular"
              size={"large"}
              required
            />
          </div>
          <div>
            <label className="prompt-semibold">ชื่อเล่นพนักงาน</label>
            <Input
              placeholder="ชื่อเล่นพนักงาน"
              onChange={inputValue("user_nickname")}
              className="prompt-regular"
              size={"large"}
              required
            />
          </div>
          <div>
            <label className="prompt-semibold">เบอร์พนักงาน</label>
            <Input
              placeholder="เบอร์พนักงาน"
              onChange={inputValue("user_telnum")}
              className="prompt-regular"
              size={"large"}
              required
            />
          </div>
          <div>
            <label className="prompt-semibold">ตำแหน่ง</label>
            <Select
              className="prompt-regular"
              size={"large"}
              style={{ width: "100%" }}
              showSearch
              placeholder="เลือกตำแหน่ง"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: "ผู้จัดการ", label: "ผู้จัดการ" },
                { value: "พนักงานเสิร์ฟ", label: "พนักงานเสิร์ฟ" },
                { value: "พนักงานครัว", label: "พนักงานครัว" },
              ]}
              value={userinfo.user_role}
              onChange={(value) =>
                setUserInfo({ ...userinfo, user_role: value })
              }
            />
          </div>
          <div>
            <label className="prompt-semibold">สิทธิการเข้าถึงพนักงาน</label>
            <Select
              className="prompt-regular"
              size={"large"}
              style={{ width: "100%" }}
              showSearch
              placeholder="เลือกตำแหน่ง"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: "Employee", label: "ธรรมดา" },
                { value: "Admin", label: "แอดมิน" },
              ]}
              value={userinfo.user_access_rights}
              onChange={(value) =>
                setUserInfo({ ...userinfo, user_access_rights: value })
              }
            />
          </div>
          <div>
            <label className="prompt-semibold">ชื่อเข้าสู่ระบบ</label>
            <Input
              placeholder="ชื่อเข้าสู่ระบบ"
              onChange={inputValue("account_username")}
              className="prompt-regular"
              size={"large"}
              required
            />
          </div>
          <div>
            <label className="prompt-semibold">รหัสผ่าน</label>
            <Input
              placeholder="รหัสผ่าน"
              onChange={inputValue("account_password")}
              className="prompt-regular"
              size={"large"}
              required
            />
          </div>
        </div>
        <Button
          className="prompt-regular"
          block
          htmlType="submit"
          size={"large"}
          style={{
            background: "linear-gradient(45deg, #00C853 0%, #00C853 100%)",
            color: "#fff",
            border: "none",
          }}
        >
          เพิ่มพนักงาน
        </Button>
      </form>
    </>
  );
};

export default CreateEmployeePage;
