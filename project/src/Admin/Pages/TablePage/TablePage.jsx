// Axios
import axios from "axios";
// React Hook
import { useState, useEffect } from "react";
// CSS
import "../../CSS/TablePage.css";
// Componentes
import TableBox from "../../Components/TableBox";
// React Router Dom
import { Outlet } from "react-router-dom";

const TablePage = () => {
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
                <button className="btn btn-green sarabun-extrabold cursor">
                  สร้างโต๊ะ
                </button>
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
