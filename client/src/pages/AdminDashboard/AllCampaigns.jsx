import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { CampaignCard } from "../../components";
import { dummyData } from "../../constants";
import { useStateContext } from "../../context";

const AllCampaigns = () => {
  const navigate = useNavigate();
  const { user, getAllCampaigns, allCampaigns, setAllCampaigns } =
    useStateContext();
  const handleNavigate = (campaign) => {
    navigate(`/Details/${campaign.title}`, { state: campaign });
  };

  useEffect(() => {
    getAllCampaigns();
  }, []);

  // {
  //   allCampaigns ? console.log("All Campaigns:", allCampaigns) : "";
  // }

  {
    allCampaigns?.length === 0 ? (
      <>
        <div
          className="min-h-screen min-w-full flex
        justify-center items-center font-semibold text-[20px]"
        >
          There are no Campaigns
        </div>
      </>
    ) : (
      <></>
    );
  }

  return (
    <>
      <div className="my-4 ml-4 font-semibold text-[20px]">
        All Campaigns: ({allCampaigns?.length})
      </div>
      <div
        className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 xl:pr-[-30px] 
    lg:pl-[50px] lg:w-[80vw] md:w-[80vw] sm:ml-[20px] h-full"
      >
        {allCampaigns?.map((campaign) => (
          <div key={Math.random()} className="md:w-[300px] md:pl-[20px]">
            <CampaignCard
              imgUrl={campaign.picture}
              title={campaign.title}
              description={campaign.description}
              permission={campaign.permission}
              target={campaign.campaignGoal}
              startdate={campaign.startdate}
              username={campaign.posterName}
              userpic={campaign.posterPic}
              type="Admin-AllCampaigns"
              campaign={campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default AllCampaigns;
