import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./layout.css";

const Layout = () => {
  return (
    <div className="owner-layout">
      {/* Topbar */}
      <Topbar />

      <div className="d-flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="content-area p-4 w-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
