import React from "react";
import { Outlet } from "react-router-dom";

import { Sidebar, Navbar } from "../../components";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div
        className="grid xl:grid-cols-12 lg:grid-cols-10 md:grid-cols-8 grid-cols-4
      place-content-center place-items-start bg-[#ffffff] pt-4 h-max"
      >
        <Sidebar />
        <div className="h-full w-full sm:mr-[40px]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
