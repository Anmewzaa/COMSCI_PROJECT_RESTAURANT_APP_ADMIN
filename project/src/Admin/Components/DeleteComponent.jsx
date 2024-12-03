// Axios
import axios from "axios";
// SWAL
import Swal from "sweetalert2";
// Antd
import { Button } from "antd";
// Antd icon
import { DeleteOutlined } from "@ant-design/icons";

// eslint-disable-next-line react/prop-types
const DeleteComponent = ({ name, id, destination }) => {
  const formSubmit = () => {
    Swal.fire({
      title: "แจ้งเตือน",
      text: "ต้องการลบใช่ไหม ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "ตกลง",
      cancelButtonColor: "#d33",
      cancelButtonText: "ยกเลิก",
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
              title: "แจ้งเตือน",
              text: `ลบสำเร็จ`,
              icon: "success",
            }).then(() => {
              window.location.replace(`${destination}`);
            });
          });
      }
    });
  };

  return (
    <>
      <Button
        onClick={formSubmit}
        className="prompt-semibold"
        icon={<DeleteOutlined />}
      >
        ลบ
      </Button>
    </>
  );
};

export default DeleteComponent;
