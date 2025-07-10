import React from "react";
import Sidebar from "./Sidebar"; // Your working Sidebar
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex bg-[#0d0d0d] min-h-screen ">
      <Sidebar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
