// React Hook
import { useState, useEffect } from "react";
// React Router Dom
import { useParams } from "react-router-dom";
// axios
import axios from "axios";
// SWAL
import Swal from "sweetalert2";
// Antd
import { Select, Input, Button, InputNumber } from "antd";

const EditTablePage = () => {
  const { id } = useParams();
  const [table, setTable] = useState({
    table_number: 0,
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
      .get(`${import.meta.env.VITE_API_URL}/authen/zone/get`, {
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
        console.log(data);

        setInitialValue(
          "table_number",
          `${data?.data?.response?.table_number}`
        );
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
        {},
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
            window.location.href = "/table";
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
                <label className="prompt-semibold">เลขโต๊ะ</label>
                <InputNumber
                  className="prompt-medium"
                  size="large"
                  min={1}
                  max={10}
                  defaultValue={0}
                  style={{
                    width: "100%",
                  }}
                  onChange={(value) =>
                    setTable({ ...table, table_number: value })
                  }
                  value={table.table_number}
                />
              </div>
              <div>
                <label className="prompt-semibold">จำนวนที่นั่ง</label>
                <Input
                  placeholder="เลขโต๊ะ"
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
                  value={table.table_zone}
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
              อัพเดทโต๊ะ
            </Button>
          </form>
        </>
      ) : (
        <>Empty</>
      )}
    </>
  );
};

export default EditTablePage;
