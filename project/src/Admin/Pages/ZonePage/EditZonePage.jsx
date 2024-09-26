// Axios
import axios from "axios";
// React Hook
import { useState, useEffect } from "react";
// React Router Dom
import { useParams } from "react-router-dom";
// SWAL
import Swal from "sweetalert2";
// Antd
import { Input, Button } from "antd";

const EditZonePage = () => {
  const { id } = useParams();
  const [zone, setZone] = useState({
    zone_name: "",
  });
  const fetchAPI = async () => {
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .get(`${import.meta.env.VITE_API_URL}/authen/zone/get/${id}`, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      })
      .then((data) => {
        setInitialValue("zone_name", data.data.response.zone_name);
      });
  };
  const setInitialValue = (name, value) => {
    setZone((prevCategories) => ({
      ...prevCategories,
      [name]: value,
    }));
  };
  const inputValue = (name) => (event) => {
    setZone({ ...zone, [name]: event.target.value });
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  const submitForm = async (e) => {
    e.preventDefault();
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .put(
        `${import.meta.env.VITE_API_URL}/authen/zone/update/${id}`,
        {
          zone_name: zone.zone_name,
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
            title: "อัพเดทโซนเสร็จสมบูรณ์",
            text: "...",
          }).then(() => {
            window.location.href = "/zone";
          });
        }
      });
  };
  return (
    <>
      <form onSubmit={submitForm} className="form">
        <div className="form-menu-container">
          <div>
            <label className="sarabun-semibold">ชื่อโซน</label>
            <Input
              value={zone.zone_name}
              placeholder="ชื่อโซน"
              onChange={inputValue("zone_name")}
              className="sarabun-regular"
              size={"large"}
              required
            />
          </div>
        </div>
        <Button
          className="sarabun-semibold"
          block
          htmlType="submit"
          size={"large"}
          style={{
            background: "linear-gradient(45deg, #00C853 0%, #00C853 100%)",
            color: "#fff",
            border: "none",
          }}
        >
          อัพเดทหมวดโซน
        </Button>
      </form>
    </>
  );
};

export default EditZonePage;
