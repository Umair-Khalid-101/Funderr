import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CampaignCard } from "../../components";
import { search } from "../../assets";
import { useStateContext } from "../../context";

const AllCampaigns = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const { user, getAllCampaigns, allCampaigns, setAllCampaigns } =
    useStateContext();
  const handleNavigate = (campaign) => {
    navigate(`/Details/${campaign.title}`, { state: campaign });
  };

  useEffect(() => {
    getAllCampaigns();
  }, []);

  // SEARCH FUNCTION
  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

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
      <div
        className="xl:w-[90vw] lg:w-[85vw] md:w-[80vw] w-[75vw]
      flex justify-end"
      >
        <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
          <input
            type="text"
            placeholder="Search Campaign"
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
        All Campaigns: ({allCampaigns?.length})
      </div>
      <div
        className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 xl:pr-[-30px] 
    lg:pl-[50px] lg:w-[80vw] md:w-[80vw] sm:ml-[20px] h-full"
      >
        {allCampaigns
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
