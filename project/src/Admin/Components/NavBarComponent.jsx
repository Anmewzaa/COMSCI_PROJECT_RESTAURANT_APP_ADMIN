// React Router Dom
import { Link, useLocation } from "react-router-dom";
// React
import { useContext } from "react";
// Context
import { UserContext } from "../Pages/AdminLayout";
// Logo
import AppLogo from "../../images/app-logo.png";

const navItem = [
  {
    number: 1,
    name: "หน้าหลัก",
    link: "",
    access_role: "",
  },
  {
    number: 2,
    name: "จัดการโต๊ะ",
    link: "table",
    access_role: "",
  },
  {
    number: 3,
    name: "จัดการครัว",
    link: "kitchen",
    access_role: "",
  },
  {
    number: 4,
    name: "รายการอาหาร",
    link: "menu",
    access_role: "",
  },
  {
    number: 5,
    name: "จัดการบัญชีพนักงาน",
    link: "employee",
    access_role: "Admin",
  },
];

const NavBarComponent = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);

  return (
    <div className="navigation-box">
      <img src={AppLogo} alt="" className="image " />
      <h2 className="name sarabun-extrabold">Paradise Steak House</h2>
      <ul>
        {navItem.map((item) => {
          if (
            item.access_role === "" ||
            item.access_role === user.user_access_rights
          )
            return (
              <li
                key={item.number}
                className={`${
                  location.pathname ===
                  `/admin${item.link !== "" ? `/${item.link}` : ""}`
                    ? "active"
                    : ""
                } sarabun-semibold`}
              >
                <Link
                  to={item.link}
                  className={
                    location.pathname ===
                    `/admin${item.link !== "" ? `/${item.link}` : ""}`
                      ? "font-white"
                      : ""
                  }
                >
                  {item.name}
                </Link>
              </li>
            );
        })}
      </ul>
    </div>
  );
};

export default NavBarComponent;
