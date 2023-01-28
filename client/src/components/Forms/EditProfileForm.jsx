import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Editing } from "../../assets";
import { useStateContext } from "../../context";

const useYupValidationResolver = (formSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await formSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [formSchema]
  );

const formSchema = Yup.object().shape({
  name: Yup.string().required("Name Cannot be empty"),
  email: Yup.string().email().required("Email is mandatory"),
});

const EditProfileForm = () => {
  const resolver = useYupValidationResolver(formSchema);
  const { user, updateProfile } = useStateContext();
  const [file, setFile] = useState(null);
  const [picture, setPicture] = useState(null);

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setPicture(e.target.files[0]);
  }

  const initialValues = {
    name: user.name,
    email: user.email,
  };

  const { register, handleSubmit, formState } = useForm({
    resolver,
    defaultValues: initialValues,
  });
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
      selected = user.picture;
    }
    return selected;
  };

  const onSubmit = async (data) => {
    if (!file) {
      data.picture = user.picture;
      // console.log("Data(No Pic): ", data);
      updateProfile(data, user._id);
    } else {
      const uploadedpicture = await handleUpload(picture);
      data.picture = uploadedpicture;
      // console.log("Data(Pic): ", data);
      updateProfile(data, user._id);
    }
  };

  return (
    <>
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Main Container */}
          <div className="flex flex-col justify-center items-center h-full mt-8">
            {/* Picture */}
            <div className="xl:mt-[10px]">
              <img
                src={Editing}
                alt="Create"
                className="xl:w-[600px] xl:h-[400px] lg:w-[500px] lg:h-[300px] md:w-[500px]
              md:h-[300px] w-[200px] h-[200px] md:mr-0 sm:mr-6
              hover:scale-110 transition duration-500 ease-in-out cursor-pointer "
              />
            </div>
            {/* Picture */}

            {/* Name and Email */}
            <div className="flex md:flex-row flex-col justify-center items-center">
              <div className="flex flex-col">
                <label className="flex font-semibold mb-2">
                  Name{<div className="text-red-500 ml-2">*</div>}
                </label>
                <input
                  type="text"
                  className={`border border-gray-300 bg-gray-50 rounded-lg p-2 
                xl:mr-8 xl:w-[500px] xl:h-[50px] lg:mr-8 lg:w-[400px] lg:h-[50px]
                md:w-[300px] md:mr-4 w-[200px]
                ${
                  errors.name ? "border-red-600" : ""
                } outline-none focus:border-blue-500`}
                  {...register("name")}
                />
                <div className="text-red-500 xl:text-[14px] lg:text-[14px] text-[12px]">
                  {errors.name?.message}
                </div>
              </div>
              <div className="flex flex-col">
                <label className="flex font-semibold mb-2">
                  Email{<div className="text-red-500 ml-2">*</div>}
                </label>
                <input
                  type="text"
                  className={`border border-gray-300 bg-gray-50 rounded-lg p-2
                xl:w-[500px] xl:h-[50px] lg:w-[400px] md:w-[300px] w-[200px]
                ${
                  errors.email ? "border-red-600" : ""
                } outline-none focus:border-blue-500`}
                  {...register("email")}
                />
                <div className="text-red-500 xl:text-[14px] lg:text-[14px] text-[12px]">
                  {errors.email?.message}
                </div>
              </div>
            </div>
            {/* Name and Email */}

            {/* Profile Picture */}
            <div className="flex justify-center items-center md:mt-4 my-4">
              <div className="flex flex-col">
                <label className="font-semibold mb-2">Profile Picture</label>
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
            {/* Profile Picture */}

            {/* Submit Button */}
            <div className="flex justify-center items-center md:mt-4">
              <button
                className="border border-gray-300 bg-black text-white
            rounded-lg p-2 md:mb-[50px] md:mt-[15px] xl:w-[500px] lg:h-[50px]
            hover:bg-[#FFC100] hover:text-black duration-500 font-semibold
            lg:w-[400px] md:w-[300px] w-[200px] mt-4 mb-8"
                type="submit"
              >
                Save Changes
              </button>
            </div>
            {/* Submit Button */}
          </div>
          {/* Main Container */}
        </form>
      </>
    </>
  );
};

export default EditProfileForm;
