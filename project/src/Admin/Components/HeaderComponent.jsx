// React
import { useContext } from "react";
// React Router Dom
import { useLocation } from "react-router-dom";
// Context
import { UserContext } from "../Pages/AdminLayout";

const HeaderComponent = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const TitleName = () => {
    switch (location.pathname) {
      case "/admin":
        return "หน้าหลัก";
      case "/admin/table":
        return "จัดการโต๊ะ";
      case "/admin/kitchen":
        return "จัดการครัว";
      case "/admin/menu":
        return "รายการอาหาร";
      case "/admin/menu/categories":
        return "หมวดหมู่อาหาร";
      case "/admin/menu/categories/create":
        return "สร้างหมวดหมู่อาหาร";
      case "/admin/menu/option":
        return "ส่วนเสริมอาหาร";
      case "/admin/menu/option/create":
        return "สร้างส่วนเสริมอาหาร";
    }
  };

  return (
    <>
      <div className="header-box">
        <h2>{TitleName()}</h2>
        <h3>
          <span>Welcome !</span> {user.user_fullname}
        </h3>
      </div>
    </>
  );
};

export default HeaderComponent;
