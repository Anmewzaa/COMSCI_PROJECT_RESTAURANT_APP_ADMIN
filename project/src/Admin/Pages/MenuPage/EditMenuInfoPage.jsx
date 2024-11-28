// React Hook
import { useState, useEffect } from "react";
// React Router Dom
import { useParams } from "react-router-dom";
// axios
import axios from "axios";
// SWAL
import Swal from "sweetalert2";
// Antd
import { Input, Select, TreeSelect, Spin, Button } from "antd";

const EditMenuInfoPage = () => {
  const [spinning, setSpinning] = useState(true);
  const { id } = useParams();
  const [menu, setMenu] = useState({
    name_thai: "",
    name_english: "",
    describe_thai: "",
    describe_english: "",
    price: "",
    menu_cost: "",
    category_id: "",
    option_id: [],
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
          data?.data?.response?.menu_option_id.map((option) => option._id)
        );
        setSpinning(false);
      });
  };
  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        !(
          menu.name_thai &&
          menu.name_english &&
          menu.describe_thai &&
          menu.describe_english &&
          menu.price &&
          menu.menu_cost &&
          menu.category_id &&
          menu.option_id.length > 0
        )
      ) {
        return;
      }

      Swal.fire({
        title: "แจ้งเตือน",
        text: "ต้องการที่จะแก้ไขรายการอาหารใช่หรือไม่ ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          const JWT_TOKEN = localStorage.getItem("PARADISE_LOGIN_TOKEN");
          axios
            .put(
              `${import.meta.env.VITE_API_URL}/authen/menu/update/${id}`,
              {
                menu_name_thai: menu.name_thai,
                menu_name_english: menu.name_english,
                menu_describe_thai: menu.describe_thai,
                menu_describe_english: menu.describe_english,
                menu_price: menu.price,
                menu_cost: menu.menu_cost,
                menu_category_id: menu.category_id,
                menu_option_id: menu.option_id,
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
                text: "แก้ไขรายการอาหารสำเร็จ",
                icon: "success",
              }).then(() => {
                window.location.href = "/menu";
              });
            })
            .catch((err) => {
              return Swal.fire({
                title: "แจ้งเตือน",
                text: err,
                icon: "error",
              }).then(() => {
                window.location.href = "/menu";
              });
            });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchOption();
    fetchMenu();
  }, []);
  return (
    <>
      <Spin fullscreen spinning={spinning} />
      {menu ? (
        <>
          <form className="form" onSubmit={formSubmit}>
            <div className="form-menu-container">
              <div>
                <label className="prompt-semibold">ชื่ออาหารภาษาไทย</label>
                <Input
                  placeholder="ชื่ออาหารภาษาไทย"
                  onChange={inputValue("name_thai")}
                  value={menu.name_thai}
                  className="prompt-regular"
                  size={"large"}
                  required
                />
              </div>
              <div>
                <label className="prompt-semibold">ชื่ออาหารภาษาอังกฤษ</label>
                <Input
                  placeholder="ชื่ออาหารภาษาอังกฤษ"
                  onChange={inputValue("name_english")}
                  value={menu.name_english}
                  className="prompt-regular"
                  size={"large"}
                  required
                />
              </div>
              <div>
                <label className="prompt-semibold">คำอธิบายภาษาไทย</label>
                <Input
                  placeholder="คำอธิบายภาษาไทย"
                  onChange={inputValue("describe_thai")}
                  value={menu.describe_thai}
                  className="prompt-regular"
                  size={"large"}
                  required
                />
              </div>
              <div>
                <label className="prompt-semibold">คำอธิบายภาษาอังกฤษ</label>
                <Input
                  placeholder="คำอธิบายภาษาอังกฤษ"
                  onChange={inputValue("describe_english")}
                  value={menu.describe_english}
                  className="prompt-regular"
                  size={"large"}
                  required
                />
              </div>
              <div>
                <label className="prompt-semibold">ราคาอาหาร</label>
                <Input
                  placeholder="ราคาอาหาร"
                  onChange={inputValue("price")}
                  value={menu.price}
                  className="prompt-regular"
                  size={"large"}
                  required
                />
              </div>
              <div>
                <label className="prompt-semibold">ราคาต้นทุนอาหาร</label>
                <Input
                  placeholder="ราคาต้นทุนอาหาร"
                  onChange={inputValue("menu_cost")}
                  value={menu.menu_cost}
                  className="prompt-regular"
                  size={"large"}
                  required
                />
              </div>
              <div>
                <label className="prompt-semibold">ตัวเลือกส่วนเสริม</label>
                <TreeSelect
                  className="prompt-regular"
                  treeCheckable
                  showCheckedStrategy={TreeSelect.SHOW_PARENT}
                  size={"large"}
                  style={{ width: "100%" }}
                  placeholder="เลือกตัวเลือก"
                  treeData={options.map((option) => ({
                    title: option.option_name.thai,
                    value: option._id,
                    key: option._id,
                  }))}
                  value={menu.option_id}
                  onChange={(value) => setMenu({ ...menu, option_id: value })}
                />
              </div>
              <div>
                <label className="prompt-semibold">ตัวเลือกหมวดหมู่อาหาร</label>
                <Select
                  className="prompt-regular"
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
              อัพเดทรายการอาหาร
            </Button>
          </form>
        </>
      ) : (
        <>Empty</>
      )}
    </>
  );
};

export default EditMenuInfoPage;
