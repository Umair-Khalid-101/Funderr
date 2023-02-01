import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import placeholderImage from "../../assets/react.svg";
import { show, hide } from "../../assets";
import { useStateContext } from "../../context";
import Loader from "../Loader";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { signUp, signUpError } = useStateContext();

  const [showPassword, setShowPassword] = useState(true);
  const [file, setFile] = useState();
  const [picture, setPicture] = useState();
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setPicture(e.target.files[0]);
  }

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is mandatory")
      .min(8, "Password must be at 8 char long"),
    confirmPwd: Yup.string()
      .required("Password is mandatory")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
    name: Yup.string()
      .required("Name is mandatory")
      .min(3, "Name must be 3 characters long."),
    email: Yup.string().email().required("Email is mandatory"),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    console.log("Data: ", data);
    if (!picture) {
      data.role = "user";
      data.picture =
        "http://res.cloudinary.com/dfmhxmauj/image/upload/v1670337910/axqfk5lkxf09qsbhpspr.jpg";
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", data.role);
      formData.append("picture", data.picture);
      setIsLoading(true);
      signUp(formData);
      setIsLoading(false);
    } else if (picture) {
      const uploadedpicture = await handleUpload(picture);
      data.role = "user";
      data.picture = uploadedpicture;
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", data.role);
      formData.append("picture", uploadedpicture);
      console.log(formData.get("name"));
      console.log(formData.get("email"));
      console.log(formData.get("password"));
      console.log(formData.get("role"));
      console.log(formData.get("picture"));
      setIsLoading(true);
      signUp(formData);
      setIsLoading(false);
    }
  };

  const handleUpload = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "funderrWebApp");
    data.append("cloud_name", "dfmhxmauj");
    let uploadedImage;

    await fetch("https://api.cloudinary.com/v1_1/dfmhxmauj/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        uploadedImage = data.url;
        console.log("Picture: ", data.url);
      })
      .catch((err) => console.log(err));

    return uploadedImage;
  };

  const selectedImage = () => {
    let selected;
    if (file) {
      selected = file;
    } else {
      selected = placeholderImage;
    }
    return selected;
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
      {!isLoading && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Main Container */}
            <div className="flex flex-col md:mt-12 md:ml-12 mt-4 ml-8">
              {/* Name and Email */}
              <div className="flex flex-col md:flex-row justify-evenly items-center my-2 md:mr-8 mr-12">
                {/* Name */}
                <div className="flex flex-col">
                  <label
                    className="xl:text-[18px] lg:text-[14px] md:text-[12px] font-[500]
              flex items-center"
                  >
                    Name {<div className="text-red-500 ml-2">*</div>}
                  </label>
                  <input
                    className={`focus:border focus:border-blue-500 bg-gray-50 border border-gray-300 text-gray-900 outline-none
                rounded-lg h-[35px] 
                xl:w-[300px] lg:w-[200px] lg:text-[12px] md:w-[150px] md:h-[30px] md:text-[10px] p-1 xl:h-[50px]
                ${errors.name ? "border-red-500" : ""}`}
                    type="text"
                    placeholder="Jane Doe"
                    {...register("name")}
                  />
                  <div className="text-red-500 xl:text-[14px] lg:text-[14px] text-[12px]">
                    {errors.name?.message}
                  </div>
                </div>
                {/* Name */}

                {/* Email */}
                <div className="flex flex-col md:ml-2">
                  <label
                    className="xl:text-[18px] lg:text-[14px] md:text-[12px] font-[500]
              flex items-center"
                  >
                    Email{<div className="text-red-500 ml-2">*</div>}
                  </label>
                  <input
                    className={`focus:border focus:border-blue-500 bg-gray-50 border 
                border-gray-300 text-gray-900 rounded-lg h-[35px] 
              xl:w-[300px] lg:w-[200px] lg:text-[12px] md:w-[150px] 
              md:h-[30px] md:text-[10px] p-1 xl:h-[50px] outline-none
              ${errors.email ? "border-red-500" : ""}`}
                    type="text"
                    placeholder="Jane@gmail.com"
                    {...register("email")}
                  />
                  <div className="text-red-500 xl:text-[14px] lg:text-[14px] text-[12px]">
                    {errors.email?.message}
                  </div>
                  {signUpError ? (
                    <>
                      <div className="text-red-500 xl:text-[14px] lg:text-[14px] text-[12px]">
                        {signUpError}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                {/* Email */}
              </div>
              {/* Name and Email */}
              {/* Password and Confirm Password */}
              <div className="flex flex-col md:flex-row justify-evenly items-center lg:ml-[10px] md:mr-8 mr-4">
                {/* Password */}
                <div className="flex flex-col my-2">
                  <label
                    className="xl:text-[18px] lg:text-[14px] md:text-[12px] font-[500]
              flex items-center"
                  >
                    Password{<div className="text-red-500 ml-2">*</div>}
                  </label>
                  <div className="flex">
                    <input
                      type={`${showPassword ? "password" : "text"}`}
                      className={`focus:border focus:border-blue-500 
                bg-gray-50 border border-gray-300 text-gray-900 
                rounded-lg h-[35px] xl:w-[270px] lg:w-[200px] lg:text-[12px] 
                md:w-[150px] md:h-[30px] md:text-[10px] p-1 xl:h-[50px] outline-none
                ${errors.password ? "border-red-500" : ""}`}
                      placeholder="******"
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
                {/* Confirm Password */}
                <div className="flex flex-col md:ml-2">
                  <label
                    className="xl:text-[18px] lg:text-[14px] md:text-[12px] font-[500]
              flex items-center"
                  >
                    Confirm Password{<div className="text-red-500 ml-2">*</div>}
                  </label>
                  <div className="flex">
                    <input
                      type={`${showPassword ? "password" : "text"}`}
                      className={`focus:border focus:border-blue-500 
                bg-gray-50 border border-gray-300 text-gray-900 
                rounded-lg h-[35px] xl:w-[270px] lg:w-[200px] lg:text-[12px] 
                md:w-[150px] md:h-[30px] md:text-[10px] p-1 xl:h-[50px] outline-none
                ${errors.confirmPwd ? "border-red-500" : ""}`}
                      placeholder="******"
                      {...register("confirmPwd")}
                    />
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={handleSetPassword}
                    >
                      <img src={handleIcon()} alt="show" className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="text-red-500 xl:text-[14px] lg:text-[14px] text-[12px]">
                    {errors.confirmPwd?.message}
                  </div>
                </div>
                {/* Confirm Password */}
              </div>
              {/* Password and Confirm Password */}
              {/* Profile Picture */}
              <div className="flex justify-center items-center my-2 md:mr-0 mr-12">
                <div className="flex flex-col xl:mr-[200px] lg:mr-[70px]">
                  <label className="xl:text-[18px] lg:text-[14px] md:text-[12px] font-[500] my-2">
                    Profile Picture
                  </label>
                  <div className="flex items-center space-x-6">
                    <div className="shrink-0">
                      <img
                        className="xl:h-16 xl:w-16 lg:h-16 lg:w-16 md:h-12 md:w-12 
                    h-12 w-12 object-cover rounded-full"
                        src={selectedImage()}
                      />
                    </div>
                    <label className="block">
                      <input
                        type="file"
                        className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-black file:text-white
      hover:file:bg-[#FFC100] file:cursor-pointer
      file:hover:text-black file:md:p-2 file:md:text-[12px] text-[10px] duration-500
    "
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
              {/* Profile Picture */}
              {/* Button */}
              <div className="flex justify-center items-center my-2 mr-12">
                <button
                  className="bg-black text-white rounded-lg xl:w-[300px] xl:h-[40px] 
              hover:bg-[#FFC100] lg:w-[230px] lg:h-[40px] xl:text-[18px] lg:text-[14px]
            hover:text-black md:w-[180px] md:h-[35px] md:text-[12px] md:mr-8 w-[180px] h-[35px] text-[14px] duration-500"
                  type="submit"
                >
                  SignUp
                </button>
              </div>
              {/* Button */}
            </div>
            {/* Main Container */}
          </form>
          <div className="flex justify-center items-center">
            <div className="text-black my-4 xl:text-[18px] lg:text-[14px] md:text-[12px] text-[14px] md:mr-8 mr-12">
              Already a User?{" "}
              <button
                className="border-none bg-black text-white rounded-lg p-2
              hover:bg-[#FFC100] hover:text-black xl:text-[18px] lg:text-[14px] md:text-[12px] text-[14px] duration-500"
                onClick={() => navigate("/Login")}
              >
                Login Here
              </button>
            </div>
          </div>
        </>
      )}
      {isLoading && <Loader type="SignUp" />}
    </>
  );
};

export default SignUpForm;
