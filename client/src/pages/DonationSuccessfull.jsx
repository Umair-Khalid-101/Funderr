import React, { useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Navbar } from "../components";

const DonationSuccessfull = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("DONATION SUCCESSFULL", {
      position: "top-center",
      autoClose: 10000,
    });
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="flex justify-center 
      items-center mt-[100px] font-semibold text-[20px]"
      >
        CONGRATULATIONS!!! <br /> YOUR DONATION WAS SUCCESSFULL!!!
      </div>
      <Player
        src="https://assets10.lottiefiles.com/packages/lf20_mbznsnmf.json"
        style={{
          width: "300px",
          height: "300px",
        }}
        autoplay
        loop
      />
      <div className="flex justify-center items-center mb-8">
        <button
          className="w-[300px] h-[55px] bg-[black]
        text-white font-semibold text-[20px] rounded-[10px]
        hover:bg-[#fcc100] hover:text-black duration-500"
          onClick={() => navigate("/UserDashboard/allcampaigns")}
        >
          Go To All Campaigns
        </button>
      </div>
    </>
  );
};

export default DonationSuccessfull;
