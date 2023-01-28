import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { CampaignCard } from "../../components";
import { useStateContext } from "../../context";

const FeaturedCampaigns = () => {
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
      <div className="ml-4 my-4 font-semibold text-[20px]">
        Featured Campaigns: ({featuredCampaigns?.length})
      </div>
      <div
        className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 xl:pr-[-30px] 
    lg:pl-[50px] lg:w-[80vw] md:w-[80vw] sm:ml-[20px] h-full"
      >
        {featuredCampaigns?.map((campaign) => (
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
