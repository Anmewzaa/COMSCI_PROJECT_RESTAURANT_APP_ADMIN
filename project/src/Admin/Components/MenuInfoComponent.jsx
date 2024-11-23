/* eslint-disable react/prop-types */
// Antd
import { Button, Modal, Input, Tooltip } from "antd";
const { TextArea } = Input;
// axios
import axios from "axios";
// CSS
import "../CSS/MenuInfoComponent.css";
// React
import { useState } from "react";
// SWAL
import Swal from "sweetalert2";
// React Router Dom
import { useNavigate } from "react-router-dom";

const MenuInfoComponent = ({ menu }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const deleteMenuInfo = (id) => {
    Swal.fire({
      title: "ต้องการลบใช่ไหม?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const JWT_TOKEN = localStorage.getItem("PARADISE_LOGIN_TOKEN");
        axios
          .delete(`${import.meta.env.VITE_API_URL}/authen/menu/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${JWT_TOKEN}`,
            },
          })
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            window.location.replace(`/menu`);
          });
      }
    });
  };
  const editMenuInfo = (id) => {
    navigate(`/menu/edit/${id}`);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="prompt-semibold">
        รายละเอียด
      </Button>
      <Modal
        title={<p>รายละเอียด</p>}
        open={open}
        onCancel={() => setOpen(false)}
        footer={<></>}
      >
        <div className="menu-info-container">
          <div className="image-container">
            <Tooltip title={`รูปภาพ ${menu.menu_name.thai}`}>
              <img
                src={`${import.meta.env.VITE_API_URL}/images/${
                  menu.menu_image
                }`}
                alt="menu-image"
              />
            </Tooltip>
          </div>
          <div className="info-container">
            <h2 className="prompt-semibold">{`${menu.menu_name.thai} (${menu.menu_name.english})`}</h2>
            <p className="prompt-regular">ราคา {menu.menu_price} บาท</p>
            <TextArea
              disabled
              value={menu.menu_describe.thai}
              className="prompt-regular"
            />
          </div>
          <div className="btn-container">
            <Button
              className="mr-1 prompt-semibold"
              onClick={() => editMenuInfo(menu.menu_id)}
            >
              แก้ไข
            </Button>
            <Button
              className="mr-1 prompt-semibold"
              onClick={() => deleteMenuInfo(menu.menu_id)}
            >
              ลบ
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MenuInfoComponent;
