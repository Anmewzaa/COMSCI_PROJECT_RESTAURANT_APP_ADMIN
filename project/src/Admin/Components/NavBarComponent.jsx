// React Router Dom
import { Link, useLocation } from "react-router-dom";
// React
import { useContext, useState } from "react";
// Context
import { UserContext } from "../Pages/AdminLayout";
// Logo
import AppLogo from "../../images/app-logo.png";
// CSS
import "../CSS/NavBarComponent.css";
// SWAL
import Swal from "sweetalert2";

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
  const [open, setOpen] = useState(true);

  const logout = () => {
    Swal.fire({
      title: "ต้องการออกจากระบบใช่หรือไม่?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("PARADISE_LOGIN_TOKEN");
        window.location.replace("/admin/login");
      }
    });
  };

  return (
    <div className="navigation-box">
      <img src={AppLogo} alt="" className="image " />
      <h2 className="name sarabun-extrabold">Paradise Steak House</h2>
      <ul className={`navigation-item ${open && "close"}`}>
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
                onClick={() => setOpen(true)}
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
        <button onClick={() => logout()}>ออกจากระบบ</button>
      </ul>

      <button
        className="hamburger cursor"
        onClick={() => setOpen((open) => !open)}
      >
        =
      </button>
    </div>
  );
};

export default NavBarComponent;
