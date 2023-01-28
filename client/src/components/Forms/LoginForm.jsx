import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { Login, show, hide } from "../../assets";
import { useStateContext } from "../../context";

const LoginForm = () => {
  const navigate = useNavigate();
  const { logIn } = useStateContext();

  const [showPassword, setShowPassword] = useState(true);

  const formSchema = Yup.object().shape({
    password: Yup.string().required("Password is mandatory"),
    email: Yup.string().email().required("Email is mandatory"),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    logIn(data);
  };

  const handleIcon = () => {
    let selected;
    if (showPassword) {
      selected = hide;
    } else {
      selected = show;
    }
    return selected;
  };

  const handleSetPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Wrapper>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className="flex flex-col justify-end items-end xl:pr-[100px] xl:pt-[80px]
          lg:pr-[80px] lg:pt-[50px] md:pr-[50px] md:pt-[40px] pt-[180px] pr-[60px]"
          >
            {/* Email */}
            <div className="flex flex-col">
              <label
                className="xl:text-[18px] lg:text-[14px] md:text-[12px] font-[500]
              flex items-center"
              >
                Email{<div className="text-red-500 ml-2">*</div>}
              </label>
              <input
                type="email"
                placeholder="john@test.com"
                className={`focus:border focus:border-blue-500 bg-gray-50 border 
                border-gray-300 text-gray-900 rounded-lg h-[35px] 
              xl:w-[300px] lg:w-[200px] lg:text-[12px] md:w-[150px] 
              md:h-[30px] md:text-[10px] p-1 xl:h-[50px] w-[220px] outline-none
              ${errors.email ? "border-red-500" : ""}`}
                {...register("email")}
              />
              <div className="text-red-500 xl:text-[14px] lg:text-[14px] text-[12px]">
                {errors.email?.message}
              </div>
            </div>
            {/* Email */}
            {/* Password */}
            <div className="flex flex-col my-4">
              <label
                className="xl:text-[18px] lg:text-[14px] md:text-[12px] font-[500]
              flex items-center"
              >
                Password{<div className="text-red-500 ml-2">*</div>}
              </label>
              <div className="flex">
                <input
                  type={`${showPassword ? "password" : "text"}`}
                  placeholder="******"
                  className={`focus:border focus:border-blue-500 bg-gray-50 border 
                border-gray-300 text-gray-900 rounded-lg h-[35px] 
                xl:w-[270px] lg:w-[170px] lg:text-[12px] md:w-[120px] 
                md:h-[30px] md:text-[10px] p-1 xl:h-[50px] outline-none
                ${errors.password ? "border-red-500" : ""}`}
                  {...register("password")}
                />
                <div
                  className="cursor-pointer flex items-center"
                  onClick={handleSetPassword}
                >
                  <img src={handleIcon()} alt="show" className="h-8 w-8" />
                </div>
              </div>
              <div className="text-red-500 xl:text-[14px] lg:text-[14px] text-[12px]">
                {errors.password?.message}
              </div>
            </div>
            {/* Password */}
            {/* Button */}
            <div
              className="flex justify-center items-center my-2 xl:mr-[-20px] lg:mr-[-20px]
            md:mr-[-20px] mr-[6px]"
            >
              <button
                className="bg-black text-white rounded-lg xl:w-[250px] xl:h-[40px] 
              hover:bg-[#FFC100] lg:w-[180px] lg:h-[35px] xl:text-[18px] lg:text-[14px]
            hover:text-black md:w-[120px] md:h-[30px] md:text-[12px] md:mr-8 w-[180px] 
            h-[35px] text-[14px] duration-500"
              >
                Login
              </button>
            </div>
            {/* Button */}
          </div>
        </form>
        <div className="flex justify-center items-center">
          <div
            className="text-black my-4 xl:text-[18px] lg:text-[14px] 
            md:text-[12px] text-[14px] xl:ml-[900px] lg:ml-[650px] md:ml-[520px]"
          >
            Not a User?{" "}
            <button
              className="border-none bg-black text-white rounded-lg p-2
              hover:bg-[#FFC100] hover:text-black xl:text-[18px] lg:text-[14px] md:text-[12px] text-[14px] duration-500"
              onClick={() => navigate("/SignUp")}
            >
              SignUp Here
            </button>
          </div>
        </div>
        {/* Form */}
      </Wrapper>
    </>
  );
};

export default LoginForm;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${Login});
`;
