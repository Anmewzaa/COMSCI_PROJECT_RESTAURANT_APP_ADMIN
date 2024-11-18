// React Hook
import { useState, useEffect } from "react";
// SWAL
import Swal from "sweetalert2";
// Axios
import axios from "axios";
// Antd
import { Image, Select, Input, TreeSelect, Spin, Button } from "antd";

const CreateMenuPage = () => {
  const [spinning, setSpinning] = useState(true);
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const onImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const inputValue = (name) => (event) => {
    setMenu({ ...menu, [name]: event.target.value });
  };
  const fetchCategories = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/categories/get`)
      .then((data) => {
        setCategories(data.data.response);
      });
  };
  const fetchOptions = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/option/get`)
      .then((data) => {
        setOptions(data.data.response);
        setSpinning(false);
      });
  };
  useEffect(() => {
    fetchCategories();
    fetchOptions();
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
        menu.menu_cost &&
        menu.category_id &&
        menu.option_id.length > 0
      )
    ) {
      return alert("INPUT REQUIRED NOT PASS");
    }
    const form = new FormData();
    form.append("menu_name_thai", menu.name_thai);
    form.append("menu_name_english", menu.name_english);
    form.append("menu_describe_thai", menu.describe_thai);
    form.append("menu_describe_english", menu.describe_english);
    form.append("menu_price", menu.price);
    form.append("menu_cost", menu.menu_cost);
    form.append("menu_category_id", menu.category_id);
    menu.option_id.forEach((optionId) => {
      form.append("menu_option_id", optionId);
    });
    form.append("menu_image", selectedFile);

    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .post(`${import.meta.env.VITE_API_URL}/authen/menu/create`, form, {
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
            window.location.href = "/menu";
          });
        }
      });
  };

  return (
    <>
      <Spin fullscreen spinning={spinning} />
      <form
        onSubmit={submitForm}
        encType="multipart/form-data"
        className="form"
      >
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
              className=""
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
          <div className="file-input">
            <label className="prompt-semibold">รูปภาพอาหาร</label>
            <div className="file-container">
              {selectedFile && (
                <div className="file-box">
                  <Image width={100} src={previewImage} />
                </div>
              )}
              <div>
                <label
                  htmlFor="file-upload"
                  className="custom-file-upload prompt-regular"
                >
                  เลือกรูปภาพ
                </label>
                <input
                  id="file-upload"
                  className=""
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  required
                />
              </div>
            </div>
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
          สร้างรายการอาหาร
        </Button>
      </form>
    </>
  );
};

export default CreateMenuPage;
