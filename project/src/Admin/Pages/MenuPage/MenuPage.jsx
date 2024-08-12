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
  const searchFilter = menu?.filter((item) => {
    if (search === "") {
      return item;
    }
    return item?.menu_category_id[0]?.category_name?.thai
      .toLowerCase()
      .includes(search.toLowerCase());
  });
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      <CategoriesComponent />
      <div>
        {loading ? (
          <>Loading...</>
        ) : (
          <div className="card-box">
            {menu.length === 0 ? (
              <>Empty</>
            ) : (
              <>
                {searchFilter.map((item) => {
                  return <CardComponent key={item.menu_id} menu={item} />;
                })}
              </>
            )}
          </div>
        )}
      </div>
      <MenuFooter />
    </SearchContext.Provider>
  );
};

export default MenuPage;
