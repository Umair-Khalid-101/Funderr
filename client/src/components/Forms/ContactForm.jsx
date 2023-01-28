import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const ContactForm = () => {
  const formSchema = Yup.object().shape({
    name: Yup.string().required("Name is mandatory"),

    email: Yup.string().email().required("Email is mandatory"),
    message: Yup.string().required("Message is mandatory"),
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  const form = useRef();

  const sendEmail = (data, e) => {
    emailjs
      .send("service_7hicvoo", "template_cbtq937", data, "4ZSVabSjzF4ZI9vfG")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    toast.success("Email sent successfully", {
      position: toast.POSITION.TOP_LEFT,
    });
  };
  const onSubmit = (data) => {
    sendEmail(data);
    reset();
  };

  return (
    <>
      <div className="flex flex-col">
        <form ref={form} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label
              className="text-black font-[500] xl:text-[18px] lg:text-[18px] md:text-[14px]
            flex items-center mt-4"
            >
              Name {<div className="text-red-500 ml-2">*</div>}
            </label>
            <input
              type="text"
              name="name"
              {...register("name")}
              className={`xl:text-[16px] lg:text-[14px] md:text-[14px] text-[14px] xl:w-[300px] 
              xl:h-[40px] lg:w-[250px] lg:h-[30px] md:h-[15px] md:w-[200px] rounded-lg
              h-[40px] w-[250px] bg-gray-50 border border-gray-300 text-gray-900
              ${
                errors.name ? "border border-red-500" : ""
              } xl:p-[20px] lg:p-[18px] md:p-[14px] p-[8px] outline-none focus:border focus:border-blue-500`}
            />
            <div className="text-[red] xl:text-[14px] lg:text-[14px] md:text-[10px] text-[12px]">
              {errors.name?.message}
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className="text-black font-[500] xl:text-[18px] lg:text-[18px] md:text-[14px]
            flex items-center mt-4"
            >
              Email {<div className="text-red-500 ml-2">*</div>}
            </label>
            <input
              type="email"
              name="email"
              {...register("email")}
              className={`xl:text-[16px] lg:text-[14px] md:text-[14px] text-[14px] xl:w-[300px] 
              xl:h-[40px] lg:w-[250px] lg:h-[30px] md:h-[15px] md:w-[200px] rounded-lg
              h-[40px] w-[250px] focus:border focus:border-blue-500 bg-gray-50 border border-gray-300 text-gray-900
              ${
                errors.name ? "border border-red-500" : ""
              } xl:p-[20px] lg:p-[18px] md:p-[14px] p-[8px] outline-none`}
            />
            <div className="text-[red] xl:text-[14px] lg:text-[14px] md:text-[10px] text-[12px]">
              {errors.email?.message}
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className="text-black font-[500] xl:text-[18px] lg:text-[18px] md:text-[14px] 
            flex items-center mt-4"
            >
              Message {<div className="text-red-500 ml-2">*</div>}
            </label>
            <textarea
              {...register("message")}
              name="message"
              className={`xl:text-[16px] lg:text-[14px] md:text-[14px] text-[14px] xl:w-[300px] 
              xl:h-[150px] lg:w-[250px] lg:h-[120px] md:h-[80px] md:w-[200px] rounded-lg
              h-[80px] w-[250px] focus:border focus:border-blue-500 bg-gray-50 border border-gray-300 text-gray-900
              ${
                errors.name ? "border border-red-500" : ""
              } xl:p-[20px] lg:p-[18px] md:p-[14px] p-[8px] outline-none`}
            />
            <div className="text-[red] xl:text-[14px] lg:text-[14px] md:text-[10px] text-[12px]">
              {errors.message?.message}
            </div>
          </div>
          <div>
            <div
              className="bg-[#1c1c24] rounded-[30px] xl:p-[8px] lg:p-[7px] md:p-[4px] p-[6px]
            flex justify-center items-center m-[10px] hover:bg-[#FFC100] duration-500"
            >
              <button
                type="submit"
                className="text-white font-[500] xl:text-[18px] lg:text-[18px] md:text-[14px] text-[14px]"
              >
                Send Email
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
