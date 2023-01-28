import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useStateContext } from "../context";

const Navbar = () => {
  const { user, logOut } = useStateContext();
  // console.log("USER:", user);
  return (
    <nav className="p-5 bg-white shadow md:flex md:flex-row flex-col md:items-center md:justify-between">
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="text-[20px] font-epilogue font-semibold ml-[50px] cursor-pointer 
          hover:font-bold hover:text-[#FFC100] duration-500"
        >
          FUNDERR
        </Link>
      </div>
      <ul className="md:flex md:items-center">
        <li className="mx-4 my-6 md:my-0">
          <Link
            to="/Categories"
            className="text-[16px] font-epilogue hover:text-[#FFC100] duration-500"
          >
            Categories
          </Link>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <Link
            to="/HowItWorks"
            className="text-[16px] font-epilogue  hover:text-[#FFC100] duration-500"
          >
            How It Works
          </Link>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <Link
            to="/ContactUs"
            className="text-[16px] font-epilogue  hover:text-[#FFC100] duration-500"
          >
            Contact Us
          </Link>
        </li>
        {!user ? (
          <li className="ml-6 my-6 md:my-0">
            <Link
              to="/Login"
              className="text-[16px] font-epilogue  hover:text-[#FFC100] duration-500"
            >
              Login
            </Link>
          </li>
        ) : (
          ""
        )}
        {!user ? (
          <li className="mx-4 my-6 md:my-0">
            <Link
              to="/SignUp"
              className="text-[16px] text-white font-epilogue bg-[#1c1c24] py-[14px] px-[18px] 
            rounded-[40px] hover:bg-[#FFC100] duration-1000"
            >
              Sign Up
            </Link>
          </li>
        ) : (
          ""
        )}
        {user ? (
          <li className="mx-4 my-6 md:my-0">
            <div
              className="text-[16px] text-white font-epilogue bg-[#1c1c24] py-[14px] px-[18px] 
            rounded-[40px] hover:bg-[#FFC100] duration-1000 cursor-pointer w-[100px]"
              onClick={logOut}
            >
              Log Out
            </div>
          </li>
        ) : (
          ""
        )}
        {user ? (
          <li className="mx-4 my-6 md:my-0">
            <Link
              to={`/${
                user.role === "user"
                  ? "UserDashboard/profile"
                  : "AdminDashboard/admin-profile"
              }`}
            >
              <img
                src={user.picture}
                alt="userpic"
                className="w-12 h-12 rounded-full"
              />
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
