// React
import { useContext } from "react";
// Context
import { UserContext } from "../Pages/AdminLayout";
// CSS
import "../CSS/HeaderComponent.css";
// React router dom
import { useLocation, useNavigate } from "react-router-dom";
// Antd
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Popover, Button } from "antd";

const text = (
  <span>{`เว็บไซต์เวอร์ชั่น ${import.meta.env.VITE_API_WEBSITE_VERSION}`}</span>
);

const HeaderComponent = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const location = useLocation();

  const renderHeader = () => {
    if (!location) {
      return "loading...";
    }
    if (location.pathname.includes("/table/create")) {
      return "หน้าเพิ่มโต๊ะ";
    } else if (location.pathname.includes("/table/edit")) {
      return "หน้าแก้ไขโต๊ะ";
    } else if (location.pathname.includes("/table")) {
      return "หน้าจัดการโต๊ะ";
    } else if (location.pathname.includes("/kitchen")) {
      return "หน้าจัดการครัว";
    } else if (location.pathname.includes("/zone")) {
      return "หน้าจัดการโซน";
    } else if (location.pathname.includes("/history")) {
      return "หน้าจัดการประวัติโต๊ะ";
    } else if (location.pathname.includes("/menu/categories/create")) {
      return "หน้าเพิ่มหมวดหมู่อาหาร";
    } else if (location.pathname.includes("/menu/categories/edit")) {
      return "หน้าแก้ไขหมวดหมู่อาหาร";
    } else if (location.pathname.includes("/menu/categories")) {
      return "หน้าจัดการหมวดหมู่อาหาร";
    } else if (location.pathname.includes("/menu/option/create")) {
      return "หน้าเพิ่มส่วนเสริมอาหาร";
    } else if (location.pathname.includes("/menu/option/edit")) {
      return "หน้าแก้ไขส่วนเสริมอาหาร";
    } else if (location.pathname.includes("/menu/option")) {
      return "หน้าจัดการส่วนเสริมอาหาร";
    } else if (location.pathname.includes("/menu/create")) {
      return "หน้าเพิ่มรายการอาหาร";
    } else if (location.pathname.includes("/menu/edit")) {
      return "หน้าแก้ไขรายการอาหาร";
    } else if (location.pathname.includes("/menu")) {
      return "หน้าจัดการรายการอาหาร";
    } else if (location.pathname.includes("/employee")) {
      return "หน้าจัดการบัญชีพนักงาน";
    } else {
      return "หน้าแดชบอร์ด";
    }
  };

  return (
    <>
      <div className="header-box ">
        <h3 className="prompt-semibold-italic">{renderHeader()}</h3>
        <div className="profile">
          <div className="text-container">
            <p className="welcome-text prompt-bold">ยินดีต้อนรับ</p>
            <p className="name-text inter-black">{user.user_fullname}</p>
          </div>
          <Popover
            placement="bottomRight"
            title={text}
            content={
              <div>
                <Button
                  block
                  onClick={() => {
                    localStorage.removeItem("PARADISE_LOGIN_TOKEN");
                    navigate("/login");
                  }}
                >
                  ออกจากระบบ
                </Button>
              </div>
            }
          >
            <Avatar size={48} icon={<UserOutlined />} className="cursor" />
          </Popover>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
