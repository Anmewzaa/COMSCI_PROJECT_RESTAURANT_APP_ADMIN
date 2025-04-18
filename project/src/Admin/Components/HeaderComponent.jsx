// React
import { useContext } from "react";
// Context
import { UserContext } from "../Pages/AdminLayout";
// CSS
import "../CSS/HeaderComponent.css";
// React router dom
import { useLocation } from "react-router-dom";
// Antd
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Popover, Button } from "antd";

const text = (
  <span>{`เว็บไซต์เวอร์ชั่น ${import.meta.env.VITE_API_WEBSITE_VERSION}`}</span>
);

const content = (
  <div>
    <Button block>ออกจากระบบ</Button>
  </div>
);

const HeaderComponent = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  const renderHeader = () => {
    if (!location) {
      return "loading...";
    }
    if (location.pathname.includes("/table")) {
      return "หน้าจัดการโต๊ะ";
    } else if (location.pathname.includes("/kitchen")) {
      return "หน้าจัดการครัว";
    } else if (location.pathname.includes("/menu/categories")) {
      return "หน้าจัดการหมวดหมู่อาหาร";
    } else if (location.pathname.includes("/menu/option")) {
      return "หน้าจัดการส่วนเสริมอาหาร";
    } else if (location.pathname.includes("/menu")) {
      return "หน้าจัดการรายการอาหาร";
    } else if (location.pathname.includes("/employee")) {
      return "หน้าจัดการบัญชีพนักงาน";
    } else {
      return "หน้าหลัก";
    }
  };

  return (
    <>
      <div className="header-box sarabun-light">
        <h3 className="sarabun-bold">{renderHeader()}</h3>
        <div className="profile">
          <div className="text-container">
            <p className="welcome-text sarabun-light">ยินดีต้อนรับ!</p>
            <p className="name-text sarabun-semibold">{user.user_fullname}</p>
          </div>
          <Popover placement="bottomRight" title={text} content={content}>
            <Avatar
              size={48}
              icon={<UserOutlined />}
              className="cursor"
              // style={{ backgroundColor: "#fd7e14" }}
            />
          </Popover>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
