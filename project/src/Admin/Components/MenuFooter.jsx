// React Router Dom
import { Link } from "react-router-dom";
// CSS
import "../CSS/MenuFooter.css";

const MenuFooter = () => {
  return (
    <>
      <ul className="footer-box flex-end sarabun-semibold">
        <li className="item ">
          <Link to={"categories"}>หมวดหมู่อาหาร</Link>
        </li>
        <li className="item">
          <Link to={"option"}>ส่วนเสริมอาหาร</Link>
        </li>
        <li className="item">
          <Link to={"create"}>สร้างรายการอาหาร</Link>
        </li>
      </ul>
    </>
  );
};

export default MenuFooter;
