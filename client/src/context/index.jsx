import React, { useContext, createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StateContext = createContext();

const BaseUrl = "http://localhost:3001/funderr";
let Usertoken;

export const StateContextProvider = ({ children }) => {
  // NAVIGATOR
  const navigate = useNavigate();

  // STATES
  const [allCampaigns, setAllCampaigns] = useState();
  const [verifiedCampaigns, setVerifiedCampaigns] = useState();
  const [userCampaigns, setUserCampaigns] = useState();
  const [userfavCampaigns, setUserFavCampaigns] = useState();
  const [userNotifications, setUserNotifications] = useState();
  const [featuredCampaigns, setFeaturedCampaigns] = useState();
  const [categoryCampaigns, setCategoryCampaigns] = useState();
  const [pendingCampaigns, setPendingCampaigns] = useState();
  const [campaignDonations, setCampaignDonations] = useState();
  const [allUsers, setAllUsers] = useState();
  const [signUpError, setSignUpError] = useState();
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [progress, setProgress] = useState();

  // FUNCTIONS

  // 1- SIGN UP
  const signUp = async (formData) => {
    await axios
      .post(`${BaseUrl}/register`, formData)
      .then((response) => console.log(response.data))
      .then(() => {
        toast.success("Signed Up Successfully", {
          position: "top-left",
        });
        setTimeout(() => {
          navigate("/Login");
        }, 1000);
      })
      .catch((error) => {
        toast.error("Failed to SignUp", {
          position: "top-left",
        });
        console.log(error);
        setSignUpError(error.response.data.message);
      });
  };

  // 2- LOG IN
  const logIn = async (data) => {
    await axios
      .post(`${BaseUrl}/auth`, data)
      .then((result) => {
        Usertoken = result.data;
        setToken(Usertoken);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Wrong Email or Password", {
          position: toast.POSITION.TOP_LEFT,
        });
        return;
      });
    await axios
      .get(`${BaseUrl}/currentuser`, {
        headers: {
          "x-auth-token": Usertoken,
        },
      })
      .then((result) => {
        toast.success("Logged In Successfully!", {
          position: "top-left",
        });
        const newUser = result.data;
        setUser(newUser);
        setTimeout(() => {
          newUser.role === "admin"
            ? navigate("/AdminDashboard/admin-allcampaign", { replace: true })
            : navigate("/UserDashboard/allcampaigns", { replace: true });
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  };

  // 3- LOG OUT
  const logOut = async () => {
    setUser(null);
    setToken(null);
    navigate("/login");
    window.location.reload(true);
  };

  // 4- VERIFIED CAMPAIGNS
  const getVerifiedCampaigns = async () => {
    const res = await axios.get(`${BaseUrl}/verifiedposts`).catch((err) => {
      console.log(err);
    });
    const data = await res.data;
    return data;
  };

  // 5- USER CAMPAIGNS
  const getUserCampaigns = async () => {
    const res = await axios
      .get(`${BaseUrl}/userposts`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  // 6- USERFAVORITECAMPAIGNS
  const getUserFavCampaigns = async () => {
    const res = await axios
      .get(`${BaseUrl}/userfavposts`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  // 7- CREATE CAMPAIGNS
  const createCampaign = async (formData) => {
    await axios
      .post(`${BaseUrl}/newpost`, formData, {
        onUploadProgress: (data) => {
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      })
      .then((response) => {
        console.log(response);
      })
      .then(() => {
        toast.success("New Campaign Created!", {
          position: "top-left",
        });
        setTimeout(() => {
          navigate("/UserDashboard/AllCampaigns");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!", {
          position: "top-left",
        });
      });
  };

  // 8- EDIT/UPDATE CAMPAIGNS
  const editCampaign = async (formData, id) => {
    await axios
      .patch(`${BaseUrl}/editpost/${id}`, formData)
      .then((response) => {
        console.log(response.data);
        toast.success("Campaign Updated!", {
          position: "top-left",
        });
      })
      .then(() => {
        navigate("/UserDashboard/mycampaigns");
      });
  };

  // 9- ADD CAMPAIGN TO FAVORITES
  const addToFavorites = async (data) => {
    if (user) {
      await axios.post(`${BaseUrl}/addfavorite`, data).then(() => {
        toast.success("Campaign Added to Favorites", {
          position: "top-left",
        });
      });
    } else {
      toast.error("Please Login to Add Campaign to Favorites", {
        position: "top-left",
      });
    }
  };

  // 10- REMOVE FROM FAVORITES
  const deleteFromFavs = async (id) => {
    await axios.delete(`${BaseUrl}/deletefromfav/${id}`).then((res) => {
      console.log(res.data);
      toast.success("Deleted From Favorites", {
        position: "top-left",
      });
    });
  };

  // 11- DELETE CAMPAIGN
  const deleteCampaign = async (id) => {
    await axios
      .delete(`${BaseUrl}/deletepost/${id}`)
      .then((response) => {
        console.log(response);
        toast.success("Campaign Deleted!", {
          position: "top-left",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 12- UPDATE PROFILE
  const updateProfile = async (data, id) => {
    await axios
      .patch(`${BaseUrl}/updateprofile/${id}`, data)
      .then((res) => {
        setUser(res.data);
      })
      .then(() => {
        toast.success("Saved Changes", {
          position: "top-left",
        });
        setTimeout(() => {
          if (user.role === "user") {
            navigate("/UserDashboard/profile");
          } else {
            navigate("/AdminDashboard/admin-profile");
          }
        }, 1000);
      });
  };

  // 13- PUSH NOTIFICATION(CAMPAIGN CREATION)
  const sendNotification = async (data, id) => {
    let message = `You created a new campaign: ${data.title}`;
    let status = "unread";
    let user = id;
    const notification = {
      message,
      status,
      user,
    };
    // console.log("Notification: ", notification);
    await axios
      .post(`${BaseUrl}/pushNotification`, notification)
      .then((response) => {
        console.log(response);
      });
  };

  // 14- GET USER NOTIFICATIONS
  const getUserNotifications = async () => {
    await axios
      .get(`${BaseUrl}/usernotifications`, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        const notifications = res.data;
        setUserNotifications(notifications);
      });
  };

  // 15- MARK NOTIFICATION AS READ
  const markAsRead = async (id) => {
    await axios
      .patch(`${BaseUrl}/markasread/${id}`)
      .then(() => {
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 16- GET FEATURED CAMPAIGNS
  const getFeaturedCampaigns = async () => {
    await axios
      .get(`${BaseUrl}/featuredposts`)
      .then((res) => {
        setFeaturedCampaigns(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 17- CAMPAIGNS BY CATEGORY
  const byCategory = async (category) => {
    await axios.get(`${BaseUrl}/categoryPost/${category}`).then((res) => {
      setCategoryCampaigns(res.data);
    });
  };

  // 18- GET ALL CAMPAIGNS (ADMIN)
  const getAllCampaigns = async () => {
    axios.get(`${BaseUrl}/allposts`).then((result) => {
      const data = result.data;
      setAllCampaigns(data);
    });
  };

  // 19- ADD CAMPAIGNS TO FEATURED (ADMIN)
  const addToFeatured = (campaign) => {
    axios.post(`${BaseUrl}/addfeatured`, campaign).then((res) => {
      // console.log(res);
      toast.success("Added To Featured!", {
        position: "top-left",
      });
    });
  };

  // 20- GET ALL USERS (ADMIN)
  const getAllUsers = async () => {
    axios.get(`${BaseUrl}/allusers`).then((result) => {
      setAllUsers(result.data);
    });
  };

  // 21- DELETE USERS (ADMIN)
  const deleteUser = async (id) => {
    await axios
      .delete(`${BaseUrl}/deleteuser/${id}`)
      .then(() => {
        toast.success("User Deleted!", {
          position: "top-left",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 22- GET PENDING CAMPAIGNS (ADMIN)
  const getPendingCampaigns = () => {
    axios.get(`${BaseUrl}/pendingposts`).then((result) => {
      setPendingCampaigns(result.data);
    });
  };

  // 23- APPROVE CAMPAIGNS (ADMIN)
  const approveCampaign = async (id) => {
    await axios
      .get(`${BaseUrl}/acceptcampaign/${id}`)
      .then(() => {
        toast.success("Campaign Approved", {
          position: "top-left",
        });
      })
      .then(() => {
        setTimeout(() => {
          navigate("/AdminDashboard/approve-campaigns");
        }, 2000);
      });
  };

  // 24- REMOVE CAMPAIGN FROM FEATURED (ADMIN)
  const removeFeatured = async (id) => {
    await axios.delete(`${BaseUrl}/deletefeatured/${id}`).then(() => {
      toast.success("Removed from Featured", {
        position: "top-left",
      });
    });
  };

  // 25- SEND APPROVAL NOTIFICATION (ADMIN)
  const sendApprovalNotification = async (data) => {
    let message = `Your Campaign ${data.title} has been approved. You can now receive donations from your Campaign.`;
    let status = "unread";
    let user = data.postedBy;
    const notification = {
      message,
      status,
      user,
    };
    console.log("Notification: ", notification);
    await axios
      .post(`${BaseUrl}/approvalNotification`, notification)
      .then((response) => {
        console.log(response);
      });
  };

  // 26- ADD DONATION
  const addDonation = async (data) => {
    await axios.post(`${BaseUrl}/adddonation`, data).then((res) => {
      console.log(res);
    });
  };

  // 27- GET DONATIONS
  const getCampaignDonations = async (id) => {
    await axios
      .get(`${BaseUrl}/campaigndonations/${id}`)
      .then((res) => {
        const donations = res.data;
        setCampaignDonations(donations);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <StateContext.Provider
      value={{
        allCampaigns,
        setAllCampaigns,
        getAllCampaigns,
        signUp,
        signUpError,
        logIn,
        token,
        user,
        logOut,
        verifiedCampaigns,
        setVerifiedCampaigns,
        getVerifiedCampaigns,
        userCampaigns,
        setUserCampaigns,
        getUserCampaigns,
        userfavCampaigns,
        setUserFavCampaigns,
        getUserFavCampaigns,
        createCampaign,
        progress,
        editCampaign,
        addToFavorites,
        deleteFromFavs,
        deleteCampaign,
        updateProfile,
        sendNotification,
        getUserNotifications,
        userNotifications,
        setUserNotifications,
        markAsRead,
        featuredCampaigns,
        setFeaturedCampaigns,
        getFeaturedCampaigns,
        categoryCampaigns,
        setCategoryCampaigns,
        byCategory,
        addToFeatured,
        allUsers,
        setAllUsers,
        getAllUsers,
        deleteUser,
        pendingCampaigns,
        setPendingCampaigns,
        getPendingCampaigns,
        approveCampaign,
        removeFeatured,
        sendApprovalNotification,
        addDonation,
        campaignDonations,
        setCampaignDonations,
        getCampaignDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
