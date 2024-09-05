import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow  ">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
