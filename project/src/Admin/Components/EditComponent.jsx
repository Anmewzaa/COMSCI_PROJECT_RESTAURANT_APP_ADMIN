// React Router Dom
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const EditComponent = ({ id }) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="btn btn-yellow cursor sarabun-semibold"
        onClick={() => navigate(`edit/${id}`)}
      >
        แก้ไข
      </button>
    </>
  );
};

export default EditComponent;
