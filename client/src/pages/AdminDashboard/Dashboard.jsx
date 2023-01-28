import React from "react";
import { Outlet } from "react-router-dom";

import { Navbar, Sidebar } from "../../components";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-12 place-content-start min-h-screen">
        <div
          className="lg:col-span-1 md:col-span-1
        col-span-2 xl:pr-[10px] lg:pr-[12px]
        min-h-screen mt-4"
        >
          <Sidebar type={"admin"} />
        </div>
        <div
          className="md:col-span-11 
        col-span-10 min-h-screen pt-6 md:pl-0 pl-6"
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
