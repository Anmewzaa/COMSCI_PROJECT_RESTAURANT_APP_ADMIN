// SWAL
import Swal from "sweetalert2";
// React Hook
import { useState, useEffect } from "react";
// Axios
import axios from "axios";
// CSS
import "../CSS/LoginPage.css";
// Image
import Home01 from "../../images/home-1.jpg";
import Home02 from "../../images/home-2.jpg";
import Home03 from "../../images/home-3.jpg";
import Home04 from "../../images/home-4.jpg";

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
            window.location.href = "/";
          });
        }
        setState({ username: "", password: "" });
      });
  };

  return (
    <form onSubmit={submitForm}>
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
  );
};

export default LoginPage;
