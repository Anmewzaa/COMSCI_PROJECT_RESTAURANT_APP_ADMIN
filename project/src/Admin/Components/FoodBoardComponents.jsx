/* eslint-disable react/prop-types */
import { Pie } from "@ant-design/plots";

const FoodBoardComponents = ({ data }) => {
  const config = {
    title: "กราฟแสดงรายการสินค้ายอดนิยม",
    data: data,
    angleField: "value",
    colorField: "type",
    label: {
      text: "type",
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
    height: 300,
  };
  return <Pie {...config} />;
};

export default FoodBoardComponents;
