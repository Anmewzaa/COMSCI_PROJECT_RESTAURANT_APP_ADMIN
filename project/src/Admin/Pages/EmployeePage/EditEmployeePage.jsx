// Axios
import axios from "axios";
// React Hook
import { useState, useEffect } from "react";
// React Router Dom
import { useParams } from "react-router-dom";
// SWAL
import Swal from "sweetalert2";
// Antd
import { Select, Input, Button, Spin } from "antd";

const EditEmployeePage = () => {
  const [spinning, setSpinning] = useState(true);
  const { id } = useParams();
  const [userinfo, setUserInfo] = useState({
    user_fullname: "",
    user_nickname: "",
    user_telnum: "",
    user_role: "",
    user_access_rights: "",
  });
  const fetchAPI = async () => {
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .get(`${import.meta.env.VITE_API_URL}/authen/user/get/${id}`, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      })
      .then((data) => {
        setInitialValue("user_fullname", data.data.response.user_fullname);
        setInitialValue("user_nickname", data.data.response.user_nickname);
        setInitialValue("user_telnum", data.data.response.user_telnum);
        setInitialValue("user_role", data.data.response.user_role);
        setInitialValue(
          "user_access_rights",
          data.data.response.user_access_rights
        );
        setSpinning(false);
      });
  };
  const setInitialValue = (name, value) => {
    setUserInfo((prevCategories) => ({
      ...prevCategories,
      [name]: value,
    }));
  };
  const inputValue = (name) => (event) => {
    setUserInfo({ ...userinfo, [name]: event.target.value });
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  const submitForm = async (e) => {
    e.preventDefault();
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .put(
        `${import.meta.env.VITE_API_URL}/authen/user/update/${id}`,
        {
          user_fullname: userinfo.user_fullname,
          user_nickname: userinfo.user_nickname,
          user_telnum: userinfo.user_telnum,
          user_role: userinfo.user_role,
          user_access_rights: userinfo.user_access_rights,
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
            title: "อัพเดทรายการอาหารเสร็จสมบูรณ์",
            text: "...",
          }).then(() => {
            window.location.href = "/admin/employee";
          });
        }
      });
  };
  return (
    <>
      <Spin fullscreen spinning={spinning} />
      <form onSubmit={submitForm} className="form">
        <div className="form-menu-container">
          <div>
            <label className="prompt-semibold">ชื่อพนักงาน</label>
            <Input
              value={userinfo.user_fullname}
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
              value={userinfo.user_nickname}
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
              value={userinfo.user_telnum}
              placeholder="เบอร์พนักงาน"
              onChange={inputValue("user_telnum")}
              className="prompt-regular"
              size={"large"}
              required
            />
          </div>
          <div>
            <label className="prompt-semibold">ตำแหน่งพนักงาน</label>
            <Select
              size={"large"}
              style={{ width: "100%" }}
              showSearch
              className="prompt-regular"
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
                { value: "Employee", label: "พนักงาน" },
                { value: "Admin", label: "แอดมิน" },
              ]}
              value={userinfo.user_access_rights}
              onChange={(value) =>
                setUserInfo({ ...userinfo, user_access_rights: value })
              }
            />
          </div>
        </div>
        <Button
          className=""
          block
          htmlType="submit"
          size={"large"}
          style={{
            background: "linear-gradient(45deg, #00C853 0%, #00C853 100%)",
            color: "#fff",
            border: "none",
          }}
        >
          อัพเดทหมวดหมู่อาหาร
        </Button>
      </form>
    </>
  );
};

export default EditEmployeePage;
