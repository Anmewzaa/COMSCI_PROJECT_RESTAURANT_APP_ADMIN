// SWAL
import Swal from "sweetalert2";
// React Hook
import { useState, useEffect } from "react";
// Axios
import axios from "axios";
// CSS
import "../CSS/LoginPage.css";
// Antd
import { Button, Input } from "antd";
// Picture
import logo from "../../images/app-logo.png";

const LoginPage = () => {
  useEffect(() => {
    if (localStorage.getItem("PARADISE_LOGIN_TOKEN")) {
      return (window.location.href = "/");
    }
  }, []);
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };
  const submitForm = () => {
    if (!(state.username && state.password)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "กรุณากรอกให้ครบถ้วน",
      });
    }
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        account_username: state.username,
        account_password: state.password,
      })
      .then((result) => {
        if (result.data.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: result.data.error,
          });
        } else {
          localStorage.setItem(
            "PARADISE_LOGIN_TOKEN",
            result.data.response[0].token
          );
          Swal.fire({
            icon: "success",
            title: "เข้าสู่ระบบสำเร็จ",
            text: "ยินดีต้อนรับเข้าสู่ระบบจัดการร้านอาหารพาราไดซ์สเต็กเฮาส์",
          }).then(() => {
            window.location.href = "/";
          });
        }
        setState({ username: "", password: "" });
      });
  };

  return (
    <>
      <div className="login-container-desktop">
        <div className="login-box">
          <img src={logo} alt="website-logo" />
          <div>
            <h4 className="mb-1 prompt-bold">ลงชื่อเข้าใช้งาน</h4>
            <Input
              type="text"
              placeholder="ชื่อผู้ใช้"
              size="large"
              value={state.username}
              onChange={inputValue("username")}
              className="cursor mr-1 prompt-semibold mb-1"
            />
            <Input
              type="password"
              placeholder="รหัสผ่าน"
              size="large"
              value={state.password}
              onChange={inputValue("password")}
              className="cursor mr-1 prompt-semibold mb-1"
            />
            <Button
              onClick={() => submitForm()}
              block
              size="large"
              className="prompt-bold btn-login-desktop"
            >
              เข้าสู่ระบบ
            </Button>
            <Button
              onClick={() => submitForm()}
              className="prompt-semibold btn-login-mobile"
              block
              htmlType="submit"
              size={"large"}
              style={{
                background:
                  "linear-gradient(45deg, rgb(253, 126, 20) 0%, rgb(251, 195, 24))",
                color: "#fff",
                border: "none",
              }}
            >
              เข้าสู่ระบบ
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
