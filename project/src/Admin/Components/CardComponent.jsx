// React Router Dom
import { Link } from "react-router-dom";
// CSS
import "../CSS/CardComponent.css";

/* eslint-disable react/prop-types */
const CardComponent = ({ menu }) => {
  return (
    <div className="card">
      <img
        src={`${import.meta.env.VITE_API_URL}/images/${menu.menu_image}`}
        alt=""
      />
      <h2>{menu.menu_name.thai}</h2>
      <p>{menu.menu_price}</p>
      <Link to={`${menu.menu_id}`}>Info</Link>
    </div>
  );
};

export default CardComponent;
