// React
import React from "react";
import ReactDOM from "react-dom/client";
// CSS
import "./global.css";
// React Router Dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Admin Pages
import LoginPage from "./Admin/Pages/LoginPage";
import AdminLayout from "./Admin/Pages/AdminLayout";
import HomePage from "./Admin/Pages/HomePage";
import TablePage from "./Admin/Pages/TablePage/TablePage";
import TableInfoPage from "./Admin/Pages/TablePage/TableInfoPage";
import EditTablePage from "./Admin/Pages/TablePage/EditTablePage";
import CreateTablePage from "./Admin/Pages/TablePage/CreateTablePage";
import KitchenPage from "./Admin/Pages/KitchenPage/KitchenPage";
import MenuPage from "./Admin/Pages/MenuPage/MenuPage";
import MenuInfo from "./Admin/Pages/MenuPage/MenuInfo";
import EditMenuInfoPage from "./Admin/Pages/MenuPage/EditMenuInfoPage";
import CreateMenuPage from "./Admin/Pages/MenuPage/CreateMenuPage";
import CategoriesPage from "./Admin/Pages/CategoryPage/CategoriesPage";
import CreateCategoriesPage from "./Admin/Pages/CategoryPage/CreateCategoriesPage";
import EditCategoriesPage from "./Admin/Pages/CategoryPage/EditCategoriesPage";
import OptionPage from "./Admin/Pages/OptionPage/OptionPage";
import CreateOptionPage from "./Admin/Pages/OptionPage/CreateOptionPage";
import EditOptionPage from "./Admin/Pages/OptionPage/EditOptionPage";
import EmployeePage from "./Admin/Pages/EmployeePage/EmployeePage";
import CreateEmployeePage from "./Admin/Pages/EmployeePage/CreateEmployeePage";
import EditEmployeePage from "./Admin/Pages/EmployeePage/EditEmployeePage";

const router = createBrowserRouter([
  {
    path: "admin",
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "table",
            element: <TablePage />,
            children: [
              {
                path: "",
                element: (
                  <div>
                    <h3>รายละเอียดโต๊ะ</h3>
                    <div className="full-height flex-center white-container">
                      กรุณาเลือกโต๊ะ
                    </div>
                  </div>
                ),
              },
              {
                path: ":id",
                element: <TableInfoPage />,
              },
            ],
          },
          {
            path: "table/create",
            element: <CreateTablePage />,
          },
          {
            path: "table/edit/:id",
            element: <EditTablePage />,
          },
          {
            path: "kitchen",
            element: <KitchenPage />,
          },
          {
            path: "menu",
            element: <MenuPage />,
          },
          {
            path: "menu/create",
            element: <CreateMenuPage />,
          },
          {
            path: "menu/:id",
            element: <MenuInfo />,
          },
          {
            path: "menu/edit/:id",
            element: <EditMenuInfoPage />,
          },
          {
            path: "menu/categories",
            element: <CategoriesPage />,
          },
          {
            path: "menu/categories/create",
            element: <CreateCategoriesPage />,
          },
          {
            path: "menu/categories/edit/:id",
            element: <EditCategoriesPage />,
          },
          {
            path: "menu/option",
            element: <OptionPage />,
          },
          {
            path: "menu/option/create",
            element: <CreateOptionPage />,
          },
          {
            path: "menu/option/edit/:id",
            element: <EditOptionPage />,
          },
          {
            path: "employee",
            element: <EmployeePage />,
          },
          {
            path: "employee/create",
            element: <CreateEmployeePage />,
          },
          {
            path: "employee/edit/:id",
            element: <EditEmployeePage />,
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
