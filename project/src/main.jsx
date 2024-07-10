// React
import React from "react";
import ReactDOM from "react-dom/client";
// CSS
import "./global.css";
// React Router Dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Pages
import LoginPage from "./Admin/Pages/LoginPage";
import AdminLayout from "./Admin/Pages/AdminLayout";
import HomePage from "./Admin/Pages/HomePage";
import TablePage from "./Admin/Pages/TablePage";
import KitchenPage from "./Admin/Pages/KitchenPage";
import MenuPage from "./Admin/Pages/MenuPage";
import MenuInfo from "./Admin/Pages/MenuInfo";
import CategoriesPage from "./Admin/Pages/CategoriesPage";
import OptionPage from "./Admin/Pages/OptionPage";

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
            element: (
              <>
                <HomePage />
              </>
            ),
          },
          {
            path: "table",
            element: (
              <>
                <TablePage />
              </>
            ),
          },
          {
            path: "kitchen",
            element: (
              <>
                <KitchenPage />
              </>
            ),
          },
          {
            path: "menu",
            element: (
              <>
                <MenuPage />
              </>
            ),
          },
          {
            path: "menu/:id",
            element: <MenuInfo />,
          },
          {
            path: "menu/categories",
            element: (
              <>
                <CategoriesPage />
              </>
            ),
          },
          {
            path: "menu/option",
            element: (
              <>
                <OptionPage />
              </>
            ),
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
