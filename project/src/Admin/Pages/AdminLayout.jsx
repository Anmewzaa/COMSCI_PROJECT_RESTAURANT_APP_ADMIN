// React Hook
import { useEffect } from "react";
// React Router Dom
import { Outlet } from "react-router-dom";
// CSS
import "../CSS/AdminLayout.css";
// Componentes
import NavBarComponent from "../Components/NavBarComponent";
import HeaderCoponent from "../Components/HeaderComponent";

const AdminLayout = () => {
  useEffect(() => {
    if (!localStorage.getItem("PARADISE_LOGIN_TOKEN")) {
      return (window.location.href = "/admin/login");
    }
  }, []);
  return (
    <>
      <div className="admin-home-page">
        <NavBarComponent />
        <div>
          <HeaderCoponent />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
