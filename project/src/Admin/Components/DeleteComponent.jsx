// Axios
import axios from "axios";
// SWAL
import Swal from "sweetalert2";
// Antd
import { Button } from "antd";

// eslint-disable-next-line react/prop-types
const DeleteComponent = ({ name, id, destination }) => {
  const formSubmit = () => {
    Swal.fire({
      title: "ต้องการลบใช่ไหม?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const JWT_TOKEN = localStorage.getItem("PARADISE_LOGIN_TOKEN");
        axios
          .delete(
            `${import.meta.env.VITE_API_URL}/authen/${name}/delete/${id}`,
            {
              headers: {
                Authorization: `Bearer ${JWT_TOKEN}`,
              },
            }
          )
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            window.location.replace(`${destination}`);
          });
      }
    });
  };

  return (
    <>
      <Button onClick={formSubmit} className="">
        ลบ
      </Button>
    </>
  );
};

export default DeleteComponent;
