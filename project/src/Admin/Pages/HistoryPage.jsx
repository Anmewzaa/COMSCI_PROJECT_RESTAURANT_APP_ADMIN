// Axios
import axios from "axios";
// React Hook
import { useState, useEffect } from "react";
// CSS
import "../CSS/HistoryPage.css";
// Antd
import { Table, DatePicker, Button, Drawer, Timeline } from "antd";
const { RangePicker } = DatePicker;

const HistoryPage = () => {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [tableHistoryData, setTableHistoryData] = useState();
  const [dateRange, setDateRange] = useState([null, null]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [selectedData, setSelectedData] = useState([]);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 900);
  };
  const handleDateChange = (dates) => {
    if (dates) {
      setDateRange([dates[0].toDate(), dates[1].toDate()]);
    } else {
      setDateRange([null, null]);
    }
  };
  const searchFilter = tableHistoryData?.filter((item) => {
    const itemDate = new Date(item.date);
    const [start, end] = dateRange;
    const isWithinDateRange =
      start && end ? itemDate >= start && itemDate <= end : true;
    return isWithinDateRange;
  });
  const fetchAPI = async () => {
    const JWT_TOKEN = localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .get(`${import.meta.env.VITE_API_URL}/authen/history/get`, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      })
      .then((data) => {
        const sortedData = data.data.response.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setTableHistoryData(sortedData);
        setLoadingStatus(false);
      });
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    fetchAPI();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [open, setOpen] = useState(false);
  const showDrawer = (items) => {
    setSelectedData(items[0].table_order);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const getTimelineColor = (status) => {
    switch (status) {
      case 1:
        return "blue";
      case 2:
        return "yellow";
      case 3:
        return "green";
      case 4:
        return "red";
      default:
        return "gray";
    }
  };
  const getTimelineText = (status) => {
    switch (status) {
      case 1:
        return "ยังไม่ทำ";
      case 2:
        return "กำลังทำ";
      case 3:
        return "เสร็จแล้ว";
      case 4:
        return "ยกเลิก";
      default:
        return "-";
    }
  };

  return (
    <>
      <div className="container-left">
        <RangePicker
          onChange={handleDateChange}
          format="DD/MM/YYYY"
          placeholder={["วันที่เริ่ม", "วันที่สิ้นสุด"]}
          size="large"
        />
      </div>
      <div>
        <Table
          columns={[
            {
              title: "วันที่",
              key: "date",
              dataIndex: "date",
              render: (text) => (
                <>{new Date(text).toLocaleDateString("th-TH")}</>
              ),
            },
            {
              title: "หมายเลขโต๊ะ",
              dataIndex: "table",
              key: "table",
              render: (items) => (
                <>
                  {items.map((item, index) => {
                    return <div key={index}>{item.table_number}</div>;
                  })}
                </>
              ),
            },
            {
              title: "จำนวนลูกค้า",
              dataIndex: "table",
              key: "table",
              render: (items) => (
                <>
                  {items.map((item, index) => {
                    return (
                      <div key={index}>{item.table_customer_amount} คน</div>
                    );
                  })}
                </>
              ),
            },
            {
              title: "จำนวนลูกค้า",
              dataIndex: "table",
              key: "table",
              render: (items) => (
                <>
                  {items.map((item, index) => {
                    return (
                      <div key={index}>{item.table_customer_amount} คน</div>
                    );
                  })}
                </>
              ),
            },
            {
              title: "พนักงานดูแล",
              dataIndex: "table",
              key: "table",
              render: (items) => (
                <>
                  {items.map((item, index) => {
                    return (
                      <div key={index}>
                        {item.table_employee[0].user_fullname}
                      </div>
                    );
                  })}
                </>
              ),
            },
            {
              title: "รายการอาหารที่สั่ง",
              dataIndex: "table",
              key: "table",
              render: (items) => (
                <>
                  <Button onClick={() => showDrawer(items)}>ดูเพิ่มเติม</Button>
                </>
              ),
            },
          ]}
          dataSource={searchFilter}
          className="form-table-container"
          loading={loadingStatus}
          scroll={isMobile ? { x: 900 } : null}
        />
        <Drawer
          title="ประวัติรายการอาหาร"
          onClose={onClose}
          open={open}
          placement={"right"}
        >
          <>
            {selectedData && selectedData.length > 0 ? (
              <>
                <Timeline>
                  {selectedData.map((item, index) => (
                    <Timeline.Item
                      key={index}
                      color={getTimelineColor(item.status)}
                    >
                      <div>
                        <div className="timeline-container-header">
                          <h4>{item.menu.menu_name.thai} </h4>
                          <p>{getTimelineText(item.status)}</p>
                        </div>
                        <p>ราคา: {item.menu.menu_price} บาท</p>
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </>
            ) : (
              <></>
            )}
          </>
        </Drawer>
      </div>
    </>
  );
};

export default HistoryPage;
