// React
import { useEffect, useState } from "react";
// JWT-decode
import { jwtDecode } from "jwt-decode";

const HeaderComponent = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const jwt_token = localStorage.getItem("PARADISE_LOGIN_TOKEN");
    setUser(jwtDecode(jwt_token));
  }, []);
  return (
    <>
      <div className="header-box">
        <h3>{user.user_fullname}</h3>
      </div>
    </>
  );
};

export default HeaderComponent;
