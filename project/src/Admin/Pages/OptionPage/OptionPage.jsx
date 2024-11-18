// Axios
import axios from "axios";
// React Hook
import { useState, useEffect } from "react";
// React Router Dom
import { Link } from "react-router-dom";
// Components
import EditComponent from "../../Components/EditComponent";
import DeleteComponent from "../../Components/DeleteComponent";
// Antd
import { Table, Tag, Space, Button, Input } from "antd";

const columns = [
  {
    title: "ชื่อภาษาไทย",
    dataIndex: "option_name",
    key: "name",
    render: (item) => <div className="prompt-semibold">{`${item.thai}`}</div>,
  },
  {
    title: "ชื่อภาษาอังกฤษ",
    dataIndex: "option_name",
    key: "name",
    render: (item) => (
      <div className="prompt-semibold">{`${item.english}`}</div>
    ),
  },
  {
    title: "ส่วนเสริม",
    key: "option",
    dataIndex: "sub_option",
    render: (items) => (
      <>
        {items.map((item, index) => {
          return (
            <div key={index} className="prompt-extrabold">
              <Tag color="gold">{item.sub_option_name.thai}</Tag>
            </div>
          );
        })}
      </>
    ),
  },
  {
    title: "วันที่แก้ไขล่าสุด",
    key: "update_date",
    dataIndex: "updatedAt",
    render: (text) => (
      <div className="prompt-extrabold">
        <Tag color={"geekblue"}>{new Date(text).toLocaleString()}</Tag>
      </div>
    ),
  },
  {
    title: "คำสั่ง",
    key: "action",
    render: (item) => (
      <Space size="middle">
        <EditComponent id={item?.option_id} />
        <DeleteComponent
          id={item?.option_id}
          name={"option"}
          destination={"menu/option"}
        />
      </Space>
    ),
  },
];

const OptionPage = () => {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [option, setOption] = useState([]);
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const handleResize = () => {
    setIsMobile(window.innerWidth < 900);
  };
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
        setLoadingStatus(false);
      });
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    fetchAPI();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="form-input-container">
        <Input
          size="large"
          type="text"
          placeholder="ค้นหาส่วนเสริมอาหาร"
          className="cursor mr-1 prompt-semibold"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button size="large">
          <Link to={"create"} className="prompt-semibold">
            เพิ่มส่วนเสริมอาหาร
          </Link>
        </Button>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={searchFilter}
          className="form-table-container"
          loading={loadingStatus}
          scroll={isMobile ? { x: 900 } : null}
        />
      </div>
    </>
  );
};

export default OptionPage;
