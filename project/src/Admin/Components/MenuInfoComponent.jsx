/* eslint-disable react/prop-types */
// Antd
import {
  Button,
  Modal,
  Input,
  Tooltip,
  Image,
  Divider,
  List,
  Typography,
} from "antd";
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
      title: "แจ้งเตือน",
      text: "ต้องการลบใช่ไหม ?",
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
        width={"80%"}
      >
        <div className="menu-info-container">
          <div className="image-container">
            <Tooltip title={`รูปภาพ ${menu.menu_name.thai}`}>
              <Image
                width={"100%"}
                src={`${import.meta.env.VITE_API_URL}/images/${
                  menu.menu_image
                }`}
                alt="paradise menu image"
              />
            </Tooltip>
          </div>
          <div>
            <div className="info-container">
              <div className="mb-1">
                <h3 className="mb-1">ข้อมูลรายการอาหาร</h3>
                <div className="text-container">
                  <span className="prompt-semibold">ชื่อ :</span>
                  <p className="prompt-regular">{`${menu.menu_name.thai} (${menu.menu_name.english})`}</p>
                </div>
                <div className="text-container">
                  <span className="prompt-semibold">หมวดหมู่ :</span>
                  <p className="prompt-regular">
                    {`${menu.menu_category_id[0].category_name.thai} (${menu.menu_category_id[0].category_name.english})`}
                  </p>
                </div>
                <div className="text-container">
                  <span className="prompt-semibold">ราคา :</span>
                  <p className="prompt-regular">{menu.menu_price} บาท</p>
                </div>
                <div className="text-container">
                  <span className="prompt-semibold">ราคาต้นทุน :</span>
                  <p className="prompt-regular">{menu.menu_cost} บาท</p>
                </div>
              </div>
              <>
                <h3 className="mb-1">คำอธิบาย</h3>
                <TextArea
                  disabled
                  value={menu.menu_describe.thai}
                  className="prompt-regular"
                />
              </>
            </div>
            <div className="mb-1">
              <h3 className="mb-1">ส่วนเสริม</h3>
              <List
                bordered
                dataSource={menu.menu_option_id}
                renderItem={(item) => (
                  <List.Item>
                    {item.option_name.thai}{" "}
                    {item.sub_option && item.sub_option.length > 0 && (
                      <span>
                        (
                        {item.sub_option.map((suboption, index) => (
                          <span key={index}>
                            {suboption.sub_option_name.thai}
                            {index < item.sub_option.length - 1 ? ", " : ""}
                          </span>
                        ))}
                        )
                      </span>
                    )}
                  </List.Item>
                )}
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
        </div>
      </Modal>
    </>
  );
};

export default MenuInfoComponent;
