// React Hook
import { useState } from "react";
// SWAL
import Swal from "sweetalert2";
// Axios
import axios from "axios";
// Antd
import { Input, Button } from "antd";

const CreateZonePage = () => {
  const [zone, setZone] = useState({
    zone_name: "",
  });
  const inputValue = (name) => (event) => {
    setZone({ ...zone, [name]: event.target.value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .post(
        `${import.meta.env.VITE_API_URL}/authen/zone/create`,
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
            title: "เพิ่มโซนเสร็จสมบูรณ์",
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
          เพิ่มโซน
        </Button>
      </form>
    </>
  );
};

export default CreateZonePage;
