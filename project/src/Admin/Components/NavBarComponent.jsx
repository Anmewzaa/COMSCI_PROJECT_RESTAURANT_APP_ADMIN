// React
import { useState } from "react";
// React Router Dom
import { useNavigate } from "react-router-dom";
// Logo
import AppLogo from "../../images/app-logo.png";
// CSS
import "../CSS/NavBarComponent.css";
// Swal
import Swal from "sweetalert2";
// React
import { useContext } from "react";
// Context
import { UserContext } from "../Pages/AdminLayout";
// Antd
import { Button } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  UserOutlined,
  RestOutlined,
  ShopOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const navitems = [
  {
    key: "group1",
    label: "พนักงาน",
    type: "group",
    children: [
      {
        key: "home",
        label: "หน้าหลัก",
        icon: <HomeOutlined />,
        link: "/",
      },
      {
        key: "table-management",
        label: "จัดการโต๊ะ",
        icon: <AppstoreOutlined />,
        children: [
          {
            key: "table",
            label: "โต๊ะทั้งหมด",
            link: "/table",
          },
          {
            key: "table-manage",
            label: "จัดการโซน",
            link: "/zone",
          },
        ],
      },
      {
        key: "kitchen",
        label: "จัดการครัว",
        icon: <ShopOutlined />,
        children: [
          {
            key: "kitchen-manage",
            label: "จัดการครัว",
            link: "/kitchen",
          },
          {
            key: "table-history",
            label: "ประวัติครัว",
            link: "/history",
          },
        ],
      },
      {
        key: "menu",
        label: "รายการอาหาร",
        icon: <RestOutlined />,
        link: "/menu",
        children: [
          {
            key: "manage-food",
            label: "จัดการรายการอาหาร",
            link: "/menu",
          },
          {
            key: "manage-category",
            label: "จัดการหมวดหมู่อาหาร",
            link: "/menu/categories",
            access_role: "Admin",
          },
          {
            key: "manage-addons",
            label: "จัดการส่วนเสริมอาหาร",
            link: "/menu/option",
            access_role: "Admin",
          },
        ],
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "group2",
    label: "ผู้จัดการ",
    type: "group",
    children: [
      {
        key: "manage-staff",
        label: "จัดการบัญชีพนักงาน",
        icon: <UserOutlined />,
        link: "/employee",
      },
    ],
  },
];

const NavBarComponent = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    setOpen(false);
    const findLink = (items) => {
      for (const item of items) {
        if (item.key === e.key) {
          if (
            item.access_role &&
            item.access_role !== user.user_access_rights
          ) {
            Swal.fire({
              title: "Access Denied",
              text: "You do not have permission to access this page.",
              icon: "error",
              confirmButtonColor: "#3085d6",
            });
            return null;
          }
          return item.link;
        }
        if (item.children) {
          const childLink = findLink(item.children);
          if (childLink) return childLink;
        }
      }
      return null;
    };

    const link = findLink(navitems);
    if (link) {
      navigate(link);
    }
  };

  const filterNavItems = (items) => {
    return items
      .filter((item) => {
        return (
          !item.access_role || item.access_role === user.user_access_rights
        );
      })
      .map((item) => {
        if (item.children) {
          return {
            ...item,
            children: filterNavItems(item.children),
          };
        }
        return item;
      });
  };

  const filteredNavItems = filterNavItems(navitems);

  return (
    <div className="navigation-box">
      <div>
        <div className="logo-container">
          <img src={AppLogo} alt="website-logo" className="image cursor" />
          <h2 className="cursor inter-extrabold">Paradise Steak House</h2>
          <Button className="open-mobile" onClick={() => setOpen(!open)}>
            {open ? (
              <>
                <CloseOutlined />
              </>
            ) : (
              <>
                <MenuOutlined />
              </>
            )}
          </Button>
        </div>
        <div className={`nav-menu ${open && "nav-active"} prompt-semibold`}>
          <Menu
            style={{
              background: "#0000",
            }}
            onClick={handleMenuClick}
            defaultSelectedKeys={["home"]}
            defaultOpenKeys={["group1"]}
            mode="inline"
            items={filteredNavItems}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBarComponent;
