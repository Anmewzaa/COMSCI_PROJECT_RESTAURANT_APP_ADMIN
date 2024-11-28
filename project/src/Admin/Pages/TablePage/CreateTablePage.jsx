// React Hook
import { useState, useEffect } from "react";
// SWAL
import Swal from "sweetalert2";
// Axios
import axios from "axios";
// Antd
import { Select, Input, Button, InputNumber, Spin } from "antd";
// React route dom
import { useNavigate } from "react-router-dom";

const CreateTablePage = () => {
  const navigate = useNavigate();
  const [existingTables, setExistingTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [table, setTable] = useState({
    table_number: 0,
    table_seat: "",
    table_zone: "",
  });

  const [zones, setZones] = useState([]);
  const fetchAPI = async () => {
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .get(`${import.meta.env.VITE_API_URL}/authen/zone/get`, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      })
      .then((data) => {
        setZones(data.data.response);
        setLoading(false);
      });
  };
  const fetchExistingTables = async () => {
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .get(`${import.meta.env.VITE_API_URL}/authen/table/get`, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      })
      .then((data) => {
        const tableNumbers = data.data.response.map((table) =>
          Number(table.table_number)
        );
        setExistingTables(tableNumbers);
      });
  };
  useEffect(() => {
    fetchAPI();
    fetchExistingTables();
  }, []);
  const inputValue = (name) => (event) => {
    setTable({ ...table, [name]: event.target.value });
  };
  const submitForm = async (e) => {
    try {
      e.preventDefault();
      Swal.fire({
        title: "แจ้งเตือน",
        text: "ต้องการที่จะสร้างโต๊ะใหม่ใช่หรือไม่ ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        const JWT_TOKEN = localStorage.getItem("PARADISE_LOGIN_TOKEN");
        if (result.isConfirmed) {
          axios
            .post(
              `${import.meta.env.VITE_API_URL}/authen/table/create`,
              {
                table_number: `${table.table_number}`,
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
                return Swal.fire({
                  title: "แจ้งเตือน",
                  text: "มีบางอย่างผิดพลาดกรุณาแจ้ง ADMIN",
                  icon: "error",
                }).then(() => {
                  navigate("/table");
                });
              } else {
                Swal.fire({
                  title: "แจ้งเตือน",
                  text: "สร้างโต๊ะใหม่เสร็จเรียบร้อย",
                  icon: "success",
                }).then(() => {
                  navigate("/table");
                });
              }
            });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {loading ? (
        <>
          <Spin fullscreen loading={loading} />
        </>
      ) : (
        <>
          <form onSubmit={submitForm} className="form">
            <div className="form-menu-container">
              <div>
                <label className="prompt-semibold">เลขโต๊ะ</label>
                <Select
                  className="prompt-medium"
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="เลือกเลขโต๊ะ"
                  options={Array.from({ length: 100 }, (_, i) => ({
                    value: i + 1,
                    label: `${i + 1}`,
                    disabled: existingTables.includes(i + 1),
                  }))}
                  onChange={(value) => {
                    setTable({ ...table, table_number: value });
                  }}
                  value={table.table_number}
                  required
                />
              </div>
              <div>
                <label className="prompt-semibold">จำนวนที่นั่ง</label>
                <Input
                  placeholder="จำนวนที่นั่ง"
                  onChange={inputValue("table_seat")}
                  className="prompt-regular"
                  value={table.table_seat}
                  size={"large"}
                  required
                />
              </div>
              <div>
                <label className="prompt-semibold">โซนที่นั่ง</label>
                <Select
                  className="prompt-regular"
                  size={"large"}
                  style={{ width: "100%" }}
                  showSearch
                  placeholder="เลือกตัวเลือก"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={zones.map((zone) => ({
                    value: zone._id,
                    label: zone.zone_name,
                  }))}
                  value={table.category_id}
                  onChange={(value) =>
                    setTable({ ...table, table_zone: value })
                  }
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
              เพิ่มโต๊ะ
            </Button>
          </form>
        </>
      )}
    </>
  );
};

export default CreateTablePage;
