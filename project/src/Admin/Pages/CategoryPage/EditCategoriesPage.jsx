// Axios
import axios from "axios";
// React Hook
import { useState, useEffect } from "react";
// React Router Dom
import { useParams } from "react-router-dom";
// SWAL
import Swal from "sweetalert2";
// Antd
import { Input, Button, Spin } from "antd";

const EditCategoriesPage = () => {
  const [spinning, setSpinning] = useState(true);
  const { id } = useParams();
  const [categories, setCategories] = useState({
    thai: "",
    english: "",
  });
  const fetchAPI = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/categories/get/${id}`)
      .then((data) => {
        setInitialValue("thai", data.data.response.category_name.thai);
        setInitialValue("english", data.data.response.category_name.english);
        setSpinning(false);
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
        `${import.meta.env.VITE_API_URL}/authen/categories/update/${id}`,
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
      <Spin fullscreen spinning={spinning} />
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
          อัพเดทหมวดหมู่อาหาร
        </Button>
      </form>
    </>
  );
};

export default EditCategoriesPage;
