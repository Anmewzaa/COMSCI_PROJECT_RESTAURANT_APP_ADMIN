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
    title: "ชื่อ",
    dataIndex: "category_name",
    key: "name",
    render: (item) => <>{`${item.thai} (${item.english})`}</>,
  },
  {
    title: "วันที่สร้าง",
    key: "create_date",
    dataIndex: "createdAt",
    render: (text) => (
      <>
        <Tag color={"green"}>{new Date(text).toLocaleString()}</Tag>
      </>
    ),
  },
  {
    title: "วันที่แก้ไขล่าสุด",
    key: "update_date",
    dataIndex: "updatedAt",
    render: (text) => (
      <>
        <Tag color={"geekblue"}>{new Date(text).toLocaleString()}</Tag>
      </>
    ),
  },
  {
    title: "",
    key: "action",
    render: (item) => (
      <Space size="middle">
        <EditComponent id={item?.category_id} />
        <DeleteComponent id={item?.category_id} name={"category"} />
      </Space>
    ),
  },
];

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
        <Input
          type="text"
          placeholder="ค้นหาพนักงาน"
          className="cursor sarabun-semibold mr-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button>
          <Link to={"create"} className="sarabun-semibold">
            เพิ่มพนักงาน
          </Link>
        </Button>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={searchFilter}
          className="form-table-container"
          loading={false}
        />
      </div>
    </>
  );
};

export default CategoriesPage;
