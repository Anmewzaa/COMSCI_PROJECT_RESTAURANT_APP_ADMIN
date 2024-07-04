import { Link } from "react-router-dom";

const NavBarComponent = () => {
  return (
    <div className="navigation-box">
      <h3>Paradise Steak House</h3>
      <ul>
        <li>
          <Link to={"/admin"}>หน้าหลัก</Link>
        </li>
        <li>
          <Link to={"/admin/table"}>จัดการโต๊ะ</Link>
        </li>
        <li>
          <Link to={"/admin/kitchen"}>จัดการครัว</Link>
        </li>
        <li>
          <Link to={"/admin/menu"}>รายการอาหาร</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBarComponent;
