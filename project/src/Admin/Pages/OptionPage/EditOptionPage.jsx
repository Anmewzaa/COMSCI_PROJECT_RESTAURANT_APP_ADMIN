// Axios
import axios from "axios";
// React Hook
import { useState, useEffect } from "react";
// React Router Dom
import { useParams } from "react-router-dom";
// SWAL
import Swal from "sweetalert2";

const EditOptionPage = () => {
  const { id } = useParams();
  const [options, setOptions] = useState({
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
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };
  const addSubOption = async () => {
    if (!(subOption.thai && subOption.english)) {
      return;
    }
    setOptions((prevOption) => ({
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
  const inputValue = (name) => (event) => {
    setOptions({ ...options, [name]: event.target.value });
  };
  const inputSubOptionValue = (name) => (event) => {
    setSubOption({ ...subOption, [name]: event.target.value });
  };
  const deleteSubOption = async (indexToRemove) => {
    setOptions((prevOption) => ({
      ...prevOption,
      sub_option: prevOption.sub_option.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  const submitForm = async (e) => {
    e.preventDefault();
    if (!(options.thai && options.english)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "กรุณากรอกให้ครบถ้วน",
      });
    }
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .put(
        `${import.meta.env.VITE_API_URL}/option/update/${id}`,
        {
          option_name_thai: options.thai,
          option_name_english: options.english,
          sub_option: options.sub_option,
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
  return (
    <>
      <form onSubmit={submitForm}>
        <input type="text" value={options.thai} onChange={inputValue("thai")} />
        <input
          type="text"
          value={options.english}
          onChange={inputValue("english")}
        />
        <div>
          <input
            type="text"
            value={subOption.thai}
            placeholder="sub option thai"
            onChange={inputSubOptionValue("thai")}
          />
          <input
            type="text"
            value={subOption.english}
            placeholder="sub option english"
            onChange={inputSubOptionValue("english")}
          />
          <button type="button" onClick={() => addSubOption()}>
            Add
          </button>
        </div>
        {options.sub_option ? (
          <>
            {options.sub_option.map((item, index) => {
              return (
                <div key={index}>
                  {`${item.sub_option_name.thai} (${item.sub_option_name.english})`}
                  <button
                    type="button"
                    onClick={() => {
                      deleteSubOption(index);
                    }}
                  >
                    x
                  </button>
                </div>
              );
            })}
          </>
        ) : (
          <>Empty Sub Option</>
        )}
        <button type="submit">อัพเดทส่วนเสริมอาหาร</button>
      </form>
      {JSON.stringify(options)}
    </>
  );
};

export default EditOptionPage;
