// Axios
import axios from "axios";
// React Hook
import { useState, useEffect } from "react";
// React Router Dom
import { useParams } from "react-router-dom";
// SWAL
import Swal from "sweetalert2";
// Components
import BackFooter from "../../Components/BackFooter";

const EditCategoriesPage = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState({
    thai: "",
    english: "",
  });
  const fetchAPI = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/category/get/${id}`)
      .then((data) => {
        setInitialValue("thai", data.data.response.category_name.thai);
        setInitialValue("english", data.data.response.category_name.english);
      });
  };
  const setInitialValue = (name, value) => {
    setCategories((prevCategories) => ({
      ...prevCategories,
      [name]: value,
    }));
  };
  const inputValue = (name) => (event) => {
    setCategories({ ...categories, [name]: event.target.value });
  };
  useEffect(() => {
    fetchAPI();
  }, []);
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
      .put(
        `${import.meta.env.VITE_API_URL}/category/update/${id}`,
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
            title: "อัพเดทรายการอาหารเสร็จสมบูรณ์",
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
            <label>ชื่อหมวดหมู่ภาษาไทย</label>
            <input
              type="text"
              value={categories.thai}
              placeholder="ชื่อหมวดหมู่ภาษาไทย"
              onChange={inputValue("thai")}
            />
          </div>
          <div>
            <label>ชื่อหมวดหมู่ภาษาอังกฤษ</label>
            <input
              type="text"
              value={categories.english}
              onChange={inputValue("english")}
            />
          </div>
        </div>
        <button type="submit">อัพเดทหมวดหมู่อาหาร</button>
      </form>
      <BackFooter props={"/admin/menu/categories"} />
    </>
  );
};

export default EditCategoriesPage;
