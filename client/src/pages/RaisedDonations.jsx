import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { Loader } from "../components";
import { CampaignDetails } from "../pages";

const RaisedDonations = () => {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [campaignDonations, setcampaignDonations] = useState();
  const ReqUrl = `http://localhost:3001/funderr/campaigndonations/${
    state.campaignId ? state.campaignId : state._id
  }`;
  // console.log("ReqURL: ", ReqUrl);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(ReqUrl)
      .then((res) => {
        setcampaignDonations(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // {
  //   campaignDonations ? console.log("Donations: ", campaignDonations) : "";
  // }

  if (isLoading) {
    return <Loader type="Campaign Details" />;
  }
  return (
    <>
      {campaignDonations ? (
        <CampaignDetails campaignDonations={campaignDonations} />
      ) : (
        ""
      )}
    </>
  );
};

export default RaisedDonations;
