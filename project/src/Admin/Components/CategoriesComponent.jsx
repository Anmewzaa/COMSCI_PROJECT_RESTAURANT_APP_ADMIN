// React Hook
import { useState, useEffect, useContext } from "react";
// Axios
import axios from "axios";
// CSS
import "../CSS/CategoriesComponent.css";
// Context
import { SearchContext } from "../Pages/MenuPage/MenuPage";

const CategoriesComponent = () => {
  const { search, setSearch } = useContext(SearchContext);
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
      <ul className="container sarabun-semibold">
        <li
          onClick={() => setSearch("")}
          className={`cursor ${search === "" ? "active" : ""}`}
        >
          ทั้งหมด
        </li>
        {categories &&
          categories.map((item) => {
            return (
              <li
                key={item.category_id}
                onClick={() => {
                  setSearch(item.category_name.thai);
                }}
                className={`cursor ${
                  search === item.category_name.thai ? "active" : ""
                }`}
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
