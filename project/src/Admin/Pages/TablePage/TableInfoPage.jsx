// React Hook
import { useState, useEffect } from "react";
// Axios
import axios from "axios";
// React Router Dom
import { useParams } from "react-router-dom";

const TableInfoPage = () => {
  const { id } = useParams();
  const [tableinfo, setTableInfo] = useState([]);
  const [users, setUsers] = useState([]);
  const fetchAPI = async () => {
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .get(`${import.meta.env.VITE_API_URL}/table/get/${id}`)
      .then((data) => {
        setTableInfo(data.data.response);
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
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <>
      <h3>รายละเอียดโต๊ะ</h3>
      <form className="white-container">
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
          <select>
            <option value="">เลือกตัวเลือก</option>
            {users.map((user) => (
              <option key={user.user_id} value={user._id}>
                {user?.user_fullname}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>จำนวนลูกค้า</label>
          <input type="text" placeholder="จำนวนลูกค้า" />
        </div>
        <button type="submit">เปิดโต๊ะ</button>
      </form>
    </>
  );
};

export default TableInfoPage;
