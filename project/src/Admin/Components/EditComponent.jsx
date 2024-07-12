// React Router Dom
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const EditComponent = ({ id }) => {
  return (
    <>
      <button>
        <Link to={`edit/${id}`}>แก้ไข</Link>
      </button>
    </>
  );
};

export default EditComponent;
