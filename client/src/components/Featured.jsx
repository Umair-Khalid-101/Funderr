import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { CampaignCard } from "../components";
import { useStateContext } from "../context";

const Featured = () => {
  const navigate = useNavigate();
  const { featuredCampaigns, user } = useStateContext();

  const handleNavigate = (campaign) => {
    if (user) {
      navigate(`/Details/${campaign.title}`, { state: campaign });
    } else {
      toast.warn("Please Login to see details!", {
        position: "top-left",
      });
    }
  };

  return (
    <>
      {featuredCampaigns ? (
        <div
          className="w-full flex flex-col justify-center items-center
      xl:mt-[80px] lg:mt-[60px] md:mt-[40px] mt-[20px]
      "
        >
          <div
            className="xl:text-[44px] lg:text-[36px] md:text-[28px] text-[24px] font-semibold
        xl:mb-[24px] lg:mb-[24px] md:mb-[16px] mb-[12px]"
          >
            Featured Projects
          </div>
          <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {featuredCampaigns.map((campaign) => (
              <ul key={Math.random()}>
                <li className="xl:mx-[80px] lg:mx-[25px] md:mx-[40px]">
                  <CampaignCard
                    imgUrl={campaign.picture}
                    title={campaign.title}
                    userpic={campaign.posterPic}
                    username={campaign.posterName}
                    startdate={campaign.startdate}
                    target={campaign.campaignGoal}
                    description={campaign.description}
                    permission={campaign.permission}
                    campaign={campaign}
                    type="featuredCampaigns"
                    handleClick={() => handleNavigate(campaign)}
                  />
                </li>
              </ul>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Featured;
