// JWT
const JWT_TOKEN = localStorage.getItem("PARADISE_LOGIN_TOKEN");
// Axios
import axios from "axios";

export const openTable = async (id, table_employee, table_customer_amount) => {
  await axios
    .put(
      `${import.meta.env.VITE_API_URL}/table/open/${id}`,
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
    .then((result) => {
      return alert(result);
    })
    .catch((err) => {
      return alert(err);
    });
};
