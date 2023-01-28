import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Navbar, CampaignCard, Loader } from "../components";
import { useStateContext } from "../context";

const ByCategory = () => {
  const navigate = useNavigate();
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

  return (
    <>
      <Navbar />
      {categoryCampaigns ? (
        <>
          <div className="mt-4 ml-4 mb-4 font-semibold text-[20px]">{`${category} Campaigns: ${categoryCampaigns.length}`}</div>
          <div
            className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2
      grid-cols-1 gap-4 place-content-center place-items-center mt-4"
          >
            {categoryCampaigns.map((campaign) => (
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
