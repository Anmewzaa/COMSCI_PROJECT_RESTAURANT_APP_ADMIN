// React
import React from "react";
import ReactDOM from "react-dom/client";
// Antd
import { ConfigProvider } from "antd";
// CSS
import "./global.css";
// React Router Dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// ------- Admin Pages -------

import AdminLayout from "./Admin/Pages/AdminLayout";
import HomePage from "./Admin/Pages/HomePage";
// Login Page
import LoginPage from "./Admin/Pages/LoginPage";
// Table Page
import TablePage from "./Admin/Pages/TablePage/TablePage";
import EditTablePage from "./Admin/Pages/TablePage/EditTablePage";
import CreateTablePage from "./Admin/Pages/TablePage/CreateTablePage";
// Kitchen Page
import KitchenPage from "./Admin/Pages/KitchenPage/KitchenPage";
// Menu Page
import MenuPage from "./Admin/Pages/MenuPage/MenuPage";
import EditMenuInfoPage from "./Admin/Pages/MenuPage/EditMenuInfoPage";
import CreateMenuPage from "./Admin/Pages/MenuPage/CreateMenuPage";
// Categories Page
import CategoriesPage from "./Admin/Pages/CategoryPage/CategoriesPage";
import CreateCategoriesPage from "./Admin/Pages/CategoryPage/CreateCategoriesPage";
import EditCategoriesPage from "./Admin/Pages/CategoryPage/EditCategoriesPage";
// Option Page
import OptionPage from "./Admin/Pages/OptionPage/OptionPage";
import CreateOptionPage from "./Admin/Pages/OptionPage/CreateOptionPage";
import EditOptionPage from "./Admin/Pages/OptionPage/EditOptionPage";
// Employee Page
import EmployeePage from "./Admin/Pages/EmployeePage/EmployeePage";
import CreateEmployeePage from "./Admin/Pages/EmployeePage/CreateEmployeePage";
import EditEmployeePage from "./Admin/Pages/EmployeePage/EditEmployeePage";
// Zone Page
import ZonePage from "./Admin/Pages/ZonePage/ZonePage";
import CreateZonePage from "./Admin/Pages/ZonePage/CreateZonePage";
import EditZonePage from "./Admin/Pages/ZonePage/EditZonePage";

const router = createBrowserRouter([
  {
    path: "/",
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
          {
            path: "zone",
            element: <ZonePage />,
          },
          {
            path: "zone/create",
            element: <CreateZonePage />,
          },
          {
            path: "zone/edit/:id",
            element: <EditZonePage />,
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
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            colorPrimary: "#0000",
            colorPrimaryBg: "#ffffff",
            borderRadius: 5,
            fontFamily: "Sarabun",
            algorithm: true, // Enable algorithm
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
