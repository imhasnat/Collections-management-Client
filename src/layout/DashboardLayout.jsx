import React from "react";
import Sidebar from "../components/Siderbar";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";

const DashboardLayout = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
