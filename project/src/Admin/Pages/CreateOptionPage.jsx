// React Hook
import { useState } from "react";
// SWAL
import Swal from "sweetalert2";
// Axios
import axios from "axios";
// Components
import BackFooter from "../Components/BackFooter";

const CreateOptionPage = () => {
  const [option, setOption] = useState({
    thai: "",
    english: "",
    sub_option: [],
  });
  const [subOption, setSubOption] = useState({
    thai: "",
    english: "",
  });
  const inputValue = (name) => (event) => {
    setOption({ ...option, [name]: event.target.value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    if (!(option.thai && option.english && option.sub_option.length === 0)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "กรุณากรอกให้ครบถ้วน",
      });
    }
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/option/create`,
        {
          option_name_thai: option.thai,
          option_name_english: option.english,
          sub_option: option.sub_option,
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
            title: "สร้างรายการอาหารเสร็จสมบูรณ์",
            text: "...",
          }).then(() => {
            window.location.href = "/admin/menu/categories";
          });
        }
      });
  };
  return (
    <>
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="ชื่อส่วนเสริมอาหารภาษาไทย"
          value={option.thai}
          onChange={inputValue("thai")}
        />
        <input
          type="text"
          placeholder="ชื่อส่วนเสริมอาหารภาษาอังกฤษ"
          value={option.english}
          onChange={inputValue("english")}
        />
        <div>
          <input
            type="text"
            value={subOption.thai}
            placeholder="sub option thai"
          />
          <input
            type="text"
            value={subOption.english}
            placeholder="sub option english"
          />
          <button>Add</button>
        </div>
        <button type="submit">สร้างส่วนเสริมอาหาร</button>
      </form>
      <BackFooter props={"/admin/menu/categories"} />
    </>
  );
};

export default CreateOptionPage;
