// React Router Dom
import { useNavigate } from "react-router-dom";
// CSS
import "../CSS/CardComponent.css";

/* eslint-disable react/prop-types */
const CardComponent = ({ menu }) => {
  const navigate = useNavigate();
  return (
    <div className="card" onClick={() => navigate(`${menu.menu_id}`)}>
      <img
        src={`${import.meta.env.VITE_API_URL}/images/${menu.menu_image}`}
        alt=""
      />
      <h2>{menu.menu_name.thai}</h2>
      <div className="container">
        <p>{menu.menu_price} บาท</p>
        <button>แจ้งเมนูหมด</button>
      </div>
    </div>
  );
};

export default CardComponent;
