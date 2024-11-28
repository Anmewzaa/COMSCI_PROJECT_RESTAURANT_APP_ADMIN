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
    title: "ชื่อหมวดหมู่อาหาร",
    dataIndex: "category_name",
    key: "name",
    width: "25%",
    render: (item) => (
      <div className="prompt-medium">{`${item.thai} (${item.english})`}</div>
    ),
  },
  {
    title: "วันที่แก้ไขล่าสุด",
    key: "update_date",
    dataIndex: "updatedAt",
    width: "25%",
    render: (text) => (
      <div className="prompt-bold">
        <Tag>{new Date(text).toLocaleString()}</Tag>
      </div>
    ),
  },
  {
    title: "",
    key: "action",
    width: "25%",
    render: (item) => (
      <Space size="middle">
        <EditComponent id={item?.category_id} />
        <DeleteComponent
          id={item?.category_id}
          name={"categories"}
          destination={"/menu/categories"}
        />
      </Space>
    ),
  },
];

const CategoriesPage = () => {
  const [loadingStatus, setLoadingStatus] = useState(true);
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
      .get(`${import.meta.env.VITE_API_URL}/categories/get`)
      .then((data) => {
        setCategories(data.data.response);
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
          type="text"
          placeholder="ค้นหาหมวดหมู่อาหาร"
          className="cursor mr-1 prompt-semibold"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="large"
        />
        <Button size="large">
          <Link to={"create"} className="prompt-semibold">
            เพิ่มหมวดหมู่อาหาร
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

export default CategoriesPage;
