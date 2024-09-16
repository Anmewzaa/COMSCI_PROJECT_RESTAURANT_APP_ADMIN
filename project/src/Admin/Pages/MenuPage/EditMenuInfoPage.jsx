// React Hook
import { useState, useEffect } from "react";
// React Router Dom
import { useParams } from "react-router-dom";
// axios
import axios from "axios";
// SWAL
import Swal from "sweetalert2";
// Components
import BackFooter from "../../Components/BackFooter";

const EditMenuInfoPage = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState({
    name_thai: "",
    name_english: "",
    describe_thai: "",
    describe_english: "",
    price: "",
    menu_cost: "",
    category_id: "",
    option_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const inputValue = (name) => (event) => {
    setMenu({ ...menu, [name]: event.target.value });
  };
  const setInitialValue = (name, value) => {
    setMenu((prevCategories) => ({
      ...prevCategories,
      [name]: value,
    }));
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
    await axios
      .get(`${import.meta.env.VITE_API_URL}/menu/get/${id}`)
      .then((data) => {
        setInitialValue("name_thai", data?.data?.response?.menu_name?.thai);
        setInitialValue(
          "name_english",
          data?.data?.response?.menu_name?.english
        );
        setInitialValue(
          "describe_thai",
          data?.data?.response?.menu_describe?.thai
        );
        setInitialValue(
          "describe_english",
          data?.data?.response?.menu_describe?.english
        );
        setInitialValue("price", data?.data?.response?.menu_price);
        setInitialValue("menu_cost", data?.data?.response?.menu_cost);
        setInitialValue(
          "category_id",
          data?.data?.response?.menu_category_id[0]?._id
        );
        setInitialValue(
          "option_id",
          data?.data?.response?.menu_option_id[0]?._id
        );
      });
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .put(
        `${import.meta.env.VITE_API_URL}/menu/update/${id}`,
        {
          menu_name_thai: menu.name_thai,
          menu_name_english: menu.name_english,
          menu_describe_thai: menu.describe_thai,
          menu_describe_english: menu.describe_english,
          menu_price: menu.price,
          menu_category_id: [`${menu.category_id}`],
          menu_option_id: [`${menu.option_id}`],
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
            window.location.href = "/admin/menu";
          });
        }
      });
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <>
      {menu ? (
        <>
          <form className="form" onSubmit={formSubmit}>
            <div className="form-menu-container">
              <div>
                <label className="sarabun-bold">ชื่ออาหารภาษาไทย</label>
                <input
                  type="text"
                  placeholder="ชื่ออาหารภาษาไทย"
                  value={menu.name_thai}
                  onChange={inputValue("name_thai")}
                  className="sarabun-light"
                  required
                />
              </div>
              <div>
                <label className="sarabun-bold">ชื่ออาหารภาษาอังกฤษ</label>
                <input
                  type="text"
                  placeholder="ชื่ออาหารภาษาอังกฤษ"
                  value={menu.name_english}
                  onChange={inputValue("name_english")}
                  className="sarabun-light"
                  required
                />
              </div>
              <div>
                <label className="sarabun-bold">คำอธิบายภาษาไทย</label>
                <input
                  type="text"
                  placeholder="คำอธิบายภาษาไทย"
                  value={menu.describe_thai}
                  onChange={inputValue("describe_thai")}
                  className="sarabun-light"
                  required
                />
              </div>
              <div>
                <label className="sarabun-bold">คำอธิบายภาษาอังกฤษ</label>
                <input
                  type="text"
                  placeholder="คำอธิบายภาษาอังกฤษ"
                  value={menu.describe_english}
                  onChange={inputValue("describe_english")}
                  className="sarabun-light"
                  required
                />
              </div>
              <div>
                <label className="sarabun-bold">ราคาอาหาร</label>
                <input
                  type="text"
                  placeholder="ราคาอาหาร"
                  value={menu.price}
                  onChange={inputValue("price")}
                  className="sarabun-light"
                  required
                />
              </div>
              <div>
                <label className="sarabun-bold">ราคาต้นทุนอาหาร</label>
                <input
                  type="text"
                  placeholder="ราคาต้นุทนอาหาร"
                  value={menu.menu_cost}
                  onChange={inputValue("menu_cost")}
                  className="sarabun-light"
                  required
                />
              </div>
              <div>
                <label className="sarabun-bold">ตัวเลือกส่วนเสริม</label>
                <select
                  value={menu.option_id}
                  onChange={inputValue("option_id")}
                  className="sarabun-light"
                  required
                >
                  <option value="">เลือกตัวเลือก</option>
                  {options.map((option, index) => (
                    <option key={index} value={option._id}>
                      {option.option_name.thai}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="sarabun-bold">ตัวเลือกหมวดหมู่อาหาร</label>
                <select
                  value={menu.category_id}
                  onChange={inputValue("category_id")}
                  className="sarabun-light"
                  required
                >
                  <option value="">เลือกตัวเลือก</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category._id}>
                      {category.category_name.thai}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button className="btn-full btn-yellow sarabun-semibold cursor">
              อัพเดทรายการอาหาร
            </button>
          </form>
          <BackFooter props={`/admin/menu`} />
        </>
      ) : (
        <>Empty</>
      )}
    </>
  );
};

export default EditMenuInfoPage;
