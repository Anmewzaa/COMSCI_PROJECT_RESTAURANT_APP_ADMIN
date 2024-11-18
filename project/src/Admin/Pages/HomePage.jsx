// CSS
import "../CSS/HomePage.css";
// Axios
import axios from "axios";
// react
import { useState, useEffect } from "react";
// Antd
import { Spin, Statistic, DatePicker, Empty } from "antd";
// Dayjs
import dayjs from "dayjs";
// Components
import IncomeProfit from "../Components/IncomeProfit";
import MenuChart from "../Components/MenuChart";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const JWT_TOKEN = localStorage.getItem("PARADISE_LOGIN_TOKEN");
  const [shopData, setShopData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [totals, setTotals] = useState({
    visits: 0,
    orders: 0,
    tables: 0,
  });
  const fetchAPI = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/authen/shop/getall`, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      })
      .then((data) => {
        setShopData(data.data.response);
      });
  };
  const handleDateChange = (date) => {
    if (!date) {
      setFilteredData(shopData);
      setSelectedDate(dayjs());
      return;
    }
    setSelectedDate(date);

    const selectedMonth = date.month();
    const selectedYear = date.year();

    const filtered = shopData.filter((item) => {
      const itemDate = dayjs(item.date);
      return (
        itemDate.year() === selectedYear && itemDate.month() === selectedMonth
      );
    });
    setFilteredData(filtered);
  };
  const calculateTotals = (data) => {
    const totalVisits = data.reduce((acc, item) => acc + item.visits, 0);
    const totalOrders = data.reduce((acc, item) => acc + item.orders, 0);
    const totalTables = data.reduce((acc, item) => acc + item.tables, 0);

    setTotals({
      visits: totalVisits,
      orders: totalOrders,
      tables: totalTables,
    });

    setLoading(false);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  useEffect(() => {
    const filtered = shopData.filter((item) => {
      const itemDate = dayjs(item.date);
      return (
        itemDate.year() === selectedDate.year() &&
        itemDate.month() === selectedDate.month()
      );
    });
    setFilteredData(filtered);
    calculateTotals(filtered);
  }, [shopData, selectedDate]);

  return (
    <>
      {loading ? (
        <>
          <Spin fullscreen />
        </>
      ) : (
        <>
          <div className="home-contianer">
            <div className="home-btn-group mb-1">
              <DatePicker
                picker="month"
                value={selectedDate}
                onChange={handleDateChange}
                format="DD/MM/YYYY"
                className="prompt-bold"
              />
            </div>
            {filteredData.length > 0 ? (
              <>
                <div className="static-container mb-1">
                  <div className="white-container prompt-semibold">
                    <Statistic title="ลูกค้าทั้งหมด" value={totals.visits} />
                  </div>
                  <div className="white-container prompt-semibold">
                    <Statistic
                      title="รายการอาหารที่ถูกสั่งทั้งหมด"
                      value={totals.orders}
                    />
                  </div>
                  <div className="white-container prompt-semibold">
                    <Statistic
                      title="จำนวนโต๊ะที่ถูกเปิดทั้งหมด"
                      value={totals.tables}
                    />
                  </div>
                </div>
                <div className="chart-container">
                  <div className="white-container">
                    {filteredData.length > 0 ? (
                      <>
                        <IncomeProfit
                          value={filteredData}
                          selectdate={selectedDate}
                          key={`${selectedDate.year()}-${selectedDate.month()}`}
                        />
                      </>
                    ) : (
                      <Empty />
                    )}
                  </div>
                  <div className="white-container">
                    <MenuChart value={filteredData} />
                  </div>
                </div>
              </>
            ) : (
              <Empty />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
