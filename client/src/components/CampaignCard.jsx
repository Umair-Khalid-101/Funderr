import React from "react";
import { toast } from "react-toastify";

import { verified, favorite, pending, Delete, Featured } from "../assets";
import { useStateContext } from "../context";

const CampaignCard = ({
  imgUrl,
  title,
  userpic,
  username,
  startdate,
  target,
  description,
  handleClick,
  type,
  permission,
  campaign,
  handleDetails,
  handleDelete,
}) => {
  const { user, addToFavorites, userCampaigns, addToFeatured } =
    useStateContext();

  const favAndDelete = () => {
    let selectedIcon;
    if (type === "VerifiedCampaigns") {
      selectedIcon = favorite;
    } else if (type === "MyCampaigns") {
      selectedIcon = Delete;
    } else if (type === "featuredCampaigns") {
      selectedIcon = favorite;
    } else if (type === "Admin-AllCampaigns") {
      selectedIcon = Featured;
    } else if (type === "FeaturedCampaigns") {
      selectedIcon = Delete;
    } else if (type === "categoryCampaigns") {
      return favorite;
    }
    return selectedIcon;
  };

  const handleFav = (id) => {
    // Favorite Campaign
    if (type === "VerifiedCampaigns" || "featuredCampaigns") {
      if (user) {
        campaign.favoritedBy = user._id;
        console.log("Campaign: ", campaign);
        addToFavorites(campaign);
      } else {
        toast.warn("Please Login to Add Campaign to Favorites", {
          position: "top-left",
        });
      }
    } else if (type === "MyCampaigns") {
      // alert("Deleted Campaign");
      let filteredCampaigns = userCampaigns.filter((item) => item._id !== id);
      console.log(filteredCampaigns);
    }
  };

  const handleFeatured = (campaign) => {
    // console.log("HandleFeatured: ", campaign);
    addToFeatured(campaign);
  };

  const showAndHidden = () => {
    if (type === "MyFavCampaigns") {
      return "hidden";
    } else if (type === "ApproveCampaigns") {
      return "hidden";
    } else {
      return "block";
    }
  };

  return (
    <>
      <div
        className={`md:w-[300px] w-[230px] 
        ${type === "MyFavCampaigns" ? "h-[480px]" : "h-[440px]"} 
        rounded-[15px] bg-[#1c1c24] 
        cursor-pointer xl:mb-[40px] lg:mb-[30px]
        md:mb-[20px] mb-[10px] shadow-lg
        hover:bg-[#FFC100] duration-500`}
      >
        <img
          src={imgUrl}
          alt="campaign"
          className="w-full h-[158px] object-contain rounded-[15px] my-[6px] pb-[6px] pt-[16px]"
        />
        {/* UserImage, Title, Username and Days Left */}
        <div className="flex items-center my-[20px] ml-[6px]">
          <img
            src={userpic}
            alt="user"
            className="w-[32px] h-[32px] rounded-full bg-[#919181] m-[10px]"
          />
          <div className="flex flex-col">
            <div className="text-white font-semibold md:text-[16px] text-[14px]">
              {title}
            </div>
            <div className="text-[gray] font-semibold md:text-[12px] text-[12px]">
              {username}
            </div>
          </div>
        </div>
        {/* UserImage, Title, Username and Days Left */}

        {/* StartDate and Verified Icon */}
        <div className="flex items-center">
          <div className="text-white font-medium md:text-[16px] text-[14px] ml-[18px] mb-[10px]">
            {startdate.split("T")[0]}
          </div>
          {permission === "accepted" ? (
            <div className="text-[gray] font-medium md:text-[16px] text-[14px] ml-[20px]">
              <img
                src={verified}
                alt="verified"
                className="w-6 h-6 rounded-full"
              />
            </div>
          ) : (
            <div className="text-[gray] font-medium md:text-[16px] text-[14px] ml-[20px]">
              <img
                src={pending}
                alt="verified"
                className="w-6 h-6 rounded-full"
              />
            </div>
          )}
        </div>
        {/* StartDate and Verified Icon */}

        {/* Target and Raised */}
        <div className="flex justify-between mb-[6px]">
          <div className="text-white md:text-[16px] text-[14px] ml-[18px]">
            Target: {target} ETH
          </div>
        </div>
        {/* Target and Raised */}

        {/* Description */}
        <div className="ml-[18px] text-[gray] pb-[10px] md:text-[16px] text-[14px] overflow-hidden">
          {description.substring(0, 60)}
        </div>
        {/* Description */}

        {/* Icon and Button */}
        <div className="flex justify-between p-4">
          <div
            className=" ml-[6px]"
            onClick={() => {
              if (type === "VerifiedCampaigns") {
                handleFav();
              } else if (type === "featuredCampaigns") {
                handleFav();
              } else if (type === "MyCampaigns") {
                handleDelete();
              } else if (type === "Admin-AllCampaigns") {
                handleFeatured(campaign);
              } else if (type === "FeaturedCampaigns") {
                handleDelete();
              } else if (type === "categoryCampaigns") {
                handleFav();
              }
            }}
          >
            <img
              src={favAndDelete()}
              alt="favorite"
              className={`w-6 h-6 ${showAndHidden()}`}
            />
          </div>
          {type === "VerifiedCampaigns" ? (
            <button
              className="md:w-[120px] w-[100px] border-none text-white ml-[20px] bg-[#818191] 
          rounded-[15px] p-1 hover:bg-[darkgray]"
              onClick={handleClick}
            >
              Details
            </button>
          ) : (
            <></>
          )}
          {type === "MyCampaigns" ? (
            <button
              className="md:w-[120px] w-[100px] border-none text-white ml-[20px] bg-[#818191] 
          rounded-[15px] p-1 hover:bg-[darkgray]"
              onClick={handleClick}
            >
              Edit
            </button>
          ) : (
            <></>
          )}
          {type === "MyFavCampaigns" ? (
            <div className="flex flex-col gap-2 justify-center items-center">
              <button
                className="md:w-[120px] w-[100px] border-none text-white ml-[20px] bg-[#818191] 
          rounded-[15px] p-1 hover:bg-[darkgray]"
                onClick={handleClick}
              >
                Remove Fav
              </button>
              <button
                className="md:w-[120px] w-[100px] border-none text-white ml-[20px] bg-[#818191] 
          rounded-[15px] p-1 hover:bg-[darkgray]"
                onClick={handleDetails}
              >
                Details
              </button>
            </div>
          ) : (
            <></>
          )}
          {type === "featuredCampaigns" ? (
            <button
              className="md:w-[120px] w-[100px] border-none text-white ml-[20px] bg-[#818191] 
          rounded-[15px] p-1 hover:bg-[darkgray]"
              onClick={handleClick}
            >
              Details
            </button>
          ) : (
            <></>
          )}
          {type === "categoryCampaigns" ? (
            <button
              className="md:w-[120px] w-[100px] border-none text-white ml-[20px] bg-[#818191] 
          rounded-[15px] p-1 hover:bg-[darkgray]"
              onClick={handleClick}
            >
              Details
            </button>
          ) : (
            <></>
          )}
          {type === "Admin-AllCampaigns" ? (
            <button
              className="md:w-[120px] w-[100px] border-none text-white ml-[20px] bg-[#818191] 
          rounded-[15px] p-1 hover:bg-[darkgray]"
              onClick={handleClick}
            >
              Details
            </button>
          ) : (
            <></>
          )}
          {type === "ApproveCampaigns" ? (
            <button
              className="md:w-[120px] w-[100px] border-none text-white ml-[20px] bg-[#818191] 
          rounded-[15px] p-1 hover:bg-[darkgray]"
              onClick={handleClick}
            >
              Details
            </button>
          ) : (
            <></>
          )}
          {type === "FeaturedCampaigns" ? (
            <button
              className="md:w-[120px] w-[100px] border-none text-white ml-[20px] bg-[#818191] 
          rounded-[15px] p-1 hover:bg-[darkgray]"
              onClick={handleClick}
            >
              Details
            </button>
          ) : (
            <></>
          )}
        </div>
        {/* Icon and Button */}
      </div>
    </>
  );
};

export default CampaignCard;
