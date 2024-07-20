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

const OptionPage = () => {
  const [option, setOption] = useState([]);
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
      <div>
        <input type="text" placeholder="ค้นหาส่วนเสริมอาหาร" />
        <Link to={"create"}>เพิ่มส่วนเสริมอาหาร</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ชื่อ</th>
            <th>ส่วนเสริม</th>
            <th>Create Date</th>
            <th>Update Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {option &&
            option.map((item) => {
              const formattedCreateDate = new Date(
                item?.createdAt
              ).toLocaleString();
              const formattedLastUpdateDate = new Date(
                item?.updatedAt
              ).toLocaleString();
              return (
                <>
                  <tr key={item?.option_id} className="table">
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
                    <td>
                      <EditComponent id={item?.option_id} />
                      <DeleteComponent id={item?.option_id} name={"option"} />
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
      <BackFooter props={"/admin/menu"} />
    </>
  );
};

export default OptionPage;
