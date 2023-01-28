import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import parse from "date-fns/parse";
import { ethers } from "ethers";
import { toast } from "react-toastify";

import { categories } from "../../constants";
import placeholderImage from "../../assets/react.svg";
import { CreateCampaigns, money } from "../../assets";
import { useStateContext } from "../../context";
import { Loader } from "../../components";

const defaultCampaignPic =
  "https://res.cloudinary.com/dfmhxmauj/image/upload/v1674584026/funderrWeb/oexyr711s4salq3ioer8.svg";

const CreateCampaignForm = () => {
  const { user, createCampaign, sendNotification } = useStateContext();

  let startdate = new Date().toISOString().slice(0, 10);

  const [file, setFile] = useState(null);
  const [picture, setPicture] = useState(null);

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setPicture(e.target.files[0]);
  }

  const formSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is mandatory")
      .min(5, "Title must be at 5 characters long"),
    walletAddress: Yup.string().required("Wallet Address is mandatory"),

    campaignGoal: Yup.number()
      .min(1)
      .typeError("Campaign Goal is mandatory. It must be a number")
      .required("Campaign Goal is mandatory"),

    description: Yup.string().required("Description is mandatory"),
    category: Yup.string().required("Category is mandatory"),
    enddate: Yup.date()
      .transform(function (value, originalValue) {
        if (this.isType(value)) {
          return value;
        }
        const result = parse(originalValue, "dd.MM.yyyy", new Date());
        return result;
      })
      .typeError("End date is mandatory. Please enter a valid date.")
      .min(startdate, "Date is invalid"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

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

  const onSubmit = async (data) => {
    toast.info("Creating Campaign.Please Wait", {
      position: "top-left",
      autoClose: 10000,
    });
    data.permission = "pending";
    data.startdate = startdate;
    data.posterPic = user.picture;
    data.postedBy = user._id;
    data.posterName = user.name;
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("enddate", data.enddate);
    formData.append("startdate", data.startdate);
    formData.append("campaignGoal", data.campaignGoal);
    formData.append("postedBy", data.postedBy);
    formData.append("posterName", data.posterName);
    formData.append("walletAddress", data.walletAddress);
    formData.append("permission", data.permission);
    formData.append("category", data.category);
    formData.append("posterPic", data.posterPic);
    if (!picture) {
      data.picture = defaultCampaignPic;
      formData.append("picture", data.picture);
      if (ethers.utils.isAddress(data.walletAddress)) {
        createCampaign(formData);
        sendNotification(data, user._id);
      } else {
        toast.error("Invalid Wallet Address", {
          position: "top-left",
        });
      }
    }
    if (picture) {
      const uploadedpicture = await handleUpload(picture);
      data.picture = uploadedpicture;
      formData.append("picture", data.picture);
      if (ethers.utils.isAddress(data.walletAddress)) {
        createCampaign(formData);
        sendNotification(data, user._id);
      } else {
        toast.error("Invalid Wallet Address", {
          position: "top-left",
        });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Main Container */}
        <div className="flex flex-col justify-center items-center h-full">
          {/* Picture */}
          <div className="xl:mt-[10px]">
            <img
              src={CreateCampaigns}
              alt="Create"
              className="xl:w-[600px] xl:h-[400px] lg:w-[500px] lg:h-[300px] md:w-[500px]
              md:h-[300px] w-[200px] h-[200px] md:mr-0 sm:mr-6
              hover:scale-110 transition duration-500 ease-in-out cursor-pointer "
            />
          </div>
          {/* Picture */}
          {/* Title and End Date */}
          <div className="flex md:flex-row flex-col justify-center items-center">
            <div className="flex flex-col">
              <label className="flex font-semibold mb-2">
                Title{<div className="text-red-500 ml-2">*</div>}
              </label>
              <input
                type="text"
                className={`border border-gray-300 bg-gray-50 rounded-lg p-2 
                xl:mr-8 xl:w-[500px] xl:h-[50px] lg:mr-8 lg:w-[400px] lg:h-[50px]
                md:w-[300px] md:mr-4 w-[200px]
                ${
                  errors.title ? "border-red-600" : ""
                } outline-none focus:border-blue-500`}
                placeholder="Title"
                {...register("title")}
              />
              <div className="text-red-500 xl:text-[14px] lg:text-[14px] text-[12px]">
                {errors.title?.message}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="flex font-semibold mb-2">
                End Date{<div className="text-red-500 ml-2">*</div>}
              </label>
              <input
                type="date"
                className={`border border-gray-300 bg-gray-50 rounded-lg p-2
                xl:w-[500px] xl:h-[50px] lg:w-[400px] md:w-[300px] w-[200px]
                ${
                  errors.enddate ? "border-red-600" : ""
                } outline-none focus:border-blue-500`}
                {...register("enddate")}
              />
              <div className="text-red-500 xl:text-[14px] lg:text-[14px] text-[12px]">
                {errors.enddate?.message}
              </div>
            </div>
          </div>
          {/* Title and End Date */}

          {/* WalletAdress and Campaign Goal */}
          <div className="flex md:flex-row flex-col justify-center items-center md:mt-4">
            <div className="flex flex-col">
              <label className="flex font-semibold mb-2">
                Wallet Address{<div className="text-red-500 ml-2">*</div>}
              </label>
              <input
                type="text"
                className={`border border-gray-300 bg-gray-50 rounded-lg p-2
                xl:w-[500px] xl:h-[50px] lg:mr-[30px] lg:w-[400px]
                md:w-[300px] md:mr-4
                ${
                  errors.walletAddress ? "border-red-600" : ""
                } outline-none focus:border-blue-500`}
                placeholder="0x2854C32Bb7e003C15126197F3D9Fd3cd826d99D4"
                {...register("walletAddress")}
              />
              <div className="text-red-500 xl:text-[14px] lg:text-[14px] text-[12px]">
                {errors.walletAddress?.message}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="flex font-semibold mb-2">
                Campaign Goal{<div className="text-red-500 ml-2">*</div>}
              </label>
              <input
                type="number"
                className={`border border-gray-300 bg-gray-50 rounded-lg p-2 
                xl:w-[500px] xl:h-[50px] lg:w-[400px] md:w-[300px]
                ${
                  errors.campaignGoal ? "border-red-600" : ""
                } outline-none focus:border-blue-500`}
                placeholder="1"
                {...register("campaignGoal")}
              />
              <div className="text-red-500 xl:text-[14px] lg:text-[14px] text-[12px]">
                {errors.campaignGoal?.message}
              </div>
            </div>
          </div>
          {/* WalletAdress and Campaign Goal */}

          {/* Banner */}
          <div
            className="xl:w-[1040px] flex justify-start items-center p-4
           bg-[#FFC100] xl:h-[100px] rounded-[10px] lg:mt-[20px] lg:h-[70px]
           lg:w-[830px] md:w-[620px] md:mt-[30px] my-[20px] w-[200px]"
          >
            <img
              src={money}
              alt="money"
              className="w-[40px] h-[40px] object-contain"
            />
            <h4 className="font-epilogue font-bold text-[18px] md:text-[25px] text-white ml-[20px]">
              You will get 100% of the raised amount
            </h4>
          </div>
          {/* Banner */}

          {/* Categories */}
          <div className="flex flex-col md:mt-4">
            <label className="flex font-semibold mb-2">
              Category{<div className="text-red-500 ml-2">*</div>}
            </label>
            <select
              className={`border border-gray-300 bg-gray-50 rounded-lg p-2 
              xl:w-[500px] xl:h-[50px] lg:w-[400px] md:w-[300px] w-[200px]
              ${
                errors.category ? "border-red-600" : ""
              } outline-none focus:border-blue-500`}
              placeholder="Art"
              {...register("category")}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="text-red-500 xl:text-[14px] lg:text-[14px] text-[12px]">
              {errors.category?.message}
            </div>
          </div>
          {/* Categories */}

          {/* Campaign Picture */}
          <div className="flex justify-center items-center md:mt-4 my-4">
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Campaign Picture</label>
              <div className="flex">
                <div className="shrink-0">
                  <img
                    className="xl:h-32 xl:w-32 lg:h-24 lg:w-24 md:h-24 md:w-24 h-12 w-12 
                    object-cover rounded-full md:mr-4 xl:mt-[10px]"
                    src={selectedImage()}
                  />
                </div>
                <label>
                  <input
                    type="file"
                    className="xl:w-[630px] lg:w-[500px] md:w-[400px] w-[200px]
                    text-sm text-slate-500
                    md:file:mr-4 md:file:py-4 md:file:px-4
                    file:py-2 file:px-2 mr-2
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                  file:bg-black file:text-white
                  hover:file:bg-[#FFC100] file:cursor-pointer
                  file:hover:text-black file:md:p-2 file:md:text-[12px] text-[10px] duration-500
                  md:file:w-[200px] file:w-[100px] lg:file:mt-12 md:file:mt-8
    "
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </div>
          {/* Campaign Picture */}

          {/* Description */}
          <div className="flex flex-col md:mt-4">
            <label className="flex font-semibold mb-2">
              Description{<div className="text-red-500 ml-2">*</div>}
            </label>
            <textarea
              type="text"
              className={`border border-gray-300 bg-gray-50 rounded-lg p-2 sm:min-w-[300px]
              xl:w-[1000px] lg:w-[830px] md:w-[630px] w-[200px]
              ${
                errors.description ? "border-red-600" : ""
              } outline-none focus:border-blue-500`}
              rows={10}
              placeholder={"Description or Story of your project"}
              {...register("description")}
            />
            <div className="text-red-500 xl:text-[14px] lg:text-[14px] text-[12px]">
              {errors.description?.message}
            </div>
          </div>
          {/* Description */}

          {/* Submit Button */}
          <div className="flex justify-center items-center md:mt-4">
            <button
              className="border border-gray-300 bg-black text-white
            rounded-lg p-2 md:mb-[50px] md:mt-[15px] xl:w-[500px] lg:h-[50px]
            hover:bg-[#FFC100] hover:text-black duration-500 font-semibold
            lg:w-[400px] md:w-[300px] w-[200px] mt-4 mb-8"
              type="submit"
            >
              Create Campaign
            </button>
          </div>
          {/* Submit Button */}
        </div>
        {/* Main Container */}
      </form>
    </>
  );
};

export default CreateCampaignForm;
