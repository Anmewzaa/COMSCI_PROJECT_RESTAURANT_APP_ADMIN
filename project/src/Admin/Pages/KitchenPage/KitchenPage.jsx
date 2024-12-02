// axios
import axios from "axios";
// Antd
import { Button } from "antd";
// React Hook
import { useState, useEffect } from "react";
// CSS
import "../../CSS/KitchenPage.css";

import { changeOrderStatus } from "../../functions/TableFunction";

const KitchenPage = () => {
  // VARIABLE
  const [tableOrder, setTableOrder] = useState({
    new: [],
    cooking: [],
    done: [],
  });
  // FETCH API
  const fetchTableData = () => {
    try {
      const JWT_TOKEN = localStorage.getItem("PARADISE_LOGIN_TOKEN");
      axios
        .get(`${import.meta.env.VITE_API_URL}/authen/table/get`, {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        })
        .then((data) => {
          const newOrders = [];
          const cookingOrders = [];
          const doneOrders = [];

          data.data.response.forEach((table) => {
            const tableNumber = table.table_number;

            table.table_order.forEach((order) => {
              const orderWithTableNumber = {
                ...order,
                table_number: tableNumber,
              };
              if (order.status === 1) {
                newOrders.push(orderWithTableNumber);
              } else if (order.status === 2) {
                cookingOrders.push(orderWithTableNumber);
              } else if (order.status === 3) {
                doneOrders.push(orderWithTableNumber);
              }
            });
          });

          setTableOrder({
            new: newOrders,
            cooking: cookingOrders,
            done: doneOrders,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };
  // USE EFFECT
  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <>
      <div className="left-container">
        <Button
          onClick={() => {
            fetchTableData();
          }}
        >
          รีเฟรช
        </Button>
      </div>
      <div className="kitchen-container">
        <div className="kitchen-box">
          <div className="kitchen-header bg-red">
            <h4>รายการอาหารใหม่</h4>
          </div>
          <div className="kitchen-item">
            {tableOrder && tableOrder.new.length > 0 ? (
              <>
                {tableOrder.new.map((item, index) => {
                  return (
                    <div key={index} className="kitchen-card">
                      <h4 className="table-number">
                        โต๊ะที่ {item.table_number}
                      </h4>
                      <div>
                        {item.menu.menu_name.thai}
                        <div className="table-option">
                          {item.option.map((item, index) => {
                            return <div key={index}>- {item}</div>;
                          })}
                        </div>
                      </div>
                      <h4>{item.menu.menu_price} บาท</h4>
                    </div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="kitchen-box">
          <div className="kitchen-header bg-yellow">
            <h4>กำลังปรุง</h4>
          </div>
          <div className="kitchen-item">
            {tableOrder && tableOrder.cooking.length > 0 ? (
              <>
                {tableOrder.cooking.map((item, index) => {
                  return (
                    <div key={index} className="kitchen-card">
                      <h4 className="table-number">
                        โต๊ะที่ {item.table_number}
                      </h4>
                      <div>
                        {item.menu.menu_name.thai}
                        <div className="table-option">
                          {item.option.map((item, index) => {
                            return <div key={index}>- {item}</div>;
                          })}
                        </div>
                      </div>
                      <h4>{item.menu.menu_price} บาท</h4>
                    </div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="kitchen-box">
          <div className="kitchen-header bg-green">
            <h4>เสร็จแล้ว</h4>
          </div>
          <div className="kitchen-item">
            {tableOrder && tableOrder.done.length > 0 ? (
              <>
                {tableOrder.done.map((item, index) => {
                  return (
                    <div key={index} className="kitchen-card">
                      <h4 className="table-number">
                        โต๊ะที่ {item.table_number}
                      </h4>
                      <div>
                        {item.menu.menu_name.thai}
                        <div className="table-option">
                          {item.option.map((item, index) => {
                            return <div key={index}>- {item}</div>;
                          })}
                        </div>
                      </div>
                      <h4>{item.menu.menu_price} บาท</h4>
                    </div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default KitchenPage;
