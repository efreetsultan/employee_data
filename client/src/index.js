import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Employees from "./Employees";
import EmployeeCreator from "./EmployeeCreator";
import EmployeeUpdater from "./EmployeeUpdater";
import Division from "./Division"
import DivisionCreator from "./DivisionCreator";
import DivisionUpdater from "./DivisionUpdater";

import reportWebVitals from "./reportWebVitals";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "",
    element: <Employees />,
  },
  {
    path: "/create",
    element: <EmployeeCreator />,
  },
  {
    path: "/update/:id",
    element: <EmployeeUpdater />,
  },
  {
    path: "/division",
    element: <Division />
  },
  {
    path: "/division/update/:id",
    element: <DivisionUpdater/>
  },
  {
    path: "/division/create",
    element: <DivisionCreator/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
