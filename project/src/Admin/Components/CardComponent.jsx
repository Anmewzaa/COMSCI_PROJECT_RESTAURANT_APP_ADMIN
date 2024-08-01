// React Router Dom
import { useNavigate } from "react-router-dom";
// CSS
import "../CSS/CardComponent.css";

/* eslint-disable react/prop-types */
const CardComponent = ({ menu }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="card cursor relative"
        onClick={() => navigate(`${menu.menu_id}`)}
      >
        <div>
          <img
            src={`${import.meta.env.VITE_API_URL}/images/${menu.menu_image}`}
            alt=""
          />
          <h2 className="sarabun-semibold">{menu.menu_name.thai}</h2>
          <p className="sarabun-regular">{menu.menu_price} บาท</p>
        </div>
        {menu.menu_status === false && (
          <div className="card-inactive sarabun-semibold">สินค้าหมด</div>
        )}
      </div>
    </>
  );
};

export default CardComponent;
