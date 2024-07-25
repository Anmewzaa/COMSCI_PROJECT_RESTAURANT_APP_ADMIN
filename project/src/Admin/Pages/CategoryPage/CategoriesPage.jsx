// Axios
import axios from "axios";
// React Hook
import { useState, useEffect } from "react";
// Components
import BackFooter from "../../Components/BackFooter";
// React Router Dom
import { Link } from "react-router-dom";
// Components
import EditComponent from "../../Components/EditComponent";
import DeleteComponent from "../../Components/DeleteComponent";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const fetchAPI = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/category/get`)
      .then((data) => {
        setCategories(data.data.response);
      });
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <>
      <div>
        <input type="text" placeholder="ค้นหาหมวดหมู่อาหาร" />
        <Link to={"create"}>เพิ่มหมวดหมู่</Link>
      </div>
      <table>
        <tr>
          <th>ชื่อ</th>
          <th>Create Date</th>
          <th>Update Date</th>
          <th>Action</th>
        </tr>
        {categories &&
          categories.map((item) => {
            const formattedCreateDate = new Date(
              item?.createdAt
            ).toLocaleString();
            const formattedLastUpdateDate = new Date(
              item?.updatedAt
            ).toLocaleString();
            return (
              <>
                <tr key={item?.category_id}>
                  <td>{`${item?.category_name?.thai} (${item?.category_name?.english})`}</td>
                  <td>{formattedCreateDate}</td>
                  <td>{formattedLastUpdateDate}</td>
                  <td>
                    <EditComponent id={item?.category_id} />
                    <DeleteComponent id={item?.category_id} name={"category"} />
                  </td>
                </tr>
              </>
            );
          })}
      </table>
      <BackFooter props={"/admin/menu"} />
    </>
  );
};

export default CategoriesPage;
