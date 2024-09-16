// CSS
import "../CSS/HomePage.css";
// Axios
import axios from "axios";
// react
import { useState, useEffect } from "react";
// Components
import ImcomeComponents from "../Components/ImcomeComponents";
import FoodBoardComponents from "../Components/FoodBoardComponents";

const HomePage = () => {
  const JWT_TOKEN = localStorage.getItem("PARADISE_LOGIN_TOKEN");
  const [weeklyData, setWeeklyData] = useState([]);
  const fetchAPI = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/shop/get`, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      })
      .then((data) => {
        setWeeklyData(data.data.response);
      });
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <div className="dashboard-layout">
        <div className="white-container daily-container">
          <h4>ข้อมูลวันนี้</h4>
          <p>รายละเอียดข้อมูลวันนี้</p>
          <div className="daily-data">
            <div className="item">
              <h4>จำนวนลูกค้า</h4>
              <p>{weeklyData?.visits}</p>
            </div>
            <div>
              <h4>จำนวนโต๊ะทั้งหมด</h4>
              <p>{weeklyData?.tables}</p>
            </div>
            <div>
              <h4>จำนวนรายการอาหารทั้งหมด</h4>
              <p>{weeklyData?.orders}</p>
            </div>
          </div>
        </div>
        <div className="white-container food-container">
          <FoodBoardComponents data={weeklyData.menus} />
        </div>
        <div className="white-container income-container">
          <ImcomeComponents data={weeklyData.money} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
