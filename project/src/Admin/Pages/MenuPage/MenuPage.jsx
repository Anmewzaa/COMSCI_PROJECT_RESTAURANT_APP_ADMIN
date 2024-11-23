// React Hook
import { createContext, useState, useEffect } from "react";
// Components
import MenuInfoComponent from "../../Components/MenuInfoComponent";
// Context
export const SearchContext = createContext(null);
// Axios
import axios from "axios";
// CSS
import "../../CSS/MenuPage.css";
// React Router Dom
import { Link } from "react-router-dom";
// Antd
import { Input, Button, Table } from "antd";

const MenuPage = () => {
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState();
  const [selectedMenuIds, setSelectedMenuIds] = useState([]);

  const fetchAPI = async () => {
    setLoading(true);
    await axios.get(`${import.meta.env.VITE_API_URL}/menu/get`).then((data) => {
      setMenu(data.data.response);
    });
    setLoading(false);
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  const searchFilter = menu?.filter((item) => {
    if (search === "") {
      return item;
    }
    return item?.menu_category_id[0]?.category_name?.thai
      .toLowerCase()
      .includes(search.toLowerCase());
  });
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const menuIds = selectedRows.map((row) => row.menu_id);
      setSelectedMenuIds(menuIds);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };
  const changeMenuStatus = async (param) => {
    try {
      const JWT_TOKEN = await localStorage.getItem("PARADISE_LOGIN_TOKEN");
      axios
        .put(
          `${import.meta.env.VITE_API_URL}/authen/menu/changestatus`,
          { menu_ids: selectedMenuIds, status: param },
          {
            headers: {
              Authorization: `Bearer ${JWT_TOKEN}`,
            },
          }
        )
        .then(() => {
          alert("PASS");
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <SearchContext.Provider value={{ search, setSearch }}>
        <div className="form-input-container">
          <Input
            placeholder="ค้นหารายการอาหาร"
            onChange={(e) => setSearch(e.target.value)}
            className="cursor mr-1 prompt-semibold"
            size={"large"}
            value={search}
          />
          <Button size={"large"}>
            <Link to={"create"} className="prompt-semibold">
              เพิ่มรายการอาหาร
            </Link>
          </Button>
        </div>
        <div>
          <Table
            loading={loading}
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            className="form-table-container"
            title={() => (
              <div className="left-side-container">
                <Button
                  className="prompt-semibold mr-1"
                  onClick={() => changeMenuStatus(true)}
                >
                  แจ้งรายการมี
                </Button>
                <Button
                  className="prompt-semibold"
                  onClick={() => changeMenuStatus(false)}
                >
                  แจ้งรายการหมด
                </Button>
              </div>
            )}
            columns={[
              {
                title: "ชื่ออาหาร",
                dataIndex: "menu_name",
                width: "20%",
                render: (text) => (
                  <div className="prompt-medium">
                    {text.thai} ({text.english})
                  </div>
                ),
              },
              {
                title: "คำอธิบาย",
                dataIndex: "menu_describe",
                width: "20%",
                render: (text) => (
                  <div className="prompt-medium">
                    {text.thai} ({text.english})
                  </div>
                ),
              },
              {
                title: "ราคา (บาท)",
                dataIndex: "menu_price",
                width: "20%",
                render: (text) => <div className="prompt-medium">{text}</div>,
              },
              {
                title: "สถานะ",
                dataIndex: "menu_status",
                width: "20%",
                render: (status) => (
                  <div className="prompt-medium">
                    <>{status ? "มี" : "หมด"}</>
                  </div>
                ),
                filters: [
                  {
                    text: "มี",
                    value: true,
                  },
                  {
                    text: "หมด",
                    value: false,
                  },
                ],
                onFilter: (value, record) => record.menu_status === value,
              },
              {
                title: "",
                dataIndex: "command",
                width: "15%",
                render: (_, record) => (
                  <div>
                    <MenuInfoComponent menu={record} />
                  </div>
                ),
              },
            ]}
            dataSource={searchFilter}
            rowKey={(record) => record._id}
          />
        </div>
      </SearchContext.Provider>
    </>
  );
};

export default MenuPage;
