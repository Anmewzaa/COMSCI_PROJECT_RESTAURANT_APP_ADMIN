// React Hook
import { useState } from "react";
// SWAL
import Swal from "sweetalert2";
// Axios
import axios from "axios";
// Components
import BackFooter from "../../Components/BackFooter";

const CreateMenuPage = () => {
  const [menu, setMenu] = useState({
    name_thai: "",
    name_english: "",
    describe_thai: "",
    describe_english: "",
    price: "",
    category_id: "",
    option_id: "",
  });
  const inputValue = (name) => (event) => {
    setMenu({ ...menu, [name]: event.target.value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    if (!(option.thai && option.english && option.sub_option.length !== 0)) {
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
        console.log(result);
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
            window.location.href = "/admin/menu/option";
          });
        }
      });
  };
  return (
    <>
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="ชื่ออาหารภาษาไทย"
          value={menu.thai}
          onChange={inputValue("thai")}
        />
        <input
          type="text"
          placeholder="ชื่ออาหารภาษาอังกฤษ"
          value={menu.english}
          onChange={inputValue("english")}
        />
        <button type="submit">สร้างรายการอาหาร</button>
      </form>
      <BackFooter props={"/admin/menu"} />
    </>
  );
};

export default CreateMenuPage;
