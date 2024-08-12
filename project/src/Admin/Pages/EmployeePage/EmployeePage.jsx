// Axios
import axios from "axios";
// React Hook
import { useState, useEffect } from "react";
// React Router Dom
import { Link } from "react-router-dom";
// Components
import EditComponent from "../../Components/EditComponent";
// SWAL
import Swal from "sweetalert2";

const EmployeePage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const searchFilter = users?.filter((item) => {
    if (search === "") {
      return item;
    }
    return (
      item?.user_fullname.toLowerCase().includes(search.toLowerCase()) ||
      item?.user_nickname.toLowerCase().includes(search.toLowerCase()) ||
      item?.user_role.toLowerCase().includes(search.toLowerCase()) ||
      item?.user_telnum.toLowerCase().includes(search.toLowerCase())
    );
  });
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
              <th>หน้าที่</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {searchFilter &&
              searchFilter.map((item, index) => {
                return (
                  <>
                    <tr key={item?.category_id} className="sarabun-regular">
                      <td>{index + 1}</td>
                      <td>{`${item?.user_fullname} (${item?.user_nickname})`}</td>
                      <td>{item?.user_telnum}</td>
                      <td>{item?.user_role}</td>
                      <td className="action-btn-container">
                        <EditComponent id={item?.user_id} />
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: "ต้องการลบใช่ไหม?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                const JWT_TOKEN = localStorage.getItem(
                                  "PARADISE_LOGIN_TOKEN"
                                );
                                axios
                                  .delete(
                                    `${
                                      import.meta.env.VITE_API_URL
                                    }/user/delete/${item?.user_id}`,
                                    {
                                      headers: {
                                        Authorization: `Bearer ${JWT_TOKEN}`,
                                      },
                                    }
                                  )
                                  .then(() => {
                                    Swal.fire({
                                      title: "Deleted!",
                                      text: "Your file has been deleted.",
                                      icon: "success",
                                    });
                                    window.location.replace(`/admin/employee`);
                                  });
                              }
                            });
                          }}
                          className="btn btn-red cursor sarabun-semibold"
                        >
                          ลบ
                        </button>
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
