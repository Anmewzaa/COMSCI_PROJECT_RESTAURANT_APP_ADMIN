// React Router Dom
import { Link } from "react-router-dom";
// CSS
import "../CSS/MenuFooter.css";
// React
import { useContext } from "react";
// Context
import { UserContext } from "../Pages/AdminLayout";

const MenuFooter = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <ul className="footer-box flex-end sarabun-semibold">
        {user.user_access_rights === "Admin" && (
          <>
            <li className="item ">
              <Link to={"categories"}>หมวดหมู่อาหาร</Link>
            </li>
            <li className="item">
              <Link to={"option"}>ส่วนเสริมอาหาร</Link>
            </li>
            <li className="item">
              <Link to={"create"}>สร้างรายการอาหาร</Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default MenuFooter;
