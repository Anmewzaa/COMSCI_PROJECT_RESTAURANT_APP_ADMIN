// React Hook
import { useState, useEffect } from "react";
// Axios
import axios from "axios";

const KitchenPage = () => {
  const [data, setData] = useState([]);
  const fetchAPI = async () => {
    await axios.get(`${import.meta.env.VITE_API_URL}/menu/get`).then((data) => {
      setData(data.data.response);
    });
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <>
      <div>{JSON.stringify(data)}</div>
    </>
  );
};

export default KitchenPage;
