// Axios
import axios from "axios";
// React Hook
import { useState, useEffect } from "react";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const fetchAPI = () => {};
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <>
      <div>
        <input type="text" placeholder="ค้นหาหมวดหมู่อาหาร" />
        <button>เพิ่มหมวดหมู่</button>
      </div>
      <table>
        <tr>
          <th>ชื่อ</th>
          <th>Create date</th>
          <th>Action</th>
        </tr>
        <tr>
          <td>1</td>
          <td>1</td>
          <td>1</td>
        </tr>
        <tr>
          <td>1</td>
          <td>1</td>
          <td>1</td>
        </tr>
      </table>
    </>
  );
};

export default CategoriesPage;
