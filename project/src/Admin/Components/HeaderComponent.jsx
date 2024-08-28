// React
import { useContext } from "react";
// Context
import { UserContext } from "../Pages/AdminLayout";
// CSS
import "../CSS/HeaderComponent.css";

const HeaderComponent = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="header-box sarabun-light">
        <h3>Dashboard</h3>
        <div className="text-container">
          <p className="welcome-text sarabun-light">ยินดีต้อนรับ!</p>
          <p className="name-text sarabun-semibold">{user.user_fullname}</p>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
