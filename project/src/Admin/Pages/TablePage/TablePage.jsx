/* eslint-disable react-hooks/exhaustive-deps */
// CSS
import "../../CSS/TablePage.css";
// axios
import axios from "axios";
// React Hook
import { useState, useEffect } from "react";
// Antd
import { Drawer, InputNumber, Select, Divider } from "antd";
// Functions
import { openTable } from "../../functions/TableFunction";
// Componentes
import OpenTableInfo from "../../Components/OpenTableInfo";

const TablePage = () => {
  const JWT_TOKEN = localStorage.getItem("PARADISE_LOGIN_TOKEN");
  const [currentItem, setCurrentItem] = useState(null);
  const [open, setOpen] = useState(false);
  const showDrawer = (item) => {
    setCurrentItem(item);
    setOpen(true);
  };
  const hideDrawer = () => {
    setCurrentItem(null);
    setOpen(false);
  };
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/category/get`)
      .then((data) => {
        setCategories(data.data.response);
      });
  };
  const [table, setTable] = useState([]);
  const fetchTables = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/authen/table/get`, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      })
      .then((data) => {
        setTable(data.data.response);
      });
  };
  const [employee, setEmployee] = useState([]);
  const fetchEmployee = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/authen/user/get`, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      })
      .then((data) => {
        setEmployee(data?.data?.response);
      });
  };
  const [search, setSearch] = useState("");
  const [selectEmployee, setSelectEmployee] = useState("");
  const [selectCustomerAmount, setSelectCustomerAmount] = useState(0);
  useEffect(() => {
    fetchCategories();
    fetchTables();
    fetchEmployee();
  }, []);

  return (
    <>
      <div className="table-page-contaner">
        <div className="categories-container">
          <ul className="categories-box">
            <li
              className={`categories-item cursor ${
                search === "" ? "categories-active" : ""
              }`}
              onClick={() => setSearch("")}
            >
              ทั้งหมด
            </li>
            {categories &&
              categories.map((item, index) => (
                <li
                  key={index}
                  className={`categories-item cursor ${
                    search === item.category_name.thai
                      ? "categories-active"
                      : ""
                  }`}
                  onClick={() => setSearch(item.category_name.thai)}
                >
                  {item.category_name.thai}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="table-page-contaner">
        <ul className="table-map">
          {table &&
            table.map((item, index) => (
              <div key={index}>
                <li
                  className={`table-map-item cursor ${
                    item.table_status === "open" && "active"
                  }`}
                  onClick={() => showDrawer(item)}
                >
                  <h2 className="table-number">{item.table_number}</h2>
                  <p className="table-zone">{item.table_zone[0].zone_name}</p>
                  <p className="table-sear">{item.table_seat} ที่นั่ง</p>
                </li>
              </div>
            ))}
        </ul>
      </div>
      <Drawer
        title="รายละเอียดโต๊ะ"
        onClose={hideDrawer}
        open={open}
        loading={false}
        size="large"
      >
        {currentItem && (
          <>
            <div>
              <div className="menuinfo-main-text">
                <h2>โต๊ะที่ {currentItem.table_number}</h2>
                <p>{`(เหมาะสำหรับ ${currentItem.table_seat} ที่นั่ง)`}</p>
              </div>
              {currentItem && currentItem.table_status !== "close" ? (
                <>
                  <OpenTableInfo item={currentItem} />
                </>
              ) : (
                <>
                  <div className="menuinfo-opentable">
                    <div className="mb-1">
                      <label>พนักงาน</label>
                      <Select
                        showSearch
                        placeholder="เลือกพนักงานประจำโต๊ะ"
                        optionFilterProp="label"
                        style={{
                          width: "100%",
                        }}
                        options={employee.map((item) => ({
                          value: item._id,
                          label: item.user_fullname,
                        }))}
                        onChange={(value) => setSelectEmployee(value)}
                      />
                    </div>
                    <div className="mb-1">
                      <label>จำนวนลูกค้า</label>
                      <InputNumber
                        min={1}
                        max={10}
                        defaultValue={0}
                        style={{
                          width: "100%",
                        }}
                        onChange={(value) => setSelectCustomerAmount(value)}
                        value={selectCustomerAmount}
                      />
                    </div>
                    <button
                      className="btn-full btn-green cursor"
                      onClick={() =>
                        openTable(
                          currentItem._id,
                          selectEmployee,
                          selectCustomerAmount
                        )
                      }
                    >
                      เปิดโต๊ะ
                    </button>
                    <Divider />
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </Drawer>
    </>
  );
};

export default TablePage;
