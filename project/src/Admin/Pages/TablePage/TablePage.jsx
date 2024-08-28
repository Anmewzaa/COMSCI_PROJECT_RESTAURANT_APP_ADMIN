// Axios
import axios from "axios";
// React Hook
import { useState, useEffect, useContext } from "react";
// CSS
import "../../CSS/TablePage.css";
// Componentes
import TableBox from "../../Components/TableBox";
// React Router Dom
import { Outlet, useNavigate } from "react-router-dom";
// Context
import { UserContext } from "../AdminLayout";

const TablePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [table, setTable] = useState([]);
  const fetchAPI = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/table/get`)
      .then((data) => {
        setTable(data.data.response);
      });
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <>
      <div className="table-container">
        {table ? (
          <>
            <div className="table-select-box">
              <div className="table-container-box">
                <h3 className="sarabun-extrabold">โต๊ะทั้งหมด</h3>
                {user.user_access_rights === "Admin" && (
                  <button
                    className="btn btn-green sarabun-extrabold cursor"
                    onClick={() => navigate("/admin/table/create")}
                  >
                    สร้างโต๊ะ
                  </button>
                )}
              </div>
              <div className="white-container table-box-grid">
                {table &&
                  table.map((item, index) => {
                    return <TableBox key={index} item={item} />;
                  })}
              </div>
            </div>
            <div className="table-info-box">
              <Outlet />
            </div>
          </>
        ) : (
          <>EMPTY</>
        )}
      </div>
    </>
  );
};

export default TablePage;
