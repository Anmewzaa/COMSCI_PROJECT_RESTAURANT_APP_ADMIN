/* eslint-disable react/prop-types */
import { Column } from "@ant-design/plots";

const ImcomeComponents = ({ data }) => {
  const config = {
    title: "กราฟแสดงยอดขาย/รายได้",
    data: data,
    xField: "day",
    yField: "amount",
    seriesField: "type",
    colorField: "type",
    group: true,
    style: {
      inset: 1,
    },
    legend: {
      position: "top-right",
    },
    theme: "classic",
    onReady: ({ chart }) => {
      try {
        chart.on("afterrender", () => {
          chart.getController("legend").toggle("Income", true);
          chart.getController("legend").toggle("Profit", true);
        });
      } catch (e) {
        console.error(e);
      }
    },
  };
  return (
    <>
      <Column {...config} />
    </>
  );
};

export default ImcomeComponents;
