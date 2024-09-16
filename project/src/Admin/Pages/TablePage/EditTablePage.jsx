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

const EditTablePage = () => {
  const { id } = useParams();
  const [table, setTable] = useState({
    table_number: "",
    table_seat: "",
    table_zone: "",
  });
  const [zones, setZones] = useState([]);
  const inputValue = (name) => (event) => {
    setTable({ ...table, [name]: event.target.value });
  };
  const setInitialValue = (name, value) => {
    setTable((prevCategories) => ({
      ...prevCategories,
      [name]: value,
    }));
  };
  const fetchAPI = async () => {
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .get(`${import.meta.env.VITE_API_URL}/zone/get`, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      })
      .then((data) => {
        setZones(data.data.response);
      });
    await axios
      .get(`${import.meta.env.VITE_API_URL}/table/get/${id}`)
      .then((data) => {
        setInitialValue("table_number", data?.data?.response?.table_number);
        setInitialValue("table_seat", data?.data?.response?.table_seat);
        setInitialValue("table_zone", data?.data?.response?.table_zone[0]?._id);
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
      {table ? (
        <>
          <form className="form" onSubmit={formSubmit}>
            <div className="form-menu-container">
              <div>
                <label className="sarabun-bold">เลขโต๊ะ</label>
                <input
                  type="text"
                  placeholder="เลขโต๊ะ"
                  value={table.table_number}
                  onChange={inputValue("table_number")}
                  className="sarabun-light cursor"
                  required
                />
              </div>
              <div>
                <label className="sarabun-bold">จำนวนที่นั่ง</label>
                <input
                  type="number"
                  placeholder="จำนวนที่นั่ง"
                  value={table.table_seat}
                  onChange={inputValue("table_seat")}
                  className="sarabun-light cursor"
                  required
                />
              </div>
              <div>
                <label className="sarabun-semibold">โซนที่นั่ง</label>
                <select
                  value={table.table_zone}
                  onChange={inputValue("table_zone")}
                  className="sarabun-regular cursor"
                >
                  <option value="">เลือกตัวเลือก</option>
                  {zones.map((zone, index) => (
                    <option key={index} value={zone._id}>
                      {zone.zone_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button className="btn-full btn-yellow sarabun-semibold cursor">
              อัพเดทรายการอาหาร
            </button>
          </form>
          <BackFooter props={`/admin/table`} />
        </>
      ) : (
        <>Empty</>
      )}
    </>
  );
};

export default EditTablePage;
