// Axios
import axios from "axios";
// React Hook
import { useState, useEffect } from "react";
// React Router Dom
import { useParams } from "react-router-dom";
// SWAL
import Swal from "sweetalert2";
// Antd
import { Input, Button, Spin } from "antd";

const EditZonePage = () => {
  const [spinning, setSpinning] = useState(true);
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
        setSpinning(false);
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
    try {
      e.preventDefault();
      const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
      Swal.fire({
        title: "แจ้งเตือน",
        text: "ต้องการที่จะแก้ไขโซนใช่หรือไม่ ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
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
            .then(() => {
              Swal.fire({
                title: "แจ้งเตือน",
                text: "แก้ไขโซนสำเร็จ",
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
      <Spin fullscreen spinning={spinning} />
      <form onSubmit={submitForm} className="form">
        <div className="form-menu-container">
          <div>
            <label className="prompt-semibold">ชื่อโซน</label>
            <Input
              value={zone.zone_name}
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
          อัพเดทหมวดโซน
        </Button>
      </form>
    </>
  );
};

export default EditZonePage;
