// React Hook
import { createContext, useState, useEffect } from "react";
// Components
import CategoriesComponent from "../Components/CategoriesComponent";
// Context
export const AppContext = createContext(null);
// Axios
import axios from "axios";

const MenuPage = () => {
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState("");

  return (
    <AppContext.Provider value={{ search, setSearch }}>
      <CategoriesComponent />
    </AppContext.Provider>
  );
};

export default MenuPage;
