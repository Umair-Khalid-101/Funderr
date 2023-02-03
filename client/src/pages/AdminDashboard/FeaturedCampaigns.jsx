import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CampaignCard } from "../../components";
import { useStateContext } from "../../context";
import { search } from "../../assets";

const FeaturedCampaigns = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const {
    featuredCampaigns,
    setFeaturedCampaigns,
    getFeaturedCampaigns,
    removeFeatured,
  } = useStateContext();

  const handleNavigate = (campaign) => {
    navigate(`/Details/${campaign.title}`, { state: campaign });
  };

  useEffect(() => {
    getFeaturedCampaigns();
  }, []);

  // SEARCH FUNCTION
  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const deleteFromFeatured = async (id) => {
    // alert("Delete From Featured");
    let filteredCampaigns = featuredCampaigns.filter((item) => item._id !== id);
    // console.log("FILTERED: ", filteredCampaigns);
    setFeaturedCampaigns(filteredCampaigns);
    removeFeatured(id);
  };

  // {
  //   featuredCampaigns ? console.log("Featured:", featuredCampaigns) : "";
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
            placeholder="Search Featured Campaign"
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
      <div className="ml-4 my-4 font-semibold text-[20px]">
        Featured Campaigns: ({featuredCampaigns?.length})
      </div>
      <div
        className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 xl:pr-[-30px] 
    lg:pl-[50px] lg:w-[80vw] md:w-[80vw] sm:ml-[20px] h-full"
      >
        {featuredCampaigns
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
                startdate={campaign.startdate}
                username={campaign.posterName}
                userpic={campaign.posterPic}
                target={campaign.campaignGoal}
                permission={campaign.permission}
                type="FeaturedCampaigns"
                handleClick={() => handleNavigate(campaign)}
                handleDelete={() => deleteFromFeatured(campaign._id)}
              />
            </div>
          ))}
        {featuredCampaigns?.length === 0 ? (
          <>
            <div
              className="min-h-[100vh] min-w-[100vw] 
            justify-center items-center font-semibold text-[24px]"
            >
              There are No Featured Campaigns! <br /> Add Some to Featured and
              Come Back!!!
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default FeaturedCampaigns;
