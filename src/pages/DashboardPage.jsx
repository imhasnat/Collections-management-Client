import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen">
      <h1 className="text-5xl">
        Hi! <span className="font-bold text-primary">{user.name}</span>
      </h1>
      <h2 className="text-3xl">
        Welcome to <span className="font-bold text-primary">Dashboard</span>
      </h2>
    </div>
  );
};

export default DashboardPage;
