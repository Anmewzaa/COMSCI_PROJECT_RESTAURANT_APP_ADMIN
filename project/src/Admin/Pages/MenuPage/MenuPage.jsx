// React Hook
import { createContext, useState, useEffect } from "react";
// Components
import CardComponent from "../../Components/CardComponent";
// Context
export const SearchContext = createContext(null);
// Axios
import axios from "axios";
// CSS
import "../../CSS/MenuPage.css";
// React Router Dom
import { Link } from "react-router-dom";
// Antd
import { Input, Skeleton, Button } from "antd";

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
    <>
      <SearchContext.Provider value={{ search, setSearch }}>
        <div className="form-input-container">
          <Input
            placeholder="ค้นหารายการอาหาร"
            onChange={(e) => setSearch(e.target.value)}
            className="cursor mr-1 prompt-semibold"
            size={"large"}
            value={search}
          />
          <Button size={"large"}>
            <Link to={"create"} className="prompt-semibold">
              เพิ่มรายการอาหาร
            </Link>
          </Button>
        </div>
        <div>
          {loading && loading ? (
            <div className="loading-container">
              <Skeleton />
            </div>
          ) : (
            <div className="card-box">
              {menu && menu.length === 0 ? (
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
      </SearchContext.Provider>
    </>
  );
};

export default MenuPage;
