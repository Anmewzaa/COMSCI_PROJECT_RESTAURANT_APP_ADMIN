// React Hook
import { useState, useEffect } from "react";
// SWAL
import Swal from "sweetalert2";
// Axios
import axios from "axios";
// Components
import BackFooter from "../../Components/BackFooter";

const CreateTablePage = () => {
  const [table, setTable] = useState({
    table_number: "",
    table_seat: "",
    table_zone: "",
  });
  const [zones, setZones] = useState([]);
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
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  const inputValue = (name) => (event) => {
    setTable({ ...table, [name]: event.target.value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/table/create`,
        {
          table_number: table.table_number,
          table_seat: table.table_seat,
          table_zone: table.table_zone,
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
            title: "เพิ่มโต๊ะเสร็จสมบูรณ์",
            text: "...",
          }).then(() => {
            window.location.href = "/admin/table";
          });
        }
      });
  };
  return (
    <>
      <form onSubmit={submitForm} className="form">
        <div className="form-menu-container">
          <div>
            <label className="sarabun-semibold">เลขโต๊ะ</label>
            <input
              type="text"
              placeholder="เลขโต๊ะ"
              value={table.table_number}
              onChange={inputValue("table_number")}
              className="sarabun-regular cursor"
              required
            />
          </div>
          <div>
            <label className="sarabun-semibold">จำนวนที่นั่ง</label>
            <input
              type="number"
              placeholder="จำนวนที่นั่ง"
              value={table.table_seat}
              onChange={inputValue("table_seat")}
              className="sarabun-regular cursor"
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
              {zones.map((zone) => (
                <option key={zone.id} value={zone._id}>
                  {zone.zone_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="btn-full btn-green cursor sarabun-semibold"
        >
          เพิ่มโต๊ะ
        </button>
      </form>
      <BackFooter props={"/admin/table"} />
    </>
  );
};

export default CreateTablePage;
