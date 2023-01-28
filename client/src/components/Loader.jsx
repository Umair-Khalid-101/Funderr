import React from "react";

import { loader } from "../assets";

const Loader = ({ type }) => {
  const process = () => {
    if (type === "SignUp") {
      return "SIGNING UP";
    } else if (type === "Donation") {
      return "DONATION";
    } else if (type === "Campaigns") {
      return "Campaigns";
    } else if (type === "My Campaigns") {
      return "My Campaigns";
    } else if (type === "Fav Campaigns") {
      return "Fav Campaigns";
    } else if (type === "Campaign Creation") {
      return "Campaign Creation";
    } else if (type === "Notifications") {
      return "Notifications";
    } else if (type === "CategoryCampaigns") {
      return "CategoryCampaigns";
    } else if (type === "Campaign Details") {
      return "Campaign Details";
    }
  };

  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <img
        src={loader}
        alt="loader"
        className="w-[100px] h-[100px] object-contain"
      />
      <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">
        {process()} is in progress <br /> Please wait...
      </p>
    </div>
  );
};

export default Loader;
