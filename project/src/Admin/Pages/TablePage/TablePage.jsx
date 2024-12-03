/* eslint-disable react-hooks/exhaustive-deps */
// CSS
import "../../CSS/TablePage.css";
import { Badge } from "antd";
// axios
import axios from "axios";
// React Hook
import { useState, useEffect, createContext, useContext } from "react";
// Context
export const TableContext = createContext(null);
import { UserContext } from "../AdminLayout";
// Antd
import {
  Drawer,
  InputNumber,
  Select,
  Divider,
  Button,
  Input,
  Spin,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
// Functions
import { openTable } from "../../functions/TableFunction";
// Componentes
import OpenTableInfo from "../../Components/OpenTableInfo";
// React Router Dom
import { Link, useNavigate } from "react-router-dom";

const TablePage = () => {
  // VARIABLE
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [currentItem, setCurrentItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [table, setTable] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [search, setSearch] = useState("");
  const [selectEmployee, setSelectEmployee] = useState("");
  const [selectCustomerAmount, setSelectCustomerAmount] = useState(0);
  const navigate = useNavigate();

  // FETCH DATA
  const fetchTables = async () => {
    try {
      const JWT_TOKEN = localStorage.getItem("PARADISE_LOGIN_TOKEN");
      await axios
        .get(`${import.meta.env.VITE_API_URL}/authen/table/get`, {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        })
        .then((data) => {
          setTable(data.data.response);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const fetchEmployee = async () => {
    try {
      const JWT_TOKEN = localStorage.getItem("PARADISE_LOGIN_TOKEN");
      await axios
        .get(`${import.meta.env.VITE_API_URL}/authen/user/get`, {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        })
        .then((data) => {
          setEmployee(data?.data?.response);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // USE EFFECT
  useEffect(() => {
    fetchTables();
    fetchEmployee();
  }, []);

  // FUNCTION
  const refreshData = () => {
    fetchTables();
    setOpen(false);
  };
  const showDrawer = (item) => {
    setCurrentItem(item);
    setOpen(true);
  };
  const hideDrawer = () => {
    setCurrentItem(null);
    setOpen(false);
  };
  const groupedByZone = table.reduce((acc, item) => {
    const zoneName = item.table_zone[0]?.zone_name;
    if (!zoneName) return acc;
    if (!acc[zoneName]) {
      acc[zoneName] = [];
    }
    acc[zoneName].push(item);
    return acc;
  }, {});
  const deleteTable = async (id) => {
    try {
      const JWT_TOKEN = localStorage.getItem("PARADISE_LOGIN_TOKEN");
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/authen/table/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const filteredTables = table.filter((item) => {
    return (
      item.table_number.toString().includes(search) ||
      item.table_zone[0]?.zone_name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      {loading ? (
        <Spin spinning={loading} fullscreen />
      ) : (
        <TableContext.Provider value={{ refreshData, table }}>
          <div className="form-input-container">
            <Input
              type="text"
              placeholder="ค้นหาโต๊ะ"
              className="cursor mr-1 prompt-semibold"
              value={search}
              size="large"
              onChange={(e) => setSearch(e.target.value)}
            />
            {user.user_access_rights === "Admin" && (
              <Button size="large" icon={<PlusOutlined />}>
                <Link to={"create"} className="prompt-semibold">
                  เพิ่มโต๊ะ
                </Link>
              </Button>
            )}
          </div>
          <div>
            {Object.keys(groupedByZone).map((zoneName) => (
              <div key={zoneName} className="table-page-contaner">
                <h3 className="zone-name">{zoneName}</h3>
                <ul className="table-map">
                  {groupedByZone[zoneName]
                    .filter((item) => filteredTables.includes(item))
                    .map((item, index) => (
                      <div key={index}>
                        <Badge
                          count={0}
                          offset={[0, 0]}
                          className={`table-map-item cursor ${
                            item.table_status === "open" && "active"
                          }`}
                          onClick={() => showDrawer(item)}
                        >
                          <h2 className="table-number inter-bold">
                            {item.table_number}
                          </h2>
                          <p className="table-zone prompt-medium">
                            {item.table_zone[0].zone_name}
                          </p>
                          <p className="table-sear prompt-medium">
                            {item.table_seat} ที่นั่ง
                          </p>
                        </Badge>
                      </div>
                    ))}
                </ul>
              </div>
            ))}
          </div>
          <Drawer
            title="รายละเอียดโต๊ะ"
            onClose={hideDrawer}
            open={open}
            loading={false}
            width="100%"
          >
            {currentItem && (
              <>
                <div>
                  {currentItem && currentItem.table_status !== "close" ? (
                    <>
                      <div className="top-container">
                        <div className="menuinfo-main-text">
                          <h2 className="prompt-bold">
                            โต๊ะที่ {currentItem.table_number}
                          </h2>
                          <p className="prompt-regular">{`(เหมาะสำหรับ ${currentItem.table_seat} ที่นั่ง)`}</p>
                        </div>
                      </div>
                      <OpenTableInfo item={currentItem} />
                    </>
                  ) : (
                    <>
                      <div className="top-container">
                        <div className="menuinfo-main-text">
                          <h2 className="prompt-bold">
                            โต๊ะที่ {currentItem.table_number}
                          </h2>
                          <p className="prompt-regular">{`(เหมาะสำหรับ ${currentItem.table_seat} ที่นั่ง)`}</p>
                        </div>
                        <div>
                          {user.user_access_rights === "Admin" && (
                            <>
                              <Button
                                onClick={() => {
                                  navigate(`edit/${currentItem._id}`);
                                }}
                                className="prompt-semibold mr-1"
                              >
                                แก้ไขโต๊ะ
                              </Button>
                              <Button
                                onClick={() => {
                                  deleteTable(currentItem._id);
                                }}
                                className="prompt-semibold"
                              >
                                ลบโต๊ะ
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="menuinfo-opentable prompt-semibold">
                        <div className="mb-1 ">
                          <label>พนักงาน</label>
                          <Select
                            className="prompt-medium"
                            size="large"
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
                            className="prompt-medium"
                            size="large"
                            min={1}
                            max={10}
                            defaultValue={0}
                            style={{
                              width: "100%",
                            }}
                            onChange={(value) => setSelectCustomerAmount(value)}
                            value={selectCustomerAmount}
                            required
                          />
                        </div>
                        <Button
                          size="large"
                          block
                          className="prompt-semibold"
                          onClick={() =>
                            openTable(
                              currentItem._id,
                              selectEmployee,
                              selectCustomerAmount
                            )
                          }
                        >
                          เปิดโต๊ะ
                        </Button>
                        <Divider />
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </Drawer>
        </TableContext.Provider>
      )}
    </>
  );
};

export default TablePage;
