// Axios
import axios from "axios";
// React Hook
import { useState, useEffect } from "react";
// React Router Dom
import { Link } from "react-router-dom";
// Components
import EditComponent from "../../Components/EditComponent";
import DeleteComponent from "../../Components/DeleteComponent";

const OptionPage = () => {
  const [option, setOption] = useState([]);
  const [search, setSearch] = useState("");
  const searchFilter = option?.filter((item) => {
    if (search === "") {
      return item;
    }
    return (
      item?.option_name?.thai.toLowerCase().includes(search.toLowerCase()) ||
      item?.option_name?.english.toLowerCase().includes(search.toLowerCase())
    );
  });
  const fetchAPI = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/option/get`)
      .then((data) => {
        setOption(data.data.response);
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
          placeholder="ค้นหาส่วนเสริมอาหาร"
          className="cursor sarabun-semibold"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to={"create"} className="sarabun-semibold">
          เพิ่มส่วนเสริมอาหาร
        </Link>
      </div>
      <div className="form-table-container">
        <table>
          <thead>
            <tr className="sarabun-semibold">
              <th>#</th>
              <th>ชื่อ</th>
              <th>ส่วนเสริม</th>
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
                  <tr key={item?.option_id} className="sarabun-regular">
                    <td>{index + 1}</td>
                    <td>{`${item?.option_name?.thai} (${item?.option_name?.english})`}</td>
                    <td>
                      {item?.sub_option &&
                        item?.sub_option.map((item) => {
                          return (
                            <ul key={item?._id}>
                              <li className="test">{`${item.sub_option_name.thai} (${item.sub_option_name.english})`}</li>
                            </ul>
                          );
                        })}
                    </td>
                    <td>{formattedCreateDate}</td>
                    <td>{formattedLastUpdateDate}</td>
                    <td className="action-btn-container">
                      <EditComponent id={item?.option_id} />
                      <DeleteComponent id={item?.option_id} name={"option"} />
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

export default OptionPage;
