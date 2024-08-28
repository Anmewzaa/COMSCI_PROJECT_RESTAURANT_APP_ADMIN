// React Router Dom
import { Link } from "react-router-dom";
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
// Icon
import {
  AiOutlineHome,
  AiOutlineAppstore,
  AiOutlineMenu,
  AiOutlineTeam,
  AiOutlineLinux,
  AiOutlineLeft,
} from "react-icons/ai";

const navItem = [
  {
    number: 1,
    name: "หน้าหลัก",
    link: "",
    access_role: "",
    icon: <AiOutlineHome />,
  },
  {
    number: 2,
    name: "จัดการโต๊ะ",
    link: "table",
    access_role: "",
    icon: <AiOutlineAppstore />,
  },
  {
    number: 3,
    name: "จัดการครัว",
    link: "kitchen",
    access_role: "",
    icon: <AiOutlineMenu />,
  },
  {
    number: 4,
    name: "รายการอาหาร",
    link: "menu",
    access_role: "",
    icon: <AiOutlineLinux />,
  },
  {
    number: 5,
    name: "จัดการบัญชีพนักงาน",
    link: "employee",
    access_role: "Admin",
    icon: <AiOutlineTeam />,
  },
];

const NavBarComponent = () => {
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
      <div className="navigation-flex">
        <div className="logo-container">
          <img src={AppLogo} alt="website-logo" className="image cursor" />
          <h2 className="sarabun-extrabold cursor">Paradise Steak House</h2>
        </div>
        <ul className={`navigation-item ${open && "close"} cursor`}>
          {navItem.map((item) => {
            if (
              item.access_role === "" ||
              item.access_role === user.user_access_rights
            )
              return (
                <li
                  key={item.number}
                  className={`sarabun-medium`}
                  onClick={() => setOpen(true)}
                >
                  <div className="svg-icon">{item.icon}</div>
                  <Link to={item.link} className={`font-white`}>
                    {item.name}
                  </Link>
                </li>
              );
          })}
        </ul>
      </div>
      <div className="exit-btn cursor">
        <AiOutlineLeft className="svg-icon" />
        <button
          className="logout-btn sarabun-medium cursor"
          onClick={() => logout()}
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
};

export default NavBarComponent;
