// React Hook
import { useState, useEffect, useContext } from "react";
// React Router Dom
import { useParams, useNavigate } from "react-router-dom";
// axios
import axios from "axios";
// Components
import BackFooter from "../../Components/BackFooter";
// SWAL
import Swal from "sweetalert2";
// CSS
import "../../CSS/MenuInfoPage.css";
// Context
import { UserContext } from "../AdminLayout";

const MenuInfo = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState();
  const fetchAPI = async () => {
    setLoading(true);
    await axios
      .get(`${import.meta.env.VITE_API_URL}/menu/get/${id}`)
      .then((data) => {
        setMenu(data.data.response);
      });
    setLoading(false);
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  const editMenuInfo = () => {
    navigate(`/admin/menu/edit/${menu.menu_id}`);
  };
  const deleteMenuInfo = () => {
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
          .delete(`${import.meta.env.VITE_API_URL}/menu/delete/${id}`, {
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
            window.location.replace(`/admin/menu`);
          });
      }
    });
  };
  const changeMenuStatus = () => {
    Swal.fire({
      title: "ต้องการแจ้งรายการหมดใช่ไหม?",
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
          .put(
            `${import.meta.env.VITE_API_URL}/menu/changestatus/${id}`,
            {
              status: true,
            },
            {
              headers: {
                Authorization: `Bearer ${JWT_TOKEN}`,
              },
            }
          )
          .then(() => {
            Swal.fire({
              title: "Change Status Success!",
              text: "",
              icon: "success",
            });
            window.location.replace(`/admin/menu`);
          });
      }
    });
  };

  return (
    <div className="info-container">
      {loading ? (
        <>Loading...</>
      ) : (
        <div>
          {menu ? (
            <div className="menu-info-box">
              <div className="image-container">
                <img
                  src={`${import.meta.env.VITE_API_URL}/images/${
                    menu.menu_image
                  }`}
                  alt="menu images"
                  className="menu-info-image"
                />
              </div>
              <div className="menu-infomation">
                <h2 className="name-text sarabun-extrabold">
                  {menu?.menu_name?.thai} ({menu?.menu_name?.english})
                </h2>
                <div className="mb-1 inline">
                  <span className="sarabun-bold mr-1">ราคา</span>
                  <p className="sarabun-light">{menu?.menu_price} บาท</p>
                </div>
                <div className="mb-1 inline">
                  <span className="sarabun-bold mr-1">ราคาต้นทุน</span>{" "}
                  <p className="sarabun-light">{menu?.menu_cost} บาท</p>
                </div>
                <div className="mb-1">
                  <span className="sarabun-bold mr-1">คำอธิบาย</span>
                  <p className="sarabun-light">
                    {menu?.menu_describe?.thai} ({menu?.menu_describe?.english})
                  </p>
                </div>
                <div className="mb-1">
                  <span className="sarabun-bold mr-1">ส่วนเสริม</span>
                  {menu.menu_option_id ? (
                    <>
                      {menu.menu_option_id &&
                        menu.menu_option_id.map((item) => {
                          return (
                            <div key={item._id} className="sarabun-light">
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
                <div className="btn-group">
                  <button
                    className="btn-full btn-blue sarabun-semibold cursor"
                    onClick={() => changeMenuStatus()}
                  >
                    แจ้งเมนูหมด
                  </button>
                  {user.user_access_rights === "Admin" && (
                    <>
                      <button
                        className="btn-full btn-yellow sarabun-semibold cursor"
                        onClick={() => editMenuInfo()}
                      >
                        แก้ไข
                      </button>
                      <button
                        className="btn-full btn-red sarabun-semibold cursor"
                        onClick={() => deleteMenuInfo()}
                      >
                        ลบ
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>Empty</>
          )}
        </div>
      )}
      <BackFooter props={"/admin/menu"} />
    </div>
  );
};

export default MenuInfo;
