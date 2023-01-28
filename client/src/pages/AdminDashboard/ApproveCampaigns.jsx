import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { CampaignCard } from "../../components";
import { useStateContext } from "../../context";

const ApproveCampaigns = () => {
  const navigate = useNavigate();
  const { pendingCampaigns, getPendingCampaigns } = useStateContext();

  useEffect(() => {
    getPendingCampaigns();
  }, []);

  const handleNavigate = (campaign) => {
    navigate(`/Approve/${campaign.title}`, { state: campaign });
  };

  // {
  //   pendingCampaigns ? console.log("Pending Campaigns:", pendingCampaigns) : "";
  // }

  return (
    <>
      <div className="my-4 ml-4 font-semibold text-[20px]">
        Pending Campaigns: ({pendingCampaigns?.length})
      </div>
      <div
        className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 xl:pr-[-30px] 
    lg:pl-[50px] lg:w-[80vw] md:w-[80vw] sm:ml-[20px] h-full"
      >
        {pendingCampaigns?.map((campaign) => (
          <div key={Math.random()} className="md:w-[300px] md:pl-[20px]">
            <CampaignCard
              imgUrl={campaign.picture}
              title={campaign.title}
              description={campaign.description}
              target={campaign.campaignGoal}
              username={campaign.posterName}
              userpic={campaign.posterPic}
              startdate={campaign.startdate}
              permission={campaign.permission}
              campaign={campaign}
              type="ApproveCampaigns"
              handleClick={() => handleNavigate(campaign)}
            />
          </div>
        ))}
        {pendingCampaigns?.length === 0 ? (
          <>
            <div
              className="min-h-screen min-w-full
            flex justify-center items-center font-semibold
            text-[24px]"
            >
              NO CAMPAIGNS PENDING FOR APPROVAL
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ApproveCampaigns;
