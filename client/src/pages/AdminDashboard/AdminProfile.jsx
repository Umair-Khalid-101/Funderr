import React from "react";
import { useNavigate } from "react-router-dom";

import { Banner } from "../../assets";
import { useStateContext } from "../../context";

const AdminProfile = () => {
  const navigate = useNavigate();
  const { user } = useStateContext();
  return (
    <>
      <div className="flex flex-col lg:w-[90vw] md:w-[80vw] w-[75vw]">
        <div className="flex justify-center items-center lg:w-full md:w-[600px]">
          <img
            src={Banner}
            alt="banner"
            className="md:h-[300px] md:w-[500px] w-[200px] h-[200px]"
          />
        </div>
        <div>
          <img
            src={user.picture}
            alt="user"
            className="md:h-24 md:w-24 h-16 w-16 rounded-full 
            bg-slate-200 xl:ml-[200px] lg:ml-[100px]
            md:ml-[80px]"
          />
        </div>
        <div className="flex flex-col xl:ml-[400px] lg:ml-[250px] md:ml-[200px] ml-[70px]">
          <div className="font-semibold md:text-[20px] text-[18px]">Name</div>
          <div className="xl:ml-[80px] ml-[60px] my-[10px] md:text-[18px] text-[16px]">
            {user.name}
          </div>
        </div>
        <div className="flex flex-col xl:ml-[400px] lg:ml-[250px] md:ml-[200px] ml-[70px]">
          <div className="font-semibold md:text-[20px] text-[18px]">Email</div>
          <div className="xl:ml-[80px] md:ml-[60px] my-[10px] md:text-[18px] text-[16px]">
            {user.email}
          </div>
        </div>
        <div className="flex justify-end items-center lg:mr-[100px] md:mr-[10px] mb-[30px] mr-[50px] md:mt-0 mt-[10px]">
          <button
            className="bg-[#FCC100] p-3 rounded-xl text-black
          font-semibold hover:bg-black hover:text-white duration-500"
            onClick={() => navigate(`/EditProfile/${user.name}`)}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
