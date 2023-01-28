import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useStateContext } from "../../context";
import { CampaignCard, Loader } from "../../components";
import { search } from "../../assets";

const AllCampaigns = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/Details/${campaign.title}`, { state: campaign });
  };
  const { getVerifiedCampaigns, verifiedCampaigns, setVerifiedCampaigns } =
    useStateContext();

  useEffect(() => {
    setIsLoading(true);
    getVerifiedCampaigns().then((post) => {
      setVerifiedCampaigns(post.verified);
      setIsLoading(false);
    });
  }, []);

  // SEARCH FUNCTION
  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  if (isLoading) {
    return (
      <>
        <div className="xl:min-w-[90vw] lg:min-w-[85vw] md:min-w-[80vw] min-w-[75vw]">
          <Loader type="Campaigns" />
        </div>
      </>
    );
  }

  if (verifiedCampaigns.length === 0) {
    return (
      <>
        <div
          className="min-h-screen xl:min-w-[90vw] lg:min-w-[85vw] md:min-w-[80vw] min-w-[75vw]
        flex justify-center items-center"
        >
          <div className="flex-col items-center justify-center">
            <div className="text-black font-semibold text-[20px]">
              No campaigns yet!!! Create some or wait for someone to create
              some!!
            </div>
            <button
              className="border-none bg-[#ffc100] font-semibold text-black
          rounded-xl w-[200px] h-[45px] "
            >
              Create Campaigns
            </button>
          </div>
        </div>
      </>
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
            placeholder="Search Verified Campaigns"
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
      <div className="text-[18px] font-epilogue xl:w-[90vw] lg:w-[85vw] md:w-[80vw] w-[75vw] my-[20px]">
        Verified Campaigns ({verifiedCampaigns.length})
      </div>
      <div
        className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 xl:pr-[-30px] 
    lg:pl-[50px] lg:w-[80vw] md:w-[80vw] sm:ml-[20px] h-full"
      >
        {verifiedCampaigns
          .filter((campaign) => {
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
                userpic={campaign.posterPic}
                username={campaign.posterName}
                startdate={campaign.startdate}
                target={campaign.campaignGoal}
                description={campaign.description}
                permission={campaign.permission}
                campaign={campaign}
                type="VerifiedCampaigns"
                handleClick={() => handleNavigate(campaign)}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default AllCampaigns;
