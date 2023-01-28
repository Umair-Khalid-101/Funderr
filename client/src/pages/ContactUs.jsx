import React from "react";
import { Navbar } from "../components";

import { ContactUsImg } from "../assets";
import { ContactForm } from "../components/Forms";

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div
        className="flex flex-col xl:flex-row lg:flex-row md:flex-row justify-evenly
      items-center h-[100vh] w-[100vw] shadow-xl"
      >
        <div
          className="flex flex-col xl:flex-row lg:flex-row md:flex-row justify-evenly items-center relative
        xl:h-[600px] xl:w-[1200px] md:w-[800px] h-[600px] w-[300px]"
        >
          {/* Form */}
          <div
            className="xl:h-[600px] xl:w-[400px] lg:h-[400px] lg:w-[400px] md:w-[300px] 
          h-[350px] flex justify-center items-center"
          >
            <ContactForm />
          </div>
          {/* Form */}

          {/* Image */}
          <div
            className="xl:h-[600px] xl:w-[800px] lg:h-[400px] lg:w-[500px] 
          md:w-[350px] md:h-[250px] h-[200px] flex justify-center items-center"
          >
            <img
              src={ContactUsImg}
              alt="ContactUsImg"
              className="h-full w-full"
            />
          </div>
          {/* Image */}
        </div>
      </div>
    </>
  );
};

export default ContactUs;
