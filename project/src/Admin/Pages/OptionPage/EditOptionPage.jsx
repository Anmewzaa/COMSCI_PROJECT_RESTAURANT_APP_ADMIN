// Axios
import axios from "axios";
// React Hook
import { useState, useEffect } from "react";
// React Router Dom
import { useParams } from "react-router-dom";
// SWAL
import Swal from "sweetalert2";
// Components
import BackFooter from "../../Components/BackFooter";

const EditOptionPage = () => {
  const { id } = useParams();
  const [option, setOption] = useState({
    thai: "",
    english: "",
    sub_option: [],
  });
  const [subOption, setSubOption] = useState({
    thai: "",
    english: "",
  });
  const fetchAPI = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/option/get/${id}`)
      .then((data) => {
        setInitialValue("thai", data.data.response.option_name.thai);
        setInitialValue("english", data.data.response.option_name.english);
        setInitialValue("sub_option", data.data.response.sub_option);
      });
  };
  const setInitialValue = (name, value) => {
    setOption((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };
  const inputValue = (name) => (event) => {
    setOption({ ...option, [name]: event.target.value });
  };
  const inputSubOptionValue = (name) => (event) => {
    setSubOption({ ...subOption, [name]: event.target.value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .put(
        `${import.meta.env.VITE_API_URL}/option/update/${id}`,
        {
          option_name_thai: option.thai,
          option_name_english: option.english,
          sub_option: option.sub_option,
        },
        {
          headers: {
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        }
      )
      .then((result) => {
        if (result.data.error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: result.data.error,
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "อัพเดทรายการอาหารเสร็จสมบูรณ์",
            text: "...",
          }).then(() => {
            window.location.href = "/admin/menu/option";
          });
        }
      });
  };
  const addSubOption = async () => {
    if (!(subOption.thai && subOption.english)) {
      return;
    }
    setOption((prevOption) => ({
      ...prevOption,
      sub_option: [
        ...prevOption.sub_option,
        {
          sub_option_name: {
            thai: subOption.thai,
            english: subOption.english,
          },
        },
      ],
    }));
    setSubOption({ ...subOption, ["thai"]: "", ["english"]: "" });
  };
  const deleteSubOption = async (indexToRemove) => {
    setOption((prevOption) => ({
      ...prevOption,
      sub_option: prevOption.sub_option.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <>
      <form onSubmit={submitForm} className="form">
        <div className="form-menu-container">
          <div>
            <label>ชื่อส่วนเสริมอาหารภาษาไทย</label>
            <input
              type="text"
              placeholder="ชื่อส่วนเสริมอาหารภาษาไทย"
              value={option.thai}
              onChange={inputValue("thai")}
              required
            />
          </div>
          <div>
            <label>ชื่อส่วนเสริมอาหารภาษาอังกฤษ</label>
            <input
              type="text"
              placeholder="ชื่อส่วนเสริมอาหารภาษาอังกฤษ"
              value={option.english}
              onChange={inputValue("english")}
              required
            />
          </div>
        </div>
        <div className="mb-1">
          <div className="form-menu-container">
            <div>
              <label>ชื่อส่วนเสริมอาหารย่อยภาษาไทย</label>
              <input
                type="text"
                value={subOption.thai}
                placeholder="ชื่อส่วนเสริมอาหารย่อยภาษาไทย"
                onChange={inputSubOptionValue("thai")}
              />
            </div>
            <div>
              <label>ชื่อส่วนเสริมอาหารย่อยภาษาอังกฤษ</label>
              <input
                type="text"
                value={subOption.english}
                placeholder="ชื่อส่วนเสริมอาหารย่อยภาษาอังกฤษ"
                onChange={inputSubOptionValue("english")}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => addSubOption()}
            className="btn-add-sub"
          >
            เพิ่มรายการย่อย
          </button>
          <table className="sub-box">
            <thead>
              <tr>
                <th>ชื่อรายการย่อยภาษาไทย</th>
                <th>ชื่อรายการย่อยภาษาอังกฤษ</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {option.sub_option &&
                option.sub_option.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <>{item.sub_option_name.thai}</>
                      </td>
                      <td>{item.sub_option_name.english}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => {
                            deleteSubOption(index);
                          }}
                          className="btn btn-red"
                        >
                          ลบรายการย่อย
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <button type="submit" className="btn-add-sub">
          อัพเดทเสริมอาหาร
        </button>
      </form>
      <BackFooter props={"/admin/menu/option"} />
    </>
  );
};

export default EditOptionPage;
