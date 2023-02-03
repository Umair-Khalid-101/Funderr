import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CampaignCard } from "../../components";
import { useStateContext } from "../../context";
import { search } from "../../assets";

const ApproveCampaigns = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const { pendingCampaigns, getPendingCampaigns } = useStateContext();

  useEffect(() => {
    getPendingCampaigns();
  }, []);

  const handleNavigate = (campaign) => {
    navigate(`/Approve/${campaign.title}`, { state: campaign });
  };

  // SEARCH FUNCTION
  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  // {
  //   pendingCampaigns ? console.log("Pending Campaigns:", pendingCampaigns) : "";
  // }

  return (
    <>
      <div
        className="xl:w-[90vw] lg:w-[85vw] md:w-[80vw] w-[75vw]
      flex justify-end"
      >
        <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
          <input
            type="text"
            placeholder="Search Pending Campaign"
            className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
            onChange={handleSearch}
          />
          <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
            <img
              src={search}
              alt="search"
              className="w-[15px] h-[15px] object-contain"
            />
          </div>
        </div>
      </div>
      <div className="my-4 ml-4 font-semibold text-[20px]">
        Pending Campaigns: ({pendingCampaigns?.length})
      </div>
      <div
        className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 xl:pr-[-30px] 
    lg:pl-[50px] lg:w-[80vw] md:w-[80vw] sm:ml-[20px] h-full"
      >
        {pendingCampaigns
          ?.filter((campaign) => {
            if (searchInput === "") {
              return campaign;
            } else if (
              campaign.title.toLowerCase().includes(searchInput.toLowerCase())
            ) {
              return campaign;
            }
          })
          .map((campaign) => (
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
