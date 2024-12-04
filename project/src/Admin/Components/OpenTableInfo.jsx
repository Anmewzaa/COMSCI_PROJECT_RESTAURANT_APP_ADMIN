/* eslint-disable react/prop-types */
// Antd
import { Divider, Steps, Table, Modal, QRCode, Button, Tag } from "antd";
import { QrcodeOutlined } from "@ant-design/icons";
// react
import { useState, useContext } from "react";
import { TableContext } from "../Pages/TablePage/TablePage";
// Image
import AppLogo from "../../images/app-logo.png";
import {
  ShoppingCartOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
// Day
import dayjs from "dayjs";
// Functions
import {
  checkbill,
  closeTable,
  changeOrderStatus,
} from "../functions/TableFunction";

const OpenTableInfo = ({ item, table }) => {
  // VARIABLE
  const { refreshData } = useContext(TableContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenuIds, setSelectedMenuIds] = useState([]);
  const [current, setCurrent] = useState(0);

  // FUNCTION
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const menuIds = selectedRows.map((row) => row._id);
      setSelectedMenuIds(menuIds);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };
  const columns = [
    {
      title: "ชื่อ",
      dataIndex: ["menu", "menu_name"],
      key: "name",
      width: "24%",
      render: (item, record) => {
        if (!record.menu) {
          return <div className="deleted-menu">เมนูที่ถูกลบ</div>;
        }
        return <div>{`${item.thai} (${item.english})`}</div>;
      },
    },
    {
      title: "ตัวเลือกเสริม",
      dataIndex: ["option"],
      key: "price",
      width: "24%",
      render: (item) => (
        <>
          {item.length > 0 ? (
            <>
              {item &&
                item.map((item, index) => {
                  return <div key={index}>- {item}</div>;
                })}
            </>
          ) : (
            <></>
          )}
        </>
      ),
    },
    {
      title: "ราคา (บาท)",
      dataIndex: ["menu", "menu_price"],
      key: "price",
      width: "24%",
    },
    {
      title: "เวลา",
      dataIndex: ["menu", "updatedAt"],
      key: "price",
      width: "24%",
      render: (updatedAt) => {
        const formattedTime = dayjs(updatedAt).format("HH:mm:ss");
        return formattedTime;
      },
    },
  ];
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (value) => {
    setCurrent(value);
  };
  const filterOrdersByStatus = (status) => {
    return item.table_order.filter((order) => order.status === status);
  };
  const countOrdersByStatus = (status) => {
    return filterOrdersByStatus(status).length;
  };
  const calculateTotalPrice = (orders) => {
    return orders.reduce((total, order) => {
      const price = order.menu?.menu_price || 0;
      const numericPrice = Number(price);
      return total + numericPrice;
    }, 0);
  };
  const steps = [
    {
      title: "รายการอาหารใหม่",
      description: "ขั้นตอนที่ 1",
      width: "100",
      content: (
        <div>
          <br />
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            rowKey={(record) => record}
            columns={columns}
            dataSource={filterOrdersByStatus(1)}
            pagination={{ pageSize: 10 }}
            scroll={{ x: "max-content", y: "calc(50vh)" }}
            title={() => (
              <div className="left-side-container">
                <Button
                  className="prompt-semibold mr-1"
                  onClick={() => {
                    changeOrderStatus(item._id, current + 2, selectedMenuIds);
                  }}
                >
                  ส่งรายการอาหาร
                </Button>
                <Button
                  className="prompt-semibold mr-1"
                  onClick={() => {
                    changeOrderStatus(item._id, 4, selectedMenuIds);
                  }}
                >
                  ลบรายการอาหาร
                </Button>
                <Button
                  className="prompt-semibold"
                  onClick={() => refreshData()}
                >
                  รีเฟรช
                </Button>
              </div>
            )}
            footer={() => (
              <>
                <div className="summary-price mb-05">
                  <h4>ทั้งหมด</h4>
                  <h4>{countOrdersByStatus(1)} รายการ</h4>
                </div>
              </>
            )}
          />
        </div>
      ),
    },
    {
      title: "กำลังทำ",
      description: "ขั้นตอนที่ 2",
      content: (
        <>
          <br />
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            rowKey={(record) => record}
            columns={columns}
            dataSource={filterOrdersByStatus(2)}
            pagination={{ pageSize: 10 }}
            scroll={{ x: "max-content", y: "calc(50vh)" }}
            title={() => (
              <div className="left-side-container">
                <Button
                  className="prompt-semibold mr-1"
                  onClick={() => {
                    changeOrderStatus(item._id, current + 2, selectedMenuIds);
                  }}
                >
                  ส่งรายการอาหาร
                </Button>
                <Button
                  className="prompt-semibold mr-1"
                  onClick={() => {
                    changeOrderStatus(item._id, 4, selectedMenuIds);
                  }}
                >
                  ลบรายการอาหาร
                </Button>
                <Button
                  className="prompt-semibold"
                  onClick={() => refreshData()}
                >
                  รีเฟรช
                </Button>
              </div>
            )}
            footer={() => (
              <>
                <div className="summary-price mb-05">
                  <h4>ทั้งหมด</h4>
                  <h4>{countOrdersByStatus(2)} รายการ</h4>
                </div>
              </>
            )}
          />
        </>
      ),
    },
    {
      title: "เสร็จแล้ว",
      description: "ขั้นตอนที่ 3",
      content: (
        <>
          <br />
          <Table
            columns={columns}
            dataSource={filterOrdersByStatus(3)}
            pagination={{ pageSize: 10 }}
            scroll={{ x: "max-content", y: "calc(50vh)" }}
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            title={() => (
              <div className="left-side-container">
                <Button
                  className="prompt-semibold"
                  onClick={() => refreshData()}
                >
                  รีเฟรช
                </Button>
              </div>
            )}
            footer={() => (
              <>
                <div className="summary-price mb-05">
                  <h4>ทั้งหมด</h4>
                  <h4>{countOrdersByStatus(3)} รายการ</h4>
                </div>
                <div className="summary-price">
                  <h4>ราคารวม</h4>
                  <h4>{calculateTotalPrice(filterOrdersByStatus(3))} บาท</h4>
                </div>
              </>
            )}
          />
          <br />
          <Button
            block
            onClick={() => {
              checkbill(item._id, item);
            }}
          >
            <ShoppingCartOutlined />
            ชำระเงิน
          </Button>
        </>
      ),
    },
    {
      title: "ยกเลิก",
      description: "ขั้นตอนที่ 4",
      width: "100",
      content: (
        <div>
          <br />
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            rowKey={(record) => record}
            columns={columns}
            dataSource={filterOrdersByStatus(4)}
            pagination={{ pageSize: 5 }}
            title={() => (
              <div className="left-side-container">
                <Button
                  className="prompt-semibold"
                  onClick={() => refreshData()}
                >
                  รีเฟรช
                </Button>
              </div>
            )}
            footer={() => (
              <>
                <div className="summary-price mb-05">
                  <h4>ทั้งหมด</h4>
                  <h4>{countOrdersByStatus(4)} รายการ</h4>
                </div>
              </>
            )}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="menuinfo-infotable">
        <div className="text-container">
          <h4 className="prompt-bold">พนักงานประจำโต๊ะ</h4>
          <p className="prompt-regular">
            {item && item?.table_employee[0]?.user_fullname}
          </p>
        </div>
        <div className="text-container">
          <h4 className="prompt-bold">จำนวนลูกค้า</h4>
          <p className="prompt-regular">
            {item && item?.table_customer_amount}
          </p>
        </div>
        <div>
          <div className="action-drop-btn">
            <Button
              onClick={() => showModal("QRCode Content")}
              icon={<QrcodeOutlined />}
            >
              แสดง QR code
            </Button>
            <Button
              icon={<PlusOutlined />}
              onClick={() =>
                window.open(
                  `${import.meta.env.VITE_API_CUSTOMER_URL}/order?id=${
                    item.table_id
                  }&language=th`
                )
              }
            >
              เพิ่มรายการอาหาร
            </Button>
            <Button
              onClick={() => closeTable(item._id)}
              icon={<CloseOutlined />}
            >
              ยกเลิกโต๊ะ
            </Button>
          </div>
          <Modal
            title="QR CODE (ใช้สำหรับสแกนเข้าเว็บสั่งอาหาร)"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            className="prompt-regular"
          >
            <div className="qrcode-container ">
              <QRCode
                errorLevel="H"
                value={`${import.meta.env.VITE_API_CUSTOMER_URL}/order?id=${
                  item.table_id
                }&language=th`}
                icon={AppLogo}
                size={400}
                iconSize={250 / 4}
              />
            </div>
          </Modal>
        </div>
        <Divider />
        <div>
          <Steps
            current={current}
            onChange={onChange}
            items={steps}
            className="prompt-bold"
          />
          <div className="prompt-regular">{steps[current].content}</div>
        </div>
      </div>
    </>
  );
};

export default OpenTableInfo;
