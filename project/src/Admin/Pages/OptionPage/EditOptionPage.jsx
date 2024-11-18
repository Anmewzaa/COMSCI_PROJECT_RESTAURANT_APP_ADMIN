// Axios
import axios from "axios";
// React Hook
import { useState, useEffect } from "react";
// React Router Dom
import { useParams } from "react-router-dom";
// SWAL
import Swal from "sweetalert2";
// Antd
import { Input, Button, Table, Modal, Spin } from "antd";

const EditOptionPage = () => {
  const [spinning, setSpinning] = useState(true);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const [option, setOption] = useState({
    thai: "",
    english: "",
    sub_option: [],
  });
  const [subOption, setSubOption] = useState({
    thai: "",
    english: "",
  });
  const columns = [
    {
      title: "ชื่อรายการย่อยภาษาไทย",
      dataIndex: ["sub_option_name", "thai"],
      key: "option_name_thai",
      render: (item) => <div className="prompt-medium">{item}</div>,
    },
    {
      title: "ชื่อรายการย่อยภาษาไทย",
      dataIndex: ["sub_option_name", "english"],
      key: "option_name_english",
      render: (item) => <div className="prompt-medium">{item}</div>,
    },
    {
      title: "คำสั่ง",
      dataIndex: "",
      render: (_, __, index) => (
        <Button
          className="prompt-semibold"
          onClick={() => {
            deleteSubOption(index);
          }}
        >
          ลบรายการย่อย
        </Button>
      ),
    },
  ];
  const fetchAPI = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/option/get/${id}`)
      .then((data) => {
        setInitialValue("thai", data.data.response.option_name.thai);
        setInitialValue("english", data.data.response.option_name.english);
        setInitialValue("sub_option", data.data.response.sub_option);
        setSpinning(false);
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
    console.log(id);
    e.preventDefault();
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .put(
        `${import.meta.env.VITE_API_URL}/authen/option/update/${id}`,
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
            window.location.href = "/menu/option";
          });
        }
      })
      .catch((err) => {
        console.log(err);
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
    setOpen(false);
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
      <Spin fullscreen spinning={spinning} />
      <form onSubmit={submitForm} className="form">
        <div className="form-menu-container">
          <div>
            <label className="prompt-semibold">ชื่อส่วนเสริมอาหารภาษาไทย</label>
            <Input
              value={option.thai}
              placeholder="ชื่อส่วนเสริมอาหารภาษาไทย"
              onChange={inputValue("thai")}
              className="prompt-regular"
              size={"large"}
              required
            />
          </div>
          <div>
            <label className="prompt-semibold">
              ชื่อส่วนเสริมอาหารภาษาอังกฤษ
            </label>
            <Input
              value={option.english}
              placeholder="ชื่อส่วนเสริมอาหารภาษาอังกฤษ"
              onChange={inputValue("english")}
              className="prompt-regular"
              size={"large"}
              required
            />
          </div>
        </div>
        <div className="mb-1">
          <Table
            columns={columns}
            dataSource={option.sub_option}
            bordered
            pagination={{ pageSize: 3 }}
            title={() => (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={showModal} className="prompt-semibold">
                  เพิ่มรายการย่อย
                </Button>
              </div>
            )}
            rowKey={(record, index) => index}
          />
          <Modal
            open={open}
            title="เพิ่มรายการอาหารย่อย"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={(_, { OkBtn }) => (
              <>
                <Button
                  block
                  onClick={() => addSubOption()}
                  className="prompt-semibold"
                >
                  เพิ่มรายการย่อย
                </Button>
              </>
            )}
          >
            <>
              <div className="mb-1">
                <label className="prompt-semibold">รายการย่อยภาษาไทย</label>
                <Input
                  placeholder="รายการย่อยภาษาไทย"
                  block
                  value={subOption.thai}
                  onChange={inputSubOptionValue("thai")}
                  className="prompt-regular"
                ></Input>
              </div>
              <div className="mb-1">
                <label className="prompt-semibold">รายการย่อยภาษาอังกฤษ</label>
                <Input
                  placeholder="รายการย่อยภาษาอังกฤษ"
                  block
                  value={subOption.english}
                  onChange={inputSubOptionValue("english")}
                  className="prompt-regular"
                ></Input>
              </div>
            </>
          </Modal>
        </div>
        <Button
          lassName="prompt-regular"
          block
          htmlType="submit"
          size={"large"}
          style={{
            background: "linear-gradient(45deg, #00C853 0%, #00C853 100%)",
            color: "#fff",
            border: "none",
          }}
        >
          อัพเดทส่วนเสริมอาหาร
        </Button>
      </form>
    </>
  );
};

export default EditOptionPage;
