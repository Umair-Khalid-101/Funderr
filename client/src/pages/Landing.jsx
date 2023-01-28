import React, { useEffect } from "react";
import {
  Navbar,
  Hero,
  Featured,
  Categories,
  HowItWorks,
  AboutUs,
  Footer,
} from "../components";

import { useStateContext } from "../context";

const Landing = () => {
  const { featuredCampaigns, getFeaturedCampaigns } = useStateContext();
  useEffect(() => {
    getFeaturedCampaigns();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      {featuredCampaigns ? <Featured /> : <></>}
      <Categories />
      <HowItWorks />
      <AboutUs />
      <Footer />
    </>
  );
};

export default Landing;
