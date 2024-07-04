// SWAL
import Swal from "sweetalert2";
// React Hook
import { useState, useEffect } from "react";
// Axios
import axios from "axios";

const LoginPage = () => {
  useEffect(() => {
    if (localStorage.getItem("PARADISE_LOGIN_TOKEN")) {
      return (window.location.href = "/admin/");
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
      <div className="box">
        <h2>Paradise Steak House</h2>
        <form onSubmit={submitForm}>
          <input
            type="text"
            placeholder="username"
            value={state.username}
            onChange={inputValue("username")}
          />
          <input
            type="password"
            placeholder="password"
            value={state.password}
            onChange={inputValue("password")}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
