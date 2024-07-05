// React Hook
import { useState, useEffect, useContext } from "react";
// Axios
import axios from "axios";
// CSS
import "../CSS/CategoriesComponent.css";
// Context
import { AppContext } from "../Pages/MenuPage";

const CategoriesComponent = () => {
  const { setSearch } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const fetchAPI = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/category/get`).then((data) => {
      setCategories(data.data.response);
    });
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <ul className="container">
        <li onClick={() => setSearch("")} className="cursor">
          ทั้งหมด
        </li>
        {categories.map((item) => {
          return (
            <li
              key={item.category_id}
              onClick={() => {
                setSearch(item.category_name.thai);
              }}
              className="cursor"
            >
              {item.category_name.thai}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CategoriesComponent;
