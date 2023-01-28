import React from "react";

import { Navbar } from "../components";
import { SignUpForm } from "../components/Forms";
import { SignUpImg } from "../assets";

const SignUp = () => {
  return (
    <>
      <Navbar />
      {/* Main Container */}
      <div className="flex flex-col md:flex-row justify-start items-start h-[100vh] w-[100vw]">
        {/* Image */}
        <div className="h-[100vh] w-[100vw] md:w-[50vw]">
          <img src={SignUpImg} alt="signup" className="w-full h-full" />
        </div>
        {/* Image */}

        {/* Form */}
        <div className="h-[100vh] w-[100vw] md:w-[50vw]">
          <SignUpForm />
        </div>
        {/* Form */}
      </div>
      {/* Main Container */}
    </>
  );
};

export default SignUp;
