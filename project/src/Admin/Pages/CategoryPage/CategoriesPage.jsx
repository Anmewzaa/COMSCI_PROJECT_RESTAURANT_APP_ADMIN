// Axios
import axios from "axios";
// React Hook
import { useState, useEffect } from "react";
// React Router Dom
import { Link } from "react-router-dom";
// Components
import EditComponent from "../../Components/EditComponent";
import DeleteComponent from "../../Components/DeleteComponent";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const searchFilter = categories?.filter((item) => {
    if (search === "") {
      return item;
    }
    return (
      item?.category_name?.thai.toLowerCase().includes(search.toLowerCase()) ||
      item?.category_name?.english.toLowerCase().includes(search.toLowerCase())
    );
  });
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
      <div className="form-input-container">
        <input
          type="text"
          placeholder="ค้นหาหมวดหมู่อาหาร"
          className="cursor sarabun-semibold"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to={"create"} className="sarabun-semibold">
          เพิ่มหมวดหมู่
        </Link>
      </div>
      <div className="form-table-container">
        <table>
          <thead>
            <tr className="sarabun-semibold">
              <th>#</th>
              <th>ชื่อ</th>
              <th>วันที่สร้าง</th>
              <th>วันที่อัพเดทล่าสุด</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {searchFilter &&
              searchFilter.map((item, index) => {
                const formattedCreateDate = new Date(
                  item?.createdAt
                ).toLocaleString();
                const formattedLastUpdateDate = new Date(
                  item?.updatedAt
                ).toLocaleString();
                return (
                  <tr key={item?.category_id} className="sarabun-regular">
                    <td>{index + 1}</td>
                    <td>{`${item?.category_name?.thai} (${item?.category_name?.english})`}</td>
                    <td>{formattedCreateDate}</td>
                    <td>{formattedLastUpdateDate}</td>
                    <td className="action-btn-container">
                      <EditComponent id={item?.category_id} />
                      <DeleteComponent
                        id={item?.category_id}
                        name={"category"}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CategoriesPage;
