// React Hook
import { useState, useEffect } from "react";
// React Router Dom
import { useParams } from "react-router-dom";
// axios
import axios from "axios";
// Components
import BackFooter from "../../Components/BackFooter";

const MenuInfo = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState();
  const fetchAPI = async () => {
    setLoading(true);
    await axios
      .get(`${import.meta.env.VITE_API_URL}/menu/get/${id}`)
      .then((data) => {
        setMenu(data.data.response);
      });
    setLoading(false);
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          {menu ? (
            <>
              <img
                src={`${import.meta.env.VITE_API_URL}/images/${
                  menu.menu_image
                }`}
                alt=""
              />
              {menu?.menu_name?.thai}
            </>
          ) : (
            <>Empty</>
          )}
        </>
      )}
      <BackFooter props={"/admin/menu"} />
    </>
  );
};

export default MenuInfo;
