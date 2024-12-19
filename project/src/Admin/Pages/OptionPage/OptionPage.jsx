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
import { PlusOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "ชื่อภาษาไทย",
    dataIndex: "option_name",
    key: "name",
    render: (item) => <div className="prompt-medium">{`${item.thai}`}</div>,
  },
  {
    title: "ชื่อภาษาอังกฤษ",
    dataIndex: "option_name",
    key: "name",
    render: (item) => <div className="prompt-medium">{`${item.english}`}</div>,
  },
  {
    title: "ส่วนเสริม",
    key: "option",
    dataIndex: "sub_option",
    render: (items) => (
      <>
        {items.map((item, index) => {
          return (
            <div key={index} className="prompt-bold">
              <Tag>{item.sub_option_name.thai}</Tag>
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
      <div className="prompt-bold">
        <Tag>{new Date(text).toLocaleString()}</Tag>
      </div>
    ),
  },
  {
    title: "",
    key: "action",
    render: (item) => (
      <Space size="middle">
        <EditComponent id={item?.option_id} />
        <DeleteComponent
          id={item?.option_id}
          name={"option"}
          destination={"/menu/option"}
        />
      </Space>
    ),
  },
];

const OptionPage = () => {
  const [loadingStatus, setLoadingStatus] = useState(true);
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
        setLoadingStatus(false);
      });
  };
  useEffect(() => {
    fetchAPI();
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
        <Button size="large" icon={<PlusOutlined />}>
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
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content", y: "calc(50vh)" }}
        />
      </div>
    </>
  );
};

export default OptionPage;
