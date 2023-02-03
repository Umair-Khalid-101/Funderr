import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useStateContext } from "../context";
import { RecentDonations } from "../components";

const DaysLeft = ({
  deadline,
  campaignGoal,
  postedBy,
  state,
  progress,
  raised,
  campaignDonations,
}) => {
  const { user } = useStateContext();
  const [remainingDays, setRemainingDays] = useState();
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  // console.log("FROM DAYSLEFT:", deadline);
  // console.log("POSTEDBY: ", postedBy);
  // console.log("USERID: ", user._id);
  // console.log("CampaignId: ", state._id);

  const disableButton = () => {
    if (remainingDays < 1) {
      return true;
    } else if (postedBy === user._id) {
      return true;
    } else {
      return false;
    }
  };

  const daysLeft = (date) => {
    const now = new Date();
    const futureDate = new Date(date);
    const timeDiff = futureDate.getTime() - now.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  };

  function copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
    toast.success("URL Copied to clipboard", {
      position: "top-left",
    });
  }

  const handleNavigation = () => {
    if (user) {
      navigate("/Donate", { state: state });
    } else {
      toast.error("Please Login to Donate", {
        position: "top-left",
      });
    }
  };

  useEffect(() => {
    const remaining = daysLeft(deadline);
    setRemainingDays(remaining);
  }, []);

  return (
    <div>
      {remainingDays ? (
        <>
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
                  <div className="font-semibold text-white text-[24px] flex gap-2">
                    Days Left: {remainingDays < 1 ? "EXPIRED" : remainingDays}
                  </div>
                  <div className="flex items-center gap-2">
                    <h5 className="text-white text-[20px] font-semibold">
                      {raised > campaignGoal ? campaignGoal : raised} ETH
                    </h5>
                    <h5 className="text-[#919181]">
                      raised of {campaignGoal} ETH goal
                    </h5>
                  </div>
                </div>

                <div
                  className="w-full bg-gray-200 rounded-full h-2.5 
              dark:bg-gray-700 mt-[10px]"
                >
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                {/* buttons */}
                <div className="flex flex-col justify-center items-center gap-4 mt-[20px]">
                  <button
                    className="bg-[#ffc100] w-[280px] h-[45px] rounded-xl
                    font-bold hover:bg-[black] hover:text-[white] duration-500
                    cursor-pointer
                    "
                    onClick={handleNavigation}
                    disabled={disableButton()}
                  >
                    Donate
                  </button>
                  <button
                    className="border border-[#ffc100] bg-[white]
                    w-[280px] h-[45px] rounded-xl font-bold hover:bg-[black]
                    hover:text-[white] hover:border-none duration-500
                    cursor-pointer"
                    onClick={copy}
                  >
                    Share
                  </button>
                </div>
                {/* buttons */}
              </div>
              <div>
                <RecentDonations campaignDonations={campaignDonations} />
              </div>
            </div>
          </div>
          {/* Card with Action Buttons */}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default DaysLeft;
