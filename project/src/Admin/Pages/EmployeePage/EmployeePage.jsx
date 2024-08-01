// Axios
import axios from "axios";
// React Hook
import { useState, useEffect } from "react";
// React Router Dom
import { Link } from "react-router-dom";
// Components
import EditComponent from "../../Components/EditComponent";
import DeleteComponent from "../../Components/DeleteComponent";

const EmployeePage = () => {
  const [users, setUsers] = useState([]);
  const fetchAPI = async () => {
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
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
      <div className="form-input-container">
        <input
          type="text"
          placeholder="ค้นหาพนักงาน"
          className="cursor sarabun-semibold"
        />
        <Link to={"create"} className="sarabun-semibold">
          เพิ่มพนักงาน
        </Link>
      </div>
      <div className="form-table-container">
        <table>
          <thead>
            <tr className="sarabun-semibold">
              <th>#</th>
              <th>ชื่อ</th>
              <th>เบอร์โทร</th>
              <th>ตำแหน่ง</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((item, index) => {
                return (
                  <>
                    <tr key={item?.category_id} className="sarabun-regular">
                      <td>{index + 1}</td>
                      <td>{`${item?.user_fullname} (${item?.user_nickname})`}</td>
                      <td>{item?.user_telnum}</td>
                      <td>{item?.user_role}</td>
                      <td className="action-btn-container">
                        <EditComponent id={item?.user_id} />
                        <DeleteComponent id={item?.user_id} name={"category"} />
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeePage;
