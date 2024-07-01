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
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
