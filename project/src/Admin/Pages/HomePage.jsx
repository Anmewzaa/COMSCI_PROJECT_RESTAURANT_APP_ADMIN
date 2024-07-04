// React Hook
import { useEffect } from "react";
// React Router Dom
import { Outlet } from "react-router-dom";
// CSS
import "../CSS/HomePage.css";
// Componentes
import NavBarComponent from "../Components/NavBarComponent";

const HomePage = () => {
  useEffect(() => {
    if (!localStorage.getItem("PARADISE_LOGIN_TOKEN")) {
      return (window.location.href = "/admin/login");
    }
  }, []);
  return (
    <>
      <div className="admin-home-page">
        <NavBarComponent />
        <Outlet />
      </div>
    </>
  );
};

export default HomePage;
