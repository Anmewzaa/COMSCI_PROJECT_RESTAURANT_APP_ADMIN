// React Hook
import { useState, useEffect } from "react";
// Axios
import axios from "axios";

const KitchenPage = () => {
  const [newOrders, setNewOrders] = useState([]);
  const [cookingOrders, setCookingOrders] = useState([]);
  const [finishOrders, setFinishOrders] = useState([]);
  const fetchAPI = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/table/get`)
      .then((data) => {
        const item = data.data.response;

        console.log(item);
      });
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  return <>{JSON.stringify(newOrders)}</>;
};

export default KitchenPage;
