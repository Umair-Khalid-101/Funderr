import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { LandingPageImg } from "../assets";
import { useStateContext } from "../context";

const Hero = () => {
  const { user } = useStateContext();
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      if (user.role === "admin") {
        toast.info("Admin Cannot perform this action", {
          position: "top-left",
        });
      } else {
        navigate("/UserDashboard/create-campaign");
      }
    } else {
      navigate("/Login");
    }
  };

  return (
    <>
      <div className="flex md:flex-row flex-col md:justify-between justify-center items-center">
        <div className="flex flex-col items-center">
          <div
            className="lg:ml-[80px] md:ml-[40px] lg:mt-[80px] md:mt-[40px] lg:mb-[10px] md:mb-[5px] ml-[6px] 
          mt-[6px] text-[24px] lg:[36px] xl:text-[44px] font-semibold"
          >
            Welcome to Funderr
          </div>
          <button
            className="lg:w-[300px] md:w-[200px] w-[200px] lg:ml-[80px] md:ml-[40px] ml-[6px] mt-[16px] lg:p-2 md:p-2 p-1 border-none
          bg-[#313133] text-white lg:text-[20px] md:text-[18px] text-[16px] rounded-[50px] mb-[20px]
           hover:bg-[#FFC100] hover:text-white duration-500"
            onClick={handleClick}
          >
            Create Campaign
          </button>
        </div>
        <img
          src={LandingPageImg}
          alt="LandingPageImg"
          className="lg:w-[500px] lg:h-[300px] md:w-[300px] md:h-[200px] xl:mr-[120px] lg:mr-[80px] lg:mt-[40px] 
          md:mr-[80px] md:mt-[20px] w-[200px] h-[150px]
          hover:scale-110 transition duration-500 ease-in-out cursor-pointer"
        />
      </div>
    </>
  );
};

export default Hero;
