// React Hook
import { useState, useEffect } from "react";
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
  const [selectedFile, setSelectedFile] = useState(null);
  const onImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const inputValue = (name) => (event) => {
    setMenu({ ...menu, [name]: event.target.value });
  };
  const fetchAPI = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/category/get`)
      .then((data) => {
        setCategories(data.data.response);
      });
    await axios
      .get(`${import.meta.env.VITE_API_URL}/option/get`)
      .then((data) => {
        setOptions(data.data.response);
      });
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  const submitForm = async (e) => {
    e.preventDefault();
    if (
      !(
        menu.name_thai &&
        menu.name_english &&
        menu.describe_thai &&
        menu.describe_english &&
        menu.price &&
        menu.category_id &&
        menu.option_id &&
        selectedFile
      )
    ) {
      return;
    }
    const form = new FormData();
    form.append("menu_name_thai", menu.name_thai);
    form.append("menu_name_english", menu.name_english);
    form.append("menu_describe_thai", menu.describe_thai);
    form.append("menu_describe_english", menu.describe_english);
    form.append("menu_price", menu.price);
    form.append("menu_category_id", menu.category_id);
    form.append("menu_option_id", menu.option_id);
    form.append("menu_image", selectedFile);

    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .post(`${import.meta.env.VITE_API_URL}/menu/create`, form, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      })
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
            window.location.href = "/admin/menu";
          });
        }
      });
  };
  return (
    <>
      <form onSubmit={submitForm} encType="multipart/form-data">
        <input type="file" accept="image/*" onChange={onImageChange} required />
        <input
          type="text"
          placeholder="ชื่ออาหารภาษาไทย"
          value={menu.name_thai}
          onChange={inputValue("name_thai")}
          required
        />
        <input
          type="text"
          placeholder="ชื่ออาหารภาษาอังกฤษ"
          value={menu.name_english}
          onChange={inputValue("name_english")}
          required
        />
        <input
          type="text"
          placeholder="คำอธิบายภาษาไทย"
          value={menu.describe_thai}
          onChange={inputValue("describe_thai")}
          required
        />
        <input
          type="text"
          placeholder="คำอธิบายภาษาอังกฤษ"
          value={menu.describe_english}
          onChange={inputValue("describe_english")}
          required
        />
        <input
          type="text"
          placeholder="ราคาอาหาร"
          value={menu.price}
          onChange={inputValue("price")}
          required
        />
        <select value={menu.option_id} onChange={inputValue("option_id")}>
          <option value="">เลือกตัวเลือก</option>
          {options.map((option) => (
            <option key={option.id} value={option._id}>
              {option.option_name.thai}
            </option>
          ))}
        </select>
        <select value={menu.category_id} onChange={inputValue("category_id")}>
          <option value="">เลือกตัวเลือก</option>
          {categories.map((category) => (
            <option key={category.id} value={category._id}>
              {category.category_name.thai}
            </option>
          ))}
        </select>
        <button type="submit">สร้างรายการอาหาร</button>
      </form>
      <BackFooter props={"/admin/menu"} />
    </>
  );
};

export default CreateMenuPage;
