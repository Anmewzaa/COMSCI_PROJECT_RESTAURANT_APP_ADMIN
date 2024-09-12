// React Router Dom
import { useNavigate } from "react-router-dom";
// Antd
import { Button } from "antd";

// eslint-disable-next-line react/prop-types
const EditComponent = ({ id }) => {
  const navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate(`edit/${id}`)} className="">
        แก้ไข
      </Button>
    </>
  );
};

export default EditComponent;
