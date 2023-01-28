import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Navbar, DaysLeft } from "../components";

const CampaignDetails = ({ campaignDonations }) => {
  const { state } = useLocation();
  const [readMore, setReadMore] = useState(true);
  const [raised, setRaised] = useState();

  useEffect(() => {
    calculateRaisedAmount();
  }, []);

  const calculateRaisedAmount = () => {
    if (campaignDonations) {
      const sum = campaignDonations.reduce((acc, obj) => {
        return acc + parseFloat(obj.amount);
      }, 0);
      // console.log("Raised Amount: ", sum);
      setRaised(sum);
    }
  };

  const calculatePercentage = (part, whole) => {
    if (whole === 0) {
      return 0;
    } else if (part > whole) {
      return 100;
    } else {
      return (part / whole) * 100;
    }
  };
  let percentage = calculatePercentage(raised, state.campaignGoal);
  // console.log(`Percentage: ${percentage}%`);

  return (
    <>
      <Navbar />
      {/* Main Container */}
      <div className="grid lg:grid-cols-3 grid-cols-1 mb-8">
        {/* Title,Image and Details */}
        <div className="min-h-screen md:col-span-2 w-full">
          {/* Title */}
          <h1
            className="mt-[40px] md:text-5xl text-3xl xl:ml-[100px] lg:ml-[50px] 
          md:ml-[80px] ml-[40px] md:mb-[10px] mb-[20px]"
          >
            {state.title}
          </h1>
          {/* Title */}
          {/* Campaign Image */}
          <img
            src={state.picture}
            alt="campaign-pic"
            className="md:w-[600px] md:h-[400px] w-[300px] h-[200px]
            xl:ml-[100px] lg:ml-[50px] md:ml-[80px] ml-[10px] rounded-[30px]"
          />
          {/* Campaign Image */}
          {/* Name , Category and Profile Pic */}
          <div
            className="flex xl:ml-[100px] lg:ml-[50px] md:ml-[80px] 
          ml-[10px] mt-[10px] items-center"
          >
            <img
              src={state.posterPic}
              alt="user"
              className="h-12 w-12 rounded-full"
            />
            <div className="flex flex-col justify-center items-center">
              <div className="ml-[10px]">{state.posterName}</div>
              <div className="ml-[10px] text-[14px]">{state.category}</div>
            </div>
          </div>
          {/* Name , Category and Profile Pic */}
          {/* Description */}
          <div
            className="xl:ml-[100px] lg:ml-[50px] md:ml-[80px] 
          md:w-[600px] w-[300px] ml-[10px] mt-[10px]"
          >
            <p className="text-[16px]">
              {readMore
                ? state.description.substring(0, 250)
                : state.description}
            </p>
            <span
              className="my-[10px] cursor-pointer underline 
              text-[#41413f] font-semibold"
              onClick={() => setReadMore(!readMore)}
            >
              {readMore ? "Read More" : "Show Less"}
            </span>
          </div>
          {/* Description */}

          {/* Details */}

          <div
            className="xl:ml-[100px] lg:ml-[50px] md:ml-[80px] 
          ml-[10px] mt-[20px] flex items-center gap-4"
          >
            <div className="text-[20px] font-semibold">End Date:</div>
            <div className="text-[18px]">{state.enddate.split("T")[0]}</div>
          </div>

          <div
            className="flex items-center gap-4
          xl:ml-[100px] lg:ml-[50px] md:ml-[80px] 
          ml-[10px] mt-[20px]  w-[300px]"
          >
            <div className="text-[20px] font-semibold">Wallet Address</div>
            <div className="text-[18px] w-[300px] overflow-hidden">
              {state.walletAddress}
            </div>
          </div>

          <div
            className="md:w-[600px] w-[300px] xl:ml-[100px] lg:ml-[50px] 
          md:ml-[80px] ml-[10px] md:flex flex-col justify-evenly items-center"
          >
            <div className="flex gap-4 mt-4 items-center">
              <div className="text-[20px] font-semibold">Target Amount:</div>
              <div className="text-[18px]">{state.campaignGoal} ETH</div>
            </div>
            <div className="flex gap-4 mt-4 items-center">
              <div className="text-[20px] font-semibold">Raised Amount:</div>
              <div className="text-[18px]">{raised?.toFixed(2)} ETH</div>
            </div>
          </div>
          {/* Details */}

          {/* Slogan */}
          <div
            className="mt-[20px] xl:ml-[100px] lg:ml-[50px] md:ml-[80px] 
          bg-[#ffc100] rounded-xl p-4 md:w-[600px] w-full"
          >
            <h4 className="font-epilogue font-semibold text-[18px] leading-[22px] text-black">
              Back it because you believe in it.
            </h4>
            <p className="mt-[10px] font-epilogue font-normal leading-[22px] text-[#2f2f31]">
              Support the project for no reward, just because it speaks to you.
            </p>
          </div>
          {/* Slogan */}
        </div>
        {/* Title,Image and Details */}

        {/* Card with Action Buttons */}
        {
          <DaysLeft
            deadline={state.enddate.split("T")[0]}
            campaignGoal={state.campaignGoal}
            postedBy={state.postedBy}
            state={state}
            progress={percentage}
            raised={raised?.toFixed(2)}
            campaignDonations={campaignDonations}
          />
        }
        {/* Card with Action Buttons */}
      </div>
      {/* Main Container */}
    </>
  );
};

export default CampaignDetails;
