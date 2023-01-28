import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { navlinks, adminnavlinks } from "../constants";
import { logo } from "../assets";
import { useStateContext } from "../context";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#353333]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = ({ type }) => {
  const navigate = useNavigate();
  const { logOut } = useStateContext();
  const [isActive, setIsActive] = useState("allcampaigns");
  return (
    <div
      className="flex justify-start items-center flex-col sticky top-5 h-[93vh] 
    xl:ml-4 lg:ml-[13px] md:ml-[10px] ml-[2px]"
    >
      <Link to={type === "admin" ? "/AdminDashboard" : "/UserDashboard"}>
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>

      <div
        className="flex-1 flex flex-col justify-between items-center 
      bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-2"
      >
        <div className="flex flex-col justify-center items-center gap-3">
          {type === "admin"
            ? adminnavlinks.map((link) => (
                <React.Fragment key={link.name}>
                  <Icon
                    {...link}
                    isActive={isActive}
                    handleClick={() => {
                      if (!link.disabled) {
                        setIsActive(link.name);
                        if (link.name === "logout") {
                          logOut();
                        } else {
                          navigate(link.link);
                        }
                      }
                    }}
                  />
                </React.Fragment>
              ))
            : navlinks.map((link) => (
                <React.Fragment key={link.name}>
                  <Icon
                    {...link}
                    isActive={isActive}
                    handleClick={() => {
                      if (!link.disabled) {
                        setIsActive(link.name);
                        if (link.name === "logout") {
                          logOut();
                        } else {
                          navigate(link.link);
                        }
                      }
                    }}
                  />
                </React.Fragment>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
