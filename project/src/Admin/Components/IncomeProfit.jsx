/* eslint-disable react/prop-types */
import { Line } from "@ant-design/plots";
// Dayjs
import dayjs from "dayjs";

const IncomeProfit = ({ value }) => {
  const rawData = [
    {
      _id: "674f5c82a91073aa18a777b4",
      static_date: "2024-12-03T17:00:00.000Z",
      static_info: [
        { visits: 1, income: 1, profit: 1 },
        { visits: 1, income: 1, profit: 2 },
        { visits: 4, income: 1000, profit: 400 },
      ],
    },
    {
      _id: "674f625c836799482ccf610d",
      static_date: "2024-12-02T17:00:00.000Z",
      static_info: [{ visits: 0, income: 0, profit: 0 }],
    },
    // ข้อมูลอื่น ๆ
  ];

  // แปลงข้อมูล
  const transformedData = rawData.flatMap((entry) =>
    entry.static_info.map((info) => ({
      date: new Date(entry.static_date).toISOString().split("T")[0],
      income: info.income,
    }))
  );

  const config = {
    data: transformedData,
    xField: "date",
    yField: "income",
    smooth: true,
    point: {
      size: 5,
      shape: "circle",
    },
  };
  return <Line {...config} />;
};

export default IncomeProfit;
