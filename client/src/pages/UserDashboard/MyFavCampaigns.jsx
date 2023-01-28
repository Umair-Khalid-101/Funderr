import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useStateContext } from "../../context";
import { CampaignCard, Loader } from "../../components";

const MyFavCampaigns = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const {
    userfavCampaigns,
    setUserFavCampaigns,
    getUserFavCampaigns,
    deleteFromFavs,
  } = useStateContext();

  const handleUnFavorite = async (id) => {
    // alert(id);
    deleteFromFavs(id);
    let filteredCampaigns = userfavCampaigns.filter((item) => item._id !== id);
    // console.log("FILTERED", filteredCampaigns);
    setUserFavCampaigns(filteredCampaigns);
  };

  const handleNavigate = (campaign) => {
    navigate(`/Details/${campaign.title}`, { state: campaign });
  };

  useEffect(() => {
    setIsLoading(true);
    getUserFavCampaigns().then((posts) => {
      setUserFavCampaigns(posts.userFavPosts);
      setIsLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="xl:min-w-[90vw] lg:min-w-[85vw] md:min-w-[80vw] min-w-[75vw]">
          <Loader type="Fav Campaigns" />
        </div>
      </>
    );
  }

  if (userfavCampaigns.length === 0) {
    return (
      <>
        <div
          className="min-h-screen xl:min-w-[90vw] lg:min-w-[85vw] md:min-w-[80vw] min-w-[75vw]
        flex justify-center items-center"
        >
          <div className="flex-col items-center justify-center">
            <div className="text-black font-semibold text-[20px]">
              You haven't Favorited any campaigns!!! Favorite some and come
              back!!
            </div>
            <button
              className="border-none bg-[#ffc100] font-semibold text-black
          rounded-xl w-[300px] h-[45px] hover:bg-black hover:text-white duration-500"
              onClick={() => navigate("/UserDashboard/allcampaigns")}
            >
              Add to Favorite Campaigns
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="text-[18px] font-epilogue xl:w-[90vw] lg:w-[85vw] md:w-[80vw] w-[75vw] my-[20px]">
        My Fav Campaigns ({userfavCampaigns.length})
      </div>
      <div
        className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 xl:pr-[-30px] 
    lg:pl-[50px] lg:w-[80vw] md:w-[80vw] sm:ml-[20px] h-full"
      >
        {userfavCampaigns.map((campaign) => (
          <div key={Math.random()} className="md:w-[300px] md:pl-[20px]">
            <CampaignCard
              imgUrl={campaign.picture}
              title={campaign.title}
              userpic={campaign.posterPic}
              username={campaign.name}
              startdate={campaign.startdate}
              target={campaign.campaignGoal}
              description={campaign.description}
              type="MyFavCampaigns"
              handleClick={() => handleUnFavorite(campaign._id)}
              handleDetails={() => handleNavigate(campaign)}
              permission={campaign.permission}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MyFavCampaigns;
