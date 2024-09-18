// Axios
import axios from "axios";
// React Hook
import { useState, useEffect } from "react";
// React Router Dom
import { Link } from "react-router-dom";
// Components
import EditComponent from "../../Components/EditComponent";
import DeleteComponent from "../../Components/DeleteComponent";
// SWAL
import Swal from "sweetalert2";
// Antd
import { Table, Tag, Space, Button, Input } from "antd";

const columns = [
  {
    title: "ชื่อ",
    dataIndex: "user_fullname",
    key: "name",
  },
  {
    title: "ชื่อเล่น",
    dataIndex: "user_nickname",
    key: "nickname",
  },
  {
    title: "เบอร์โทร",
    dataIndex: "user_telnum",
    key: "telnum",
  },
  {
    title: "หน้าที่",
    key: "user_role",
    dataIndex: "user_role",
    render: (text) => (
      <>
        <Tag color={`${text === "ผู้จัดการ" ? "geekblue" : "green"}`}>
          {text}
        </Tag>
      </>
    ),
  },
  {
    title: "สิทธิการเข้าถึง",
    key: "user_access_rights",
    dataIndex: "user_access_rights",
    render: (text) => (
      <>
        <Tag color={`${text === "Admin" ? "volcano" : "green"}`}>{text}</Tag>
      </>
    ),
  },
  {
    title: "",
    key: "action",
    render: (item) => (
      <Space size="middle">
        <EditComponent id={item?.user_id} />
        <DeleteComponent id={item?.user_id} name={"user"} />
      </Space>
    ),
  },
];

const EmployeePage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const searchFilter = users?.filter((item) => {
    if (search === "") {
      return item;
    }
    return (
      item?.user_fullname.toLowerCase().includes(search.toLowerCase()) ||
      item?.user_nickname.toLowerCase().includes(search.toLowerCase()) ||
      item?.user_role.toLowerCase().includes(search.toLowerCase()) ||
      item?.user_telnum.toLowerCase().includes(search.toLowerCase())
    );
  });
  const fetchAPI = async () => {
    const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .get(`${import.meta.env.VITE_API_URL}/user/get`, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      })
      .then((data) => {
        setUsers(data.data.response);
      });
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <>
      <div className="form-input-container">
        {JSON.stringify()}
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

export default EmployeePage;
