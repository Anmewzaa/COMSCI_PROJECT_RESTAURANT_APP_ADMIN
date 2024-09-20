// SWAL
import Swal from "sweetalert2";
// React Hook
import { useState, useEffect } from "react";
// Axios
import axios from "axios";
// CSS
import "../CSS/LoginPage.css";

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
  const submitForm = (e) => {
    e.preventDefault();
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
            title: "Sign In Success",
            text: "...",
          }).then(() => {
            window.location.href = "/admin/";
          });
        }
        setState({ username: "", password: "" });
      });
  };

  return (
    <>
      <div className="login-page-container">
        <div className="container-box">
          <div className="container-image">
            <h3>Need some Pizza, yo?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse aut
              consectetur modi possimus ducimus? Obcaecati, dignissimos? Eius
              dolores deserunt accusamus?
            </p>
          </div>
          <form onSubmit={submitForm} className="container-form">
            <h3 className="mb-1 sarabun-bold">Paradise Steak House</h3>
            <input
              type="text"
              placeholder="username"
              value={state.username}
              onChange={inputValue("username")}
              className="input-text sarabun-regular"
            />
            <input
              type="password"
              placeholder="password"
              value={state.password}
              onChange={inputValue("password")}
              className="input-text sarabun-regular mb-2"
            />
            <button type="submit" className="btn-full cursor sarabun-semibold">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
