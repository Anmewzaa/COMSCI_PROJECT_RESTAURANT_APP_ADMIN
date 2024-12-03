// CSS
import "../CSS/HomePage.css";
// Axios
import axios from "axios";
// react
import { useState, useEffect } from "react";
// Antd
import { Spin, Statistic, DatePicker, Empty } from "antd";
const { RangePicker } = DatePicker;
// Components
import IncomeProfit from "../Components/IncomeProfit";

const HomePage = () => {
  // VARIABLE
  const [dateRange, setDateRange] = useState([null, null]);
  const [staticData, setStaticData] = useState([]);
  const [totalVisits, setTotalVisits] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  // FUNCTION
  const calculateTotals = (data) => {
    let totalVisits = 0;
    let totalIncome = 0;
    let totalProfit = 0;

    for (const record of data) {
      for (const info of record.static_info) {
        totalVisits += info.visits;
        totalIncome += info.income;
        totalProfit += info.profit;
      }
    }

    return { totalVisits, totalIncome, totalProfit };
  };

  const handleDateChange = (dates) => {
    if (dates) {
      setDateRange([dates[0].toDate(), dates[1].toDate()]);
    } else {
      setDateRange([null, null]);
    }
  };

  const fetchAPI = () => {
    const JWT_TOKEN = localStorage.getItem("PARADISE_LOGIN_TOKEN");
    axios
      .get(`${import.meta.env.VITE_API_URL}/authen/static/get`, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      })
      .then((data) => {
        const rawData = data.data.response;
        const filteredData = filterDataByDateRange(rawData, dateRange); // กรองข้อมูลตามช่วงเดือน
        setStaticData(filteredData);

        const calculatedTotals = calculateTotals(filteredData);
        setTotalVisits(calculatedTotals.totalVisits);
        setTotalIncome(calculatedTotals.totalIncome);
        setTotalProfit(calculatedTotals.totalProfit);
      });
  };

  const filterDataByDateRange = (data, dateRange) => {
    if (!dateRange[0] || !dateRange[1]) return data; // ถ้าไม่ได้เลือกช่วงวันที่ ให้คืนข้อมูลทั้งหมด

    const [startDate, endDate] = dateRange;

    return data.filter((record) => {
      const recordDate = new Date(record.static_date); // แปลงวันที่ในข้อมูลเป็น Date object
      return recordDate >= startDate && recordDate <= endDate; // ตรวจสอบว่าช่วงวันที่อยู่ใน range ที่เลือกหรือไม่
    });
  };

  // USE EFFECT
  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      {/* <div className="container-left">
        <RangePicker
          onChange={handleDateChange}
          format="DD/MM/YYYY"
          placeholder={["วันที่เริ่ม", "วันที่สิ้นสุด"]}
          size="large"
        />
      </div> */}
      <div className="white-container">
        <div className="static-container">
          <div className="box">
            <Statistic title="จำนวนลูกค้าทั้งหมด (คน)" value={totalVisits} />
          </div>
          <div className="box">
            <Statistic title="จำนวนรายได้ทั้งหมด (บาท)" value={totalIncome} />
          </div>
          <div className="box">
            <Statistic title="จำนวนกำไรทั้งหมด (บาท)" value={totalProfit} />
          </div>
        </div>
      </div>
      <div className="white-container">
        <IncomeProfit value={staticData} selectdate={dateRange} />
      </div>
    </>
  );
};

export default HomePage;
