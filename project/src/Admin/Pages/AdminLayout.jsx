// React Hook
import { useEffect, createContext, useState } from "react";
// React Router Dom
import { Outlet } from "react-router-dom";
// JWT-decode
import { jwtDecode } from "jwt-decode";
// Context
export const UserContext = createContext(null);
// CSS
import "../CSS/AdminLayout.css";
// Componentes
import NavBarComponent from "../Components/NavBarComponent";
import HeaderCoponent from "../Components/HeaderComponent";
// AntD
import { Flex, Layout } from "antd";

const AdminLayout = () => {
  const [user, setUser] = useState([]);
  const checkJWT = () => {
    const jwt_token = localStorage.getItem("PARADISE_LOGIN_TOKEN");
    if (jwt_token) {
      const decodedToken = jwtDecode(jwt_token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp <= currentTime) {
        localStorage.removeItem("PARADISE_LOGIN_TOKEN");
      }
      setUser(jwtDecode(jwt_token));
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("PARADISE_LOGIN_TOKEN")) {
      return (window.location.href = "/login");
    } else {
      checkJWT();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      <div className="admin-home-page">
        <NavBarComponent />
        <div>
          <HeaderCoponent />
          <div className="outlet-bg">
            <Outlet />
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default AdminLayout;
