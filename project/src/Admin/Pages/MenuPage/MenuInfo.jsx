// React Hook
import { useState, useEffect } from "react";
// React Router Dom
import { useParams } from "react-router-dom";
// axios
import axios from "axios";
// Components
import BackFooter from "../../Components/BackFooter";
// SWAL
import Swal from "sweetalert2";

const MenuInfo = () => {
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
  const editMenuInfo = () => {};
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

  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          {menu ? (
            <div className="menu-info-box">
              <>
                <img
                  src={`${import.meta.env.VITE_API_URL}/images/${
                    menu.menu_image
                  }`}
                  alt="menu images"
                  className="menu-info-image"
                />
              </>
              <div className="menu-infomation">
                <h2>
                  {menu?.menu_name?.thai} ({menu?.menu_name?.english})
                </h2>
                <p>
                  <span>ราคา</span> {menu?.menu_price} บาท
                </p>
                <p>
                  <span>คำอธิบาย</span>
                  <br />
                  <p>
                    {menu?.menu_describe?.thai} ({menu?.menu_describe?.english})
                  </p>
                </p>
                <span>ส่วนเสริม</span>
                {menu.menu_option_id ? (
                  <>
                    {menu.menu_option_id &&
                      menu.menu_option_id.map((item) => {
                        return (
                          <div key={item._id}>
                            {item.option_name.thai} ({item.option_name.english})
                          </div>
                        );
                      })}
                  </>
                ) : (
                  <>Empty</>
                )}
                <button onClick={() => editMenuInfo()}>แก้ไข</button>
                <button onClick={() => deleteMenuInfo()}>ลบ</button>
              </div>
            </div>
          ) : (
            <>Empty</>
          )}
        </>
      )}
      <BackFooter props={"/admin/menu"} />
    </>
  );
};

export default MenuInfo;
