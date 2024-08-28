import CanvasJSReact from "@canvasjs/react-charts";

const HomePage = () => {
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const options = {
    title: {
      text: "Basic Column Chart in React",
    },
    data: [
      {
        type: "column",
        dataPoints: [
          { label: "Apple", y: 10 },
          { label: "Orange", y: 15 },
          { label: "Banana", y: 25 },
          { label: "Mango", y: 30 },
          { label: "Grape", y: 28 },
        ],
      },
    ],
  };

  return <div>{/* <CanvasJSChart options={options} /> */}</div>;
};

export default HomePage;
