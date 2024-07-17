// React Hook
import { createContext, useState, useEffect } from "react";
// Components
import CategoriesComponent from "../../Components/CategoriesComponent";
import CardComponent from "../../Components/CardComponent";
import MenuFooter from "../../Components/MenuFooter";
// Context
export const SearchContext = createContext(null);
// Axios
import axios from "axios";
// CSS
import "../../CSS/MenuPage.css";

const MenuPage = () => {
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState();
  const fetchAPI = async () => {
    setLoading(true);
    await axios.get(`${import.meta.env.VITE_API_URL}/menu/get`).then((data) => {
      setMenu(data.data.response);
    });
    setLoading(false);
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      <CategoriesComponent />
      {loading ? (
        <>Loading...</>
      ) : (
        <div className="card-box">
          {menu &&
            menu.map((item) => {
              return <CardComponent key={item.menu_id} menu={item} />;
            })}
        </div>
      )}
      <MenuFooter />
    </SearchContext.Provider>
  );
};

export default MenuPage;
