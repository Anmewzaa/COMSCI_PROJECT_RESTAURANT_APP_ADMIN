/* eslint-disable react/prop-types */
import { Column } from "@ant-design/plots";
// Dayjs
import dayjs from "dayjs";

const IncomeProfit = ({ value, selectdate }) => {
  const dateFromData = dayjs(selectdate);
  const startOfMonth = dateFromData.startOf("month");
  const endOfMonth = startOfMonth.endOf("month");

  const allDatesInMonth = [];
  for (
    let day = startOfMonth;
    day.isBefore(endOfMonth, "day");
    day = day.add(1, "day")
  ) {
    allDatesInMonth.push(day.format("YYYY-MM-DD"));
  }

  const formattedData = allDatesInMonth.flatMap((date) => {
    const dataForDate = value.find(
      (item) => dayjs(item.date).format("YYYY-MM-DD") === date
    );
    return [
      {
        date,
        amount: dataForDate ? dataForDate.income : 0,
        type: "รายได้",
      },
      {
        date,
        amount: dataForDate ? dataForDate.profit : 0,
        type: "กำไร",
      },
    ];
  });

  const config = {
    title: "รายได้ / กำไร",
    data: formattedData,
    xField: "date",
    yField: "amount",
    seriesField: "type",
    colorField: "type",
    group: true,
    style: {
      inset: 5,
    },
    legend: {
      position: "top-right",
    },
    onReady: ({ chart }) => {
      try {
        chart.on("afterrender", () => {
          chart.getController("legend").toggle("รายได้", true);
          chart.getController("legend").toggle("กำไร", true);
        });
      } catch (e) {
        console.error(e);
      }
    },
    slider: {
      x: {
        values: [0.1, 0.6],
      },
    },
  };
  return <Column {...config} />;
};

export default IncomeProfit;
