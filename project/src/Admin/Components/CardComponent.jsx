// CSS
import "../CSS/CardComponent.css";
// AntD
import { Button, Modal } from "antd";
// React
import { useState, useContext } from "react";
// Context
import { UserContext } from "../Pages/AdminLayout";
// axios
import axios from "axios";
// SWAL
import Swal from "sweetalert2";
// React Router Dom
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const CardComponent = ({ menu }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
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
      {menu && (
        <>
          <div className="card cursor relative">
            <div
              onClick={() => {
                showModal();
              }}
            >
              <img
                src={`${import.meta.env.VITE_API_URL}/images/${
                  menu.menu_image
                }`}
                alt="menu-image"
              />
              <h2 className="prompt-semibold">{menu.menu_name.thai}</h2>
              <p className="prompt-regular">{menu.menu_price} บาท</p>
            </div>
            {menu && menu.menu_status === false && (
              <div className="card-inactive">สินค้าหมด</div>
            )}
            <Modal
              open={open}
              title={`ข้อมูลรายการอาหาร`}
              onOk={closeModal}
              onCancel={closeModal}
              width={800}
              footer={(_, { OkBtn }) => (
                <div>
                  {user && user.user_access_rights === "Admin" ? (
                    <>
                      <Button
                        className="mr-1 prompt-semibold"
                        onClick={() => editMenuInfo(menu.menu_id)}
                      >
                        แก้ไขเมนู
                      </Button>
                      <Button
                        className="mr-1 prompt-semibold"
                        onClick={() => deleteMenuInfo(menu.menu_id)}
                      >
                        ลบเมนู
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                  <Button className="mr-1 prompt-semibold">แจ้งเมนูหมด</Button>
                </div>
              )}
            >
              <div className="modal-container">
                <div>
                  <img
                    src={`${import.meta.env.VITE_API_URL}/images/${
                      menu.menu_image
                    }`}
                    alt="menu images"
                    className=""
                  />
                </div>
                <div className="menu-infomation">
                  <h2 className="name-text prompt-semibold mb-1">
                    {menu?.menu_name?.thai} ({menu?.menu_name?.english})
                  </h2>
                  <div className="inline prompt-regular">
                    <span className="mr-1">ราคา</span>
                    <p>{menu?.menu_price} บาท</p>
                  </div>
                  {user && user.user_access_rights === "Admin" ? (
                    <>
                      <div className="mb-1 inline prompt-regular">
                        <span className="mr-1">ราคาต้นทุน</span>{" "}
                        <p className="">{menu?.menu_cost} บาท</p>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div className="mb-1">
                    <span className=" mr-1 prompt-medium">คำอธิบาย</span>
                    <p className="prompt-regular">
                      {menu?.menu_describe?.thai} (
                      {menu?.menu_describe?.english})
                    </p>
                  </div>
                  <div className="mb-1">
                    <span className=" mr-1 prompt-medium">ส่วนเสริม</span>
                    {menu.menu_option_id ? (
                      <>
                        {menu.menu_option_id &&
                          menu.menu_option_id.map((item) => {
                            return (
                              <div key={item._id} className="prompt-regular">
                                - {item.option_name.thai} (
                                {item.option_name.english})
                              </div>
                            );
                          })}
                      </>
                    ) : (
                      <>Empty</>
                    )}
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </>
      )}
    </>
  );
};

export default CardComponent;
