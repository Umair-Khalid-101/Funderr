import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Navbar, CampaignCard, Loader } from "../components";
import { useStateContext } from "../context";
import { search } from "../assets";

const ByCategory = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const { categoryCampaigns, byCategory, user } = useStateContext();
  const { category } = useParams();
  useEffect(() => {
    byCategory(category);
  }, []);

  const handleNavigate = (campaign) => {
    if (user) {
      navigate(`/CampaignDetails/${campaign.title}`, { state: campaign });
    } else {
      toast.warn("Please Login to see Deatails", {
        position: "top-left",
      });
    }
  };

  // SEARCH FUNCTION
  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <>
      <Navbar />
      {categoryCampaigns ? (
        <>
          <div
            className="xl:w-[90vw] lg:w-[85vw] md:w-[80vw] w-[75vw]
      flex justify-end mt-6"
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
          <div className="mt-4 ml-4 mb-4 font-semibold text-[20px]">{`${category} Campaigns: ${categoryCampaigns.length}`}</div>
          <div
            className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2
      grid-cols-1 gap-4 place-content-center place-items-center mt-4"
          >
            {categoryCampaigns
              .filter((campaign) => {
                if (searchInput === "") {
                  return campaign;
                } else if (
                  campaign.title
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())
                ) {
                  return campaign;
                }
              })
              .map((campaign) => (
                <div key={Math.random()}>
                  <CampaignCard
                    imgUrl={campaign.picture}
                    title={campaign.title}
                    username={campaign.posterName}
                    userpic={campaign.posterPic}
                    description={campaign.description}
                    startdate={campaign.startdate}
                    target={campaign.campaignGoal}
                    permission={campaign.permission}
                    type="categoryCampaigns"
                    handleClick={() => handleNavigate(campaign)}
                  />
                </div>
              ))}
          </div>
        </>
      ) : (
        <>
          {categoryCampaigns ? (
            <>
              {categoryCampaigns.length === 0 ? (
                <>
                  <div>
                    NO CAMPAIGNS OF {category} CATEGORY. Please try again at a
                    later date
                  </div>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            <Loader type="CategoryCampaigns" />
          )}
        </>
      )}
    </>
  );
};

export default ByCategory;
