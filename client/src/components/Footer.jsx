import React from "react";
import { Link } from "react-router-dom";

import { Location, Phone, Email } from "../assets";

const Footer = () => {
  return (
    <>
      <div
        className="w-full flex flex-row justify-center items-center
      xl:mt-[80px] lg:mt-[60px] md:mt-[40px] mt-[20px] xl:p-[40px] bg-[#1c1c24]
      rounded-t-[40px] md:p-[20px] p-[20px]"
      >
        <div className="grid xl:grid-cols-3 md:grid-cols-2 justify-items-center">
          {/* Funderr and Content */}
          <div
            className="flex flex-col justify-center items-center xl:mx-[10px] lg:mx-[20px]
          lg:py-[20px]"
          >
            <div
              className="text-white xl:text-[26px] lg:text-[22px] md:text-[18px] 
            font-semibold xl:my-[10px] text-[18px] my-[6px]"
            >
              FUNDERR
            </div>
            <div className="text-white xl:mx-[20px] lg:mx-[20px] md:mx-[20px] md:mb-[20px] mb-[20px]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptatibus, facilis vero. Deserunt blanditiis culpa dolores
              reprehenderit quaerat consequuntur ratione, similique quas
              dignissimos quia tenetur eaque rerum ducimus fugiat enim quod.
              Repellat rerum aspernatur quae beatae deleniti sed itaque
              similique veniam fugiat ab veritatis sit nihil, quod et eos
              officiis omnis ea sequi iure accusamus, nobis sunt illum tempore
              animi. Eos.
            </div>
          </div>
          {/* Funderr and Content */}

          {/* Useful Links */}
          <div
            className="flex flex-col items-center xl:mx-[10px] lg:mx-[20px]
          lg:py-[20px]"
          >
            <div
              className="text-white font-semibold xl:text-[28px] lg:text-[22px] 
            md:text-[18px] xl:my-[10px] text-[18px] my-[6px]"
            >
              Useful Links
            </div>
            <Link
              to={"/"}
              className="text-white xl:text-[24px] lg:text-[20px] md:text-[18px] md:my-[6px]
              text-[18px] my-[4px]
              hover:font-semibold hover:text-[#FFC100] duration-500"
            >
              Home
            </Link>
            <Link
              to={"/HowItWorks"}
              className="text-white xl:text-[24px] lg:text-[20px] md:text-[18px] md:my-[6px]
              text-[18px] my-[4px] 
              hover:font-semibold hover:text-[#FFC100] duration-500"
            >
              How It Works
            </Link>
            <Link
              to={"/ContactUs"}
              className="text-white xl:text-[24px] lg:text-[20px] hover:font-semibold md:text-[18px] md:my-[6px]
              text-[18px] mt-[4px] mb-[10px]
              hover:text-[#FFC100] duration-500"
            >
              Contact Us
            </Link>
          </div>
          {/* Useful Links */}

          {/* Contact */}
          <div
            className="flex flex-col items-center xl:mx-[10px] lg:mx-[20px]
          lg:py-[20px]"
          >
            <div
              className="text-white xl:text-[28px] lg:text-[22px] md:text-[18px]
              text-[20px] mb-[6px] 
            md:mb-[6px] font-semibold xl:my-[10px] lg:my-[6px]"
            >
              Contact
            </div>
            <div className="flex flex-row items-center">
              <div className="text-white">
                <img src={Location} alt="location" className="w-6 h-6" />
              </div>
              <div
                className="text-white xl:mx-[12px] xl:text-[20px] lg:text-[18px] lg:mx-[12px]
              md:mx-[14px] text-[16px] mx-[10px]"
              >
                25 COMSATS LAHORE
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="text-white">
                <img src={Phone} alt="location" className="w-6 h-6" />
              </div>
              <div
                className="text-white xl:mx-[32px] xl:text-[20px] lg:text-[18px] lg:mx-[34px]
              md:mx-[34px] text-[16px] mx-[30px]"
              >
                +923317841345
              </div>
            </div>
            <div className="flex flex-row items-center">
              <div className="text-white">
                <img src={Email} alt="phone" className="w-6 h-6" />
              </div>
              <div
                className="text-white xl:mx-[24px] xl:text-[20px] lg:text-[18px] lg:mx-[26px]
              md:mx-[28px] text-[16px] mx-[24px]"
              >
                info@funderr.com
              </div>
            </div>
          </div>
          {/* Contact */}
        </div>
      </div>
    </>
  );
};

export default Footer;
