/* eslint-disable react/prop-types */
import { Pie } from "@ant-design/plots";

const MenuChart = ({ value }) => {
  const processMenuData = (data) => {
    const menuCount = {};

    data.forEach((item) => {
      item.menus.forEach((menu) => {
        const menuName =
          menu.menu?.menu_name?.thai ||
          menu.menu?.menu_name?.english ||
          "เมนูที่ถูกลบ";

        if (menuCount[menuName]) {
          menuCount[menuName] += menu.amount;
        } else {
          menuCount[menuName] = menu.amount;
        }
      });
    });

    return Object.keys(menuCount).map((menuName) => ({
      type: menuName,
      value: menuCount[menuName],
    }));
  };

  const menuData = processMenuData(value);

  const config = {
    data: menuData,
    angleField: "value",
    colorField: "type",
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };

  return <Pie {...config} />;
};

export default MenuChart;
