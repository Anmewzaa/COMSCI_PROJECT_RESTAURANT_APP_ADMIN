// React Hook
import { useState, useEffect } from "react";
// Axios
import axios from "axios";

const KitchenPage = () => {
  const [menu_1, setMenu_1] = useState([]);
  const fetchAPI = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/menu/get/${id}`)
      .then((data) => {
        const filteredMenu1 = data.filter((item) => item.status === 1);
        const filteredMenu2 = data.filter((item) => item.status === 2);
        const filteredMenu3 = data.filter((item) => item.status === 3);
        setMenu_1(filteredMenu1);
      });
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <>
      <div>menu 1{JSON.stringify(menu_1)}</div>
    </>
  );
};

export default KitchenPage;
