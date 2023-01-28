import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import { Navbar } from "../../components";
import { useStateContext } from "../../context";

const Approve = () => {
  const { approveCampaign, sendApprovalNotification } = useStateContext();
  const { state } = useLocation();
  const [readMore, setReadMore] = useState(true);
  // console.log("Campaign: ", state);

  const handleApproval = async (id, data) => {
    // alert(id);
    approveCampaign(id);
    sendApprovalNotification(data);
  };

  return (
    <>
      <Navbar />
      {/* Main Container */}
      <div className="grid lg:grid-cols-3 grid-cols-1">
        {/* Title,Image and Details */}
        <div className="min-h-screen md:col-span-2 w-full">
          {/* Title */}
          <h1
            className="mt-[40px] text-5xl xl:ml-[100px] lg:ml-[50px] 
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
            className="md:w-[600px] w-[300px] xl:ml-[100px] lg:ml-[50px] 
          md:ml-[80px] ml-[10px] md:flex flex-col justify-evenly items-center"
          >
            <div className="flex gap-4 mt-4 items-center">
              <div className="text-[20px] font-semibold">Target Amount:</div>
              <div className="text-[18px]">{state.campaignGoal} ETH</div>
            </div>
            <div className="flex gap-4 mt-4 items-center">
              <div className="text-[20px] font-semibold">Raised Amount:</div>
              <div className="text-[18px]">1 ETH</div>
            </div>
          </div>
          {/* Details */}

          {/* Approve Button */}
          <div
            className="xl:ml-[100px] lg:ml-[50px] md:ml-[80px] w-[300px] flex
            justify-center items-center
          my-[20px]"
            onClick={() => handleApproval(state._id, state)}
          >
            <button
              className="bg-[#ffc100] w-[280px] h-[45px] rounded-xl
            font-bold hover:bg-[black]
            hover:text-[white] duration-500"
            >
              Approve Campaign
            </button>
          </div>
          {/* Approve Button */}
        </div>
        {/* Title,Image and Details */}

        {/* Card with Action Buttons */}
        <div className="min-h-screen">
          <div className="sticky top-4">
            <div
              className="lg:mt-[100px] xl:ml-[40px] lg:ml-[0px] lg:max-w-sm p-6 
              bg-white border border-gray-200 mt-[20px] max-w-screen
              rounded-lg shadow-md dark:bg-gray-800 
              dark:border-gray-700 sticky"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h5 className="text-white text-[20px] font-semibold">
                    0 ETH
                  </h5>
                  <h5 className="text-[#919181]">
                    raised of {state.campaignGoal} ETH goal
                  </h5>
                </div>
              </div>

              <div
                className="w-full bg-gray-200 rounded-full h-2.5 
              dark:bg-gray-700 mt-[10px]"
              >
                <div className="bg-blue-600 h-2.5 rounded-full w-0"></div>
              </div>

              {/* buttons */}
              <div className="flex flex-col justify-center items-center gap-4 mt-[20px]">
                <button
                  className="bg-[#ffc100] w-[280px] h-[45px] rounded-xl
            font-bold hover:bg-[black]
            hover:text-[white] duration-500"
                  onClick={() => handleApproval(state._id, state)}
                >
                  Approve Campaign
                </button>
              </div>
              {/* buttons */}
            </div>
          </div>
        </div>
        {/* Card with Action Buttons */}
      </div>
      {/* Main Container */}
    </>
  );
};

export default Approve;
