/* eslint-disable react/prop-types */
// Antd
import {
  Divider,
  Steps,
  Space,
  Table,
  Dropdown,
  Modal,
  QRCode,
  Button,
} from "antd";
// react
import { useState } from "react";
// Image
import AppLogo from "../../images/app-logo.png";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
// Functions
import {
  checkbill,
  closeTable,
  changeOrderStatus,
  deleteOrder,
} from "../functions/TableFunction";

const OpenTableInfo = ({ item }) => {
  const columns = [
    {
      title: "ชื่อ",
      dataIndex: ["menu", "menu_name", "thai"],
      key: "name",
      width: "25%",
    },
    {
      title: "ระบุ",
      dataIndex: ["option"],
      key: "price",
      width: "25%",
      render: (item) => <>{JSON.stringify(item)}</>,
    },
    {
      title: "ราคา",
      dataIndex: ["menu", "menu_price"],
      key: "price",
      width: "25%",
    },
    {
      title: "",
      key: "action",
      width: "25%",
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              changeOrderStatus(item._id, "1", record._id);
            }}
          >
            ส่งรายการ
          </Button>
          <Button
            danger
            onClick={() => {
              deleteOrder(item._id, record._id);
            }}
          >
            <DeleteOutlined />
            ลบ
          </Button>
        </Space>
      ),
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    setCurrent(value);
  };
  const filterOrdersByStatus = (status) => {
    return item.table_order.filter((order) => order.status === status);
  };
  const countOrdersByStatus = (status) => {
    return filterOrdersByStatus(status).length;
  };
  const steps = [
    {
      title: "รายการอาหารใหม่",
      description: "ขั้นตอนที่ 1",
      content: (
        <div>
          <br />
          <Table
            columns={columns}
            dataSource={filterOrdersByStatus(1)}
            pagination={{ pageSize: 5 }}
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
      title: "รายการอาหารที่กำลังทำ",
      description: "ขั้นตอนที่ 2",
      content: (
        <>
          <br />
          <Table
            columns={columns}
            dataSource={filterOrdersByStatus(2)}
            pagination={{ pageSize: 5 }}
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
      title: "รายการอาหารที่เสร็จแล้ว",
      description: "ขั้นตอนที่ 3",
      content: (
        <>
          <br />
          <Table
            columns={columns}
            dataSource={filterOrdersByStatus(3)}
            pagination={{ pageSize: 5 }}
            footer={() => (
              <>
                <div className="summary-price mb-05">
                  <h4>ทั้งหมด</h4>
                  <h4>{countOrdersByStatus(3)} รายการ</h4>
                </div>
                <div className="summary-price">
                  <h4>ราคารวม</h4>
                  <h4>0 บาท</h4>
                </div>
              </>
            )}
          />
          <br />
          <Button block onClick={() => checkbill(item._id)}>
            <ShoppingCartOutlined />
            ชำระเงิน
          </Button>
        </>
      ),
    },
  ];
  return (
    <>
      <div className="menuinfo-infotable">
        <div className="text-container">
          <h4>พนักงานประจำโต๊ะ</h4>
          <p>{item && item?.table_employee[0]?.user_fullname}</p>
        </div>
        <div className="text-container">
          <h4>จำนวนลูกค้า</h4>
          <p>{item && item?.table_customer_amount}</p>
        </div>
        <div>
          <Dropdown.Button
            className="action-drop-btn"
            menu={{
              items: [
                {
                  key: "1",
                  label: "แสดง QRCode",
                  onClick: () => showModal("QRCode Content"),
                },
                {
                  key: "2",
                  label: "เพิ่มรายการอาหาร",
                },
                {
                  key: "3",
                  label: "ยกเลิกโต๊ะ",
                  onClick: () => closeTable(item._id),
                },
              ],
            }}
          >
            คำสั่ง
          </Dropdown.Button>
          <Modal
            title="QR CODE (ใช้สำหรับสแกนเข้าเว็บสั่งอาหาร)"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div className="qrcode-container ">
              <QRCode
                errorLevel="H"
                value="https://google.com/"
                icon={AppLogo}
                size={250}
                iconSize={250 / 4}
              />
            </div>
          </Modal>
        </div>
        <Divider />
        <div>
          <Steps current={current} onChange={onChange} items={steps} />
          {steps[current].content}
        </div>
      </div>
    </>
  );
};

export default OpenTableInfo;
