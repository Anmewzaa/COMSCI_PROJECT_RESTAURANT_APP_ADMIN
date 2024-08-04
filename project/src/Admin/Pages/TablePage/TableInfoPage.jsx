// React Hook
import { useState, useEffect } from "react";
// Axios
import axios from "axios";
// React Router Dom
import { useParams } from "react-router-dom";
// SWAL
import Swal from "sweetalert2";
// QRCODE
import QRCode from "react-qr-code";

const TableInfoPage = () => {
  const { id } = useParams();
  const [tableinfo, setTableInfo] = useState([]);
  const [users, setUsers] = useState([]);
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);
  const [qrCode, setQrCode] = useState(false);
  const [table, setTable] = useState({
    employee: "",
    customer_amount: "",
  });
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState(1);
  const searchFilter = tableinfo?.table_order?.filter((item) => {
    if (search === 1) {
      return item.status === 1;
    } else if (search === 2) {
      return item.status === 2;
    } else if (search === 3) {
      return item.status === 3;
    }
  });
  const inputValue = (name) => (event) => {
    setTable({ ...table, [name]: event.target.value });
  };
  const fetchAPI = async () => {
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .get(`${import.meta.env.VITE_API_URL}/table/get/${id}`)
      .then((data) => {
        setTableInfo(data.data.response);
        priceCalculate(data.data.response.table_order);
      });
    await axios
      .get(`${import.meta.env.VITE_API_URL}/user/get`, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      })
      .then((data) => {
        setUsers(data.data.response);
      });
  };
  const closeTable = async () => {
    Swal.fire({
      title: "ต้องการยกเลิกโต๊ะใช่ไหม?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const JWT_TOKEN = localStorage.getItem("PARADISE_LOGIN_TOKEN");
        axios
          .put(
            `${import.meta.env.VITE_API_URL}/table/close/${tableinfo._id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${JWT_TOKEN}`,
              },
            }
          )
          .then((data) => {
            Swal.fire({
              title: "Deleted!",
              text: data,
              icon: "success",
            });
            window.location.replace(`/admin/table`);
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "รายการอาหารต้องว่าง",
              icon: "error",
            });
          });
      }
    });
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  const handleCheckboxChange = (itemId) => {
    setCart((prevCart) => {
      if (prevCart.includes(itemId)) {
        return prevCart.filter((cartItem) => cartItem !== itemId);
      } else {
        return [...prevCart, itemId];
      }
    });
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .put(
        `${import.meta.env.VITE_API_URL}/table/open/${id}`,
        {
          table_employee: table.employee,
          table_customer_amount: table.customer_amount,
        },
        {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        if (result.data.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: result.data.error,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "เปิดโต๊ะเสร็จสมบูรณ์",
            text: "...",
          }).then(() => {
            window.location.href = `/admin/table/${id}`;
          });
        }
      });
  };
  const changeOrderStatus = async (new_status) => {
    if (cart.length === 0) {
      return;
    }
    Swal.fire({
      title: "ต้องการที่จะส่งรายการอาหารใช่ไหม?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const JWT_TOKEN = localStorage.getItem("PARADISE_LOGIN_TOKEN");
        axios
          .put(
            `${import.meta.env.VITE_API_URL}/table/change_status/${id}`,
            { order_ids: cart, new_status: `${new_status + 1}` },
            {
              headers: {
                Authorization: `Bearer ${JWT_TOKEN}`,
              },
            }
          )
          .then((data) => {
            Swal.fire({
              title: "ส่งรายการอาหารสำเร็จ!",
              text: data,
              icon: "success",
            });
            window.location.replace(`/admin/table/${id}`);
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: err,
              icon: "error",
            });
          });
      }
    });
  };
  const priceCalculate = (orders) => {
    let totalPrice = 0;
    let totalCount = 0;
    orders?.forEach((item) => {
      if (item?.status === 3) {
        totalPrice += parseInt(item?.menu?.menu_price || 0);
        totalCount += 1;
      }
    });
    setPrice(totalPrice);
    setCount(totalCount);
  };
  const checkbill = async () => {
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .put(
        `${import.meta.env.VITE_API_URL}/table/checkbill/${tableinfo._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        }
      )
      .then(() => {
        console.log("Success");
      });
  };
  return (
    <>
      <h3>รายละเอียดโต๊ะ</h3>
      {tableinfo ? (
        <>
          {tableinfo.table_status === "close" ? (
            <>
              <form className="white-container mb-1" onSubmit={formSubmit}>
                <div>
                  <div className="table-header">
                    <h3 className="table-header-text">
                      โต๊ะที่ {tableinfo?.table_number}{" "}
                      <span>(เหมาะสำหรับ {tableinfo?.table_seat} ที่นั่ง)</span>
                    </h3>
                    <h3>
                      {tableinfo?.table_zone &&
                        tableinfo?.table_zone.map((item, index) => {
                          return <div key={index}>โซน{item.zone_name}</div>;
                        })}
                    </h3>
                  </div>
                </div>
                <div>
                  <label>พนักงาน</label>
                  <select
                    value={table.employee}
                    onChange={inputValue("employee")}
                    required
                  >
                    <option value="">เลือกตัวเลือก</option>
                    {users.map((user, index) => (
                      <option key={index} value={user._id}>
                        {user?.user_fullname}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>จำนวนลูกค้า</label>
                  <input
                    type="number"
                    placeholder="จำนวนลูกค้า"
                    onChange={inputValue("customer_amount")}
                    required
                  />
                </div>
                <button type="submit">เปิดโต๊ะ</button>
              </form>
            </>
          ) : (
            <>
              <div className="white-container mb-1">
                <>
                  <div className="table-header mb-1">
                    <h3 className="table-header-text">
                      โต๊ะที่ {tableinfo?.table_number}{" "}
                      <span>(เหมาะสำหรับ {tableinfo?.table_seat} ที่นั่ง)</span>
                    </h3>
                    <h3>
                      {tableinfo?.table_zone &&
                        tableinfo?.table_zone.map((item, index) => {
                          return <div key={index}>โซน{item.zone_name}</div>;
                        })}
                    </h3>
                  </div>
                  <div className="mb-1">
                    พนักงานประจำโต๊ะ{" "}
                    <span>
                      {tableinfo.table_employee &&
                        tableinfo.table_employee.map((item, index) => {
                          return <div key={index}>{item.user_fullname}</div>;
                        })}
                    </span>
                  </div>
                  <div className="mb-1">
                    <button
                      className="btn btn-red cursor"
                      onClick={() => {
                        closeTable();
                      }}
                      type="button"
                    >
                      ยกเลิก
                    </button>
                    <button
                      className="btn btn-blue cursor"
                      onClick={() => {
                        setQrCode((qrCode) => !qrCode);
                      }}
                    >
                      คิวอาร์โคด
                    </button>
                    <button className="btn btn-blue cursor">
                      เพิ่มรายการอาหาร
                    </button>
                  </div>
                  <div>
                    {qrCode && (
                      <QRCode
                        value={`${import.meta.env.VITE_API_URL}/${
                          tableinfo.table_id
                        }`}
                      />
                    )}
                  </div>
                </>
              </div>
              <div className="mb-1">
                <h3>รายการอาหาร</h3>
                <div className="white-container">
                  <div className="status-container">
                    <button
                      type="button"
                      onClick={() => setSearch(1)}
                      className={`cursor status-group sarabun-semibold ${
                        search == "1" ? "status-active" : ""
                      }`}
                    >
                      รายการอาหารใหม่
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearch(2)}
                      className={`cursor status-group sarabun-semibold ${
                        search == "2" ? "status-active" : ""
                      }`}
                    >
                      กำลังปรุง
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearch(3)}
                      className={`cursor status-group sarabun-semibold ${
                        search == "3" ? "status-active" : ""
                      }`}
                    >
                      เสร็จแล้ว
                    </button>
                  </div>
                  <div>
                    {searchFilter?.length === 0 ? (
                      <div className="empty-item">
                        <p className="sarabun-semibold">ไม่มีรายการอาหารใหม่</p>
                      </div>
                    ) : (
                      <>
                        {searchFilter &&
                          searchFilter.map((item, index) => {
                            const isChecked = cart.includes(item._id);
                            return (
                              <div key={index} className="item-box">
                                <div>
                                  <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={isChecked}
                                    onChange={() =>
                                      handleCheckboxChange(item._id)
                                    }
                                  ></input>
                                  {item?.menu?.menu_name?.thai}
                                  {item?.option}
                                </div>
                                <div>{item?.menu?.menu_price}</div>
                              </div>
                            );
                          })}
                        {search !== 3 ? (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                changeOrderStatus(search);
                              }}
                              className="btn btn-full btn-green cursor sarabun-semibold"
                            >
                              ส่งรายการอาหาร
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h3>ข้อมูลชำระเงิน</h3>
                <div className="white-container">
                  <div className="mb-1 checkbill">
                    <h4 className="checkbill-text">จำนวนรายการอาหารทั้งหมด</h4>
                    <h4>{count} รายการ</h4>
                  </div>
                  <div className="mb-1 checkbill">
                    <h4 className="checkbill-text">ยอดที่ต้องชำระ</h4>
                    <h4>{price} บาท</h4>
                  </div>
                  <button
                    onClick={() => checkbill()}
                    className="btn btn-full btn-green cursor sarabun-semibold"
                  >
                    ชำระเงิน
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default TableInfoPage;
