import React from "react";

import { Navbar } from "../components";
import { DonateForm } from "../components/Forms";

const Donate = () => {
  return (
    <>
      <Navbar />
      {/* Main Container */}
      <div className="xl:h-[100vh] xl:w-[100vw] md:h-[580px] md:w-[768px] bg-[#fafafa]">
        <DonateForm />
      </div>
      {/* Main Container */}
    </>
  );
};

export default Donate;
