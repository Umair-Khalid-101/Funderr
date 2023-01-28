import React from "react";

import { Navbar } from "../components";
import { LoginForm } from "../components/Forms";

const Login = () => {
  return (
    <>
      <Navbar />
      {/* Main Container */}
      <div className="xl:h-[100vh] xl:w-[100vw] md:h-[580px] md:w-[768px] bg-[#fafafa]">
        <LoginForm />
      </div>
      {/* Main Container */}
    </>
  );
};

export default Login;
