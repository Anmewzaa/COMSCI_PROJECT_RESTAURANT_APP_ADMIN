// JWT
const JWT_TOKEN = localStorage.getItem("PARADISE_LOGIN_TOKEN");
// Axios
import axios from "axios";
// SWAL
import Swal from "sweetalert2";

export const openTable = async (id, table_employee, table_customer_amount) => {
  Swal.fire({
    title: "ต้องการที่จะเปิดโต๊ะใช่หรือไม่?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .put(
          `${import.meta.env.VITE_API_URL}/authen/table/open/${id}`,
          {
            table_employee: table_employee,
            table_customer_amount: table_customer_amount,
          },
          {
            headers: {
              Authorization: `Bearer ${JWT_TOKEN}`,
            },
          }
        )
        .then(() => {
          Swal.fire({
            title: "Success !",
            text: "Your file has been deleted.",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((err) => {
          console.log(err);
          return alert(err);
        });
    }
  });
};
export const closeTable = async (id) => {
  Swal.fire({
    title: "ต้องการที่จะยกเลิกโต๊ะใช่หรือไม่?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .put(
          `${import.meta.env.VITE_API_URL}/authen/table/close/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${JWT_TOKEN}`,
            },
          }
        )
        .then(() => {
          Swal.fire({
            title: "Success !",
            text: "Your file has been deleted.",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((err) => {
          console.log(err);
          return alert(err);
        });
    }
  });
};
export const checkbill = async (id) => {
  Swal.fire({
    title: "ต้องการที่ชำระเงินใช่หรือไม่?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .put(
          `${import.meta.env.VITE_API_URL}/authen/table/checkbill/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${JWT_TOKEN}`,
            },
          }
        )
        .then(() => {
          Swal.fire({
            title: "Success !",
            text: "Your file has been deleted.",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((err) => {
          console.log(err);
          return alert(err);
        });
    }
  });
};
export const changeOrderStatus = async (id, status, menu_id) => {
  Swal.fire({
    title: "ต้องการที่จะเปลี่ยนสถานะอาหารใช่หรือไม่?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .put(
          `${import.meta.env.VITE_API_URL}/authen/table/change_status/${id}`,
          {
            order_ids: [menu_id],
            new_status: status,
          },
          {
            headers: {
              Authorization: `Bearer ${JWT_TOKEN}`,
            },
          }
        )
        .then(() => {
          Swal.fire({
            title: "Success !",
            text: "Your file has been deleted.",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((err) => {
          console.log(err);
          return alert(err);
        });
    }
  });
};
export const deleteOrder = async (id, menu_id) => {
  Swal.fire({
    title: "ต้องการที่จะลบรายการอาหารใช่หรือไม่?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .put(
          `${import.meta.env.VITE_API_URL}/table/delete/${id}`,
          {
            id: menu_id,
          },
          {
            headers: {
              Authorization: `Bearer ${JWT_TOKEN}`,
            },
          }
        )
        .then(() => {
          Swal.fire({
            title: "Success !",
            text: "Your file has been deleted.",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((err) => {
          console.log(err);
          return alert(err);
        });
    }
  });
};
