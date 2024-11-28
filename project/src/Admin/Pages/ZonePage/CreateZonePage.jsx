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
    try {
      e.preventDefault();
      const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
      Swal.fire({
        title: "แจ้งเตือน",
        text: "ต้องการที่จะสร้างโซนใช่หรือไม่ ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
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
            .then(() => {
              Swal.fire({
                title: "แจ้งเตือน",
                text: "สร้างโซนสำเร็จ",
                icon: "success",
              }).then(() => {
                window.location.href = "/zone";
              });
            })
            .catch((err) => {
              return Swal.fire({
                title: "แจ้งเตือน",
                text: err,
                icon: "error",
              }).then(() => {
                window.location.href = "/zone";
              });
            });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form onSubmit={submitForm} className="form">
        <div className="form-menu-container">
          <div>
            <label className="prompt-semibold">ชื่อโซน</label>
            <Input
              placeholder="ชื่อโซน"
              onChange={inputValue("zone_name")}
              className="prompt-regular"
              size={"large"}
              required
            />
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
          เพิ่มโซน
        </Button>
      </form>
    </>
  );
};

export default CreateZonePage;
