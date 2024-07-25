// Axios
import axios from "axios";
// SWAL
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
const DeleteComponent = ({ name, id }) => {
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
          .delete(`${import.meta.env.VITE_API_URL}/${name}/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${JWT_TOKEN}`,
            },
          })
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            window.location.replace(`/admin/menu/${name}`);
          });
      }
    });
  };

  return (
    <>
      <button onClick={formSubmit} className="btn btn-red cursor">
        ลบ
      </button>
    </>
  );
};

export default DeleteComponent;
