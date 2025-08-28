import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Common/Sidebar";
import Topbar from "../components/Common/Topbar";
// import StatsCards from "../components/StatsCards";
// import CustomersTable from "../components/CustomersTable";

export default function Dashboard() {
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };

  return (
    <div className="flex h-screen rounded-3xl bg-purple-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden ml-20 md:ml-64">
<div className="mt-2">
          <Topbar />

  </div>      
    <main className="p-6 overflow-auto">
          {/* <StatsCards /> */}
          {/* <CustomersTable /> */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
