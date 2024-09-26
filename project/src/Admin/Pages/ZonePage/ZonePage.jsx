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
    dataIndex: "zone_name",
    key: "name",
    render: (item) => <>{item}</>,
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
        <EditComponent id={item?.zone_id} />
        <DeleteComponent
          id={item?.zone_id}
          name={"zone"}
          destination={"zone"}
        />
      </Space>
    ),
  },
];

const ZonePage = () => {
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [zones, setZones] = useState([]);
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const handleResize = () => {
    setIsMobile(window.innerWidth < 900);
  };
  const searchFilter = zones?.filter((item) => {
    if (search === "") {
      return item;
    }
    return item?.zone_name.toLowerCase().includes(search.toLowerCase());
  });
  const fetchAPI = async () => {
    const JWT_TOKEN = localStorage.getItem("PARADISE_LOGIN_TOKEN");
    await axios
      .get(`${import.meta.env.VITE_API_URL}/authen/zone/get`, {
        headers: {
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
      })
      .then((data) => {
        setZones(data.data.response);
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
          type="text"
          placeholder="ค้นหาโซนร้านอาหาร"
          className="cursor sarabun-semibold mr-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button>
          <Link to={"create"} className="sarabun-semibold">
            เพิ่มโซนร้านอาหาร
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

export default ZonePage;
