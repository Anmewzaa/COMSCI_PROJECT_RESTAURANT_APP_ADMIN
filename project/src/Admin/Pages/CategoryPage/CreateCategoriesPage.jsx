// React Hook
import { useState } from "react";
// SWAL
import Swal from "sweetalert2";
// Axios
import axios from "axios";
// Components
import BackFooter from "../../Components/BackFooter";

const CreateCategoriesPage = () => {
  const [categories, setCategories] = useState({
    thai: "",
    english: "",
  });
  const inputValue = (name) => (event) => {
    setCategories({ ...categories, [name]: event.target.value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    if (!(categories.thai && categories.english)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "กรุณากรอกให้ครบถ้วน",
      });
    }
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/category/create`,
        {
          category_name_thai: categories.thai,
          category_name_english: categories.english,
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
      <form onSubmit={submitForm} className="form">
        <div className="form-menu-container">
          <div>
            <label className="sarabun-semibold">ชื่อหมวดหมู่ภาษาไทย</label>
            <input
              type="text"
              placeholder="ชื่อหมวดหมู่ภาษาไทย"
              value={categories.thai}
              onChange={inputValue("thai")}
              className="sarabun-regular cursor"
            />
          </div>
          <div>
            <label className="sarabun-semibold">ชื่อหมวดหมู่ภาษาอังกฤษ</label>
            <input
              type="text"
              placeholder="ชื่อหมวดหมู่ภาษาอังกฤษ"
              value={categories.english}
              onChange={inputValue("english")}
              className="sarabun-regular cursor"
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn-full btn-green cursor sarabun-semibold"
        >
          สร้างหมวดหมู่
        </button>
      </form>
      <BackFooter props={"/admin/menu/categories"} />
    </>
  );
};

export default CreateCategoriesPage;
