// React Hook
import { useState, useEffect } from "react";
// React Router Dom
import { useParams } from "react-router-dom";
// axios
import axios from "axios";
// SWAL
import Swal from "sweetalert2";
// Antd
import { Input, Select, Button } from "antd";

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
  const fetchCategories = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/categories/get`)
      .then((data) => {
        setCategories(data.data.response);
      });
  };
  const fetchOption = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/option/get`)
      .then((data) => {
        setOptions(data.data.response);
      });
  };
  const fetchMenu = async () => {
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
    fetchCategories();
    fetchOption();
    fetchMenu();
  }, []);
  return (
    <>
      {menu ? (
        <>
          <form className="form" onSubmit={formSubmit}>
            <div className="form-menu-container">
              <div>
                <label className="sarabun-bold">ชื่ออาหารภาษาไทย</label>
                <Input
                  placeholder="ชื่ออาหารภาษาไทย"
                  onChange={inputValue("name_thai")}
                  value={menu.name_thai}
                  className="sarabun-regular"
                  size={"large"}
                  required
                />
              </div>
              <div>
                <label className="sarabun-bold">ชื่ออาหารภาษาอังกฤษ</label>
                <Input
                  placeholder="ชื่ออาหารภาษาอังกฤษ"
                  onChange={inputValue("name_english")}
                  value={menu.name_english}
                  className="sarabun-regular"
                  size={"large"}
                  required
                />
              </div>
              <div>
                <label className="sarabun-bold">คำอธิบายภาษาไทย</label>
                <Input
                  placeholder="คำอธิบายภาษาไทย"
                  onChange={inputValue("describe_thai")}
                  value={menu.describe_thai}
                  className="sarabun-regular"
                  size={"large"}
                  required
                />
              </div>
              <div>
                <label className="sarabun-bold">คำอธิบายภาษาอังกฤษ</label>
                <Input
                  placeholder="คำอธิบายภาษาอังกฤษ"
                  onChange={inputValue("describe_english")}
                  value={menu.describe_english}
                  className="sarabun-regular"
                  size={"large"}
                  required
                />
              </div>
              <div>
                <label className="sarabun-bold">ราคาอาหาร</label>
                <Input
                  placeholder="ราคาอาหาร"
                  onChange={inputValue("price")}
                  value={menu.price}
                  className="sarabun-regular"
                  size={"large"}
                  required
                />
              </div>
              <div>
                <label className="sarabun-bold">ราคาต้นทุนอาหาร</label>
                <Input
                  placeholder="ราคาต้นทุนอาหาร"
                  onChange={inputValue("menu_cost")}
                  value={menu.menu_cost}
                  className="sarabun-regular"
                  size={"large"}
                  required
                />
              </div>
              <div>
                <label className="sarabun-bold">ตัวเลือกส่วนเสริม</label>
                <Select
                  size={"large"}
                  style={{ width: "100%" }}
                  showSearch
                  placeholder="เลือกตัวเลือก"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={options.map((option) => ({
                    value: option._id,
                    label: option.option_name.thai,
                  }))}
                  value={menu.option_id}
                  onChange={(value) => setMenu({ ...menu, option_id: value })}
                />
              </div>
              <div>
                <label className="sarabun-bold">ตัวเลือกหมวดหมู่อาหาร</label>
                <Select
                  size={"large"}
                  style={{ width: "100%" }}
                  showSearch
                  placeholder="เลือกตัวเลือก"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={categories.map((category) => ({
                    value: category._id,
                    label: category.category_name.thai,
                  }))}
                  value={menu.category_id}
                  onChange={(value) => setMenu({ ...menu, category_id: value })}
                />
              </div>
            </div>
            <button className="btn-full btn-yellow sarabun-semibold cursor">
              อัพเดทรายการอาหาร
            </button>
          </form>
        </>
      ) : (
        <>Empty</>
      )}
    </>
  );
};

export default EditMenuInfoPage;
