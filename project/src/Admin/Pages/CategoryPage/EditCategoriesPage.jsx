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
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
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
    try {
      e.preventDefault();
      const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
      Swal.fire({
        title: "แจ้งเตือน",
        text: "ต้องการที่จะแก้ไขหมวดหมู่อาหารใช่หรือไม่ ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
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
            .then(() => {
              Swal.fire({
                title: "แจ้งเตือน",
                text: "แก้ไขหมวดหมู่อาหารสำเร็จ",
                icon: "success",
              }).then(() => {
                window.location.href = "/menu/categories";
              });
            })
            .catch((err) => {
              return Swal.fire({
                title: "แจ้งเตือน",
                text: err,
                icon: "error",
              }).then(() => {
                window.location.href = "/menu/categories";
              });
            });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Spin fullscreen />
        </>
      ) : (
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
                <label className="prompt-semibold">
                  ชื่อหมวดหมู่ภาษาอังกฤษ
                </label>
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
              className="prompt-semibold"
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
      )}
    </>
  );
};

export default EditCategoriesPage;
