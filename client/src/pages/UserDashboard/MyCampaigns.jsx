import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useStateContext } from "../../context";
import { CampaignCard, Loader } from "../../components";

const MyCampaigns = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setUserCampaigns, getUserCampaigns, userCampaigns, deleteCampaign } =
    useStateContext();

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    deleteCampaign(id);
    let filteredCampaigns = userCampaigns.filter((item) => item._id !== id);
    console.log("FILTERED: ", filteredCampaigns);
    setUserCampaigns(filteredCampaigns);
  };

  const handleNavigate = (campaign) => {
    navigate(`/EditCampaign/${campaign.title}`, { state: campaign });
  };

  // console.log("Currently logged Users Posts: ", userCampaigns);
  useEffect(() => {
    setIsLoading(true);
    getUserCampaigns().then((posts) => {
      setUserCampaigns(posts.userposts);
      setIsLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="xl:min-w-[90vw] lg:min-w-[85vw] md:min-w-[80vw] min-w-[75vw]">
          <Loader type="My Campaigns" />
        </div>
      </>
    );
  }

  if (userCampaigns.length === 0) {
    return (
      <>
        <div
          className="min-h-screen xl:min-w-[90vw] lg:min-w-[85vw] md:min-w-[80vw] min-w-[75vw]
        flex justify-center items-center"
        >
          <div className="flex-col items-center justify-center">
            <div className="text-black font-semibold text-[20px]">
              You haven't created any campaigns!!! Create some and come back!!
            </div>
            <button
              className="border-none bg-[#ffc100] font-semibold text-black
          rounded-xl w-[200px] h-[45px] hover:bg-black hover:text-white duration-500"
              onClick={() => navigate("/UserDashboard/create-campaign")}
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
      <div className="text-[18px] font-epilogue xl:w-[90vw] lg:w-[85vw] md:w-[80vw] w-[75vw] my-[20px]">
        My Campaigns ({userCampaigns.length})
      </div>
      <div
        className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 xl:pr-[-30px] 
    lg:pl-[50px] lg:w-[80vw] md:w-[80vw] sm:ml-[20px] h-full"
      >
        {userCampaigns.map((campaign) => (
          <div key={Math.random()} className="md:w-[300px] md:pl-[20px]">
            <CampaignCard
              imgUrl={campaign.picture}
              title={campaign.title}
              userpic={campaign.posterPic}
              username={campaign.posterName}
              startdate={campaign.startdate}
              target={campaign.campaignGoal}
              description={campaign.description}
              type="MyCampaigns"
              handleClick={() => handleNavigate(campaign)}
              handleDelete={() => handleDelete(campaign._id)}
              permission={campaign.permission}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MyCampaigns;
