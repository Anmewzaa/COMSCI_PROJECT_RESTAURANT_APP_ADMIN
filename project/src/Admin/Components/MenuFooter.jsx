// React Router Dom
import { Link } from "react-router-dom";

const MenuFooter = () => {
  return (
    <>
      <ul className="footer-box">
        <li className="item">
          <Link to={"categories"}>หมวดหมู่อาหาร</Link>
        </li>
        <li className="item">
          <Link to={"option"}>ส่วนเสริมอาหาร</Link>
        </li>
        <li className="item">
          <Link to={""}>สร้างรายการอาหาร</Link>
        </li>
      </ul>
    </>
  );
};

export default MenuFooter;
