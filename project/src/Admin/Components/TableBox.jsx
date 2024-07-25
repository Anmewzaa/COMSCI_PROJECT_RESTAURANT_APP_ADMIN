// React Router Dom
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableBox = ({ item }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="table-box-grid-container"
        onClick={() => navigate(`${item?._id}`)}
      >
        <div
          className={`table-box cursor ${
            item?.table_status === "close" ? "table-inactive" : "table-active"
          }`}
        >
          <p>{item?.table_number}</p>
          <div>
            {item.table_zone.map((item, index) => {
              return <p key={index}>{item.zone_name}</p>;
            })}
          </div>
          <p>{item?.table_seat} ที่นั่ง</p>
        </div>
      </div>
    </>
  );
};

export default TableBox;
