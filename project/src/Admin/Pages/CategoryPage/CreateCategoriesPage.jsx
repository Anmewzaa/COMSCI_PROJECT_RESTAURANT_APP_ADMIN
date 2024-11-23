// React Hook
import { useState } from "react";
// SWAL
import Swal from "sweetalert2";
// Axios
import axios from "axios";
// Antd
import { Input, Button } from "antd";

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
    try {
      const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
      await axios
        .post(
          `${import.meta.env.VITE_API_URL}/authen/categories/create`,
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
              window.location.href = "/menu/categories";
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form onSubmit={submitForm} className="form">
        <div className="form-menu-container">
          <div>
            <label className="prompt-semibold">ชื่อหมวดหมู่ภาษาไทย</label>
            <Input
              value={categories.thai}
              placeholder="ชื่อหมวดหมู่ภาษาไทย"
              onChange={inputValue("thai")}
              className="prompt-regular"
              size={"large"}
              required
            />
          </div>
          <div>
            <label className="prompt-semibold">ชื่อหมวดหมู่ภาษาอังกฤษ</label>
            <Input
              value={categories.english}
              placeholder="ชื่อหมวดหมู่ภาษาอังกฤษ"
              onChange={inputValue("english")}
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
          สร้างหมวดหมู่
        </Button>
      </form>
    </>
  );
};

export default CreateCategoriesPage;
