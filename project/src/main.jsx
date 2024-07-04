// React
import React from "react";
import ReactDOM from "react-dom/client";
// CSS
import "./global.css";
// React Router Dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Pages
import LoginPage from "./Admin/Pages/LoginPage";
import HomePage from "./Admin/Pages/HomePage";

const router = createBrowserRouter([
  {
    path: "admin",
    children: [
      {
        path: "",
        element: <HomePage />,
        children: [
          {
            path: "",
            element: (
              <>
                <h2>หน้าหลัก</h2>
              </>
            ),
          },
          {
            path: "table",
            element: (
              <>
                <h2>จัดการโต๊ะ</h2>
              </>
            ),
          },
          {
            path: "kitchen",
            element: (
              <>
                <h2>จัดการครัว</h2>
              </>
            ),
          },
          {
            path: "menu",
            element: (
              <>
                <h2>รายการอาหาร</h2>
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
