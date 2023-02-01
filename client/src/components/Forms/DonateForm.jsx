import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import BigNumber from "bignumber.js";

import { Donate } from "../../assets";
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
  to: Yup.string()
    .required("Wallet Address is mandatory")
    .matches(/^0x[a-fA-F0-9]{40}$/g, "Please Provide a Valid Wallet Address"),
  amount: Yup.string()
    .required("Amount is mandatory")
    .matches(
      /^(?!0+(?:\.0+)?$)\d+(?:\.\d+)?$/,
      "Please provide a Valid Amount"
    ),
  Terms: Yup.bool().oneOf([true], "Please Read and Check T&C's"),
});

const DonateForm = () => {
  const [txs, setTxs] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addDonation } = useStateContext();
  // console.log("DONATEFORM:", state);
  const resolver = useYupValidationResolver(formSchema);

  const { register, handleSubmit, formState } = useForm({
    resolver,
    defaultValues: {
      to: state.walletAddress,
      amount: "0.1",
    },
  });
  const { errors } = formState;

  const onSubmit = async (data) => {
    await startPayment({
      setTxs,
      ether: data.amount,
      addr: data.to,
    });
  };

  // PAYMENT-FUNCTION
  const startPayment = async ({ setTxs, ether, addr }) => {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");

      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(addr);
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(ether),
      });
      // console.log({ ether, addr });
      // console.log("tx", tx);
      // console.log("Amount: ", tx.value._hex);
      let valueInWei = new BigNumber(tx.value._hex, 16);
      let valueInEther = valueInWei.div(1e18).toString(10);
      // console.log("Amount: ", valueInEther);
      // console.log("To: ", tx.to);
      // console.log("From: ", tx.from);
      // console.log("campaignId: ", state._id);
      const donation = {
        to: tx.to,
        from: tx.from,
        amount: valueInEther,
        campaignId: state._id,
      };
      // console.log("DONATION: ", donation);
      addDonation(donation);
      setTimeout(() => {
        navigate("/Success");
      }, 2000);
      setTxs([tx]);
    } catch (err) {
      let input = err.toString();
      let result;
      if (input.includes("[") || input.includes("(")) {
        result = input.split(/[\[\(]/)[0];
      } else {
        result = input;
      }
      toast.error(`${result}`, {
        position: "top-left",
      });
      // console.log("Error: ", err);
    }
  };

  return (
    <>
      <Wrapper>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className="flex flex-col justify-end items-end xl:pr-[100px] xl:pt-[80px]
          lg:pr-[30px] lg:pt-[50px] md:pr-[50px] md:pt-[40px] pt-[180px] pr-[60px]"
          >
            {/* TO */}
            <div className="flex flex-col">
              <label
                className="xl:text-[18px] lg:text-[14px] md:text-[12px] font-[500]
              flex items-center"
              >
                To {<div className="text-red-500 ml-2">*</div>}
              </label>
              <input
                type="text"
                placeholder="0x9825637ab73"
                className={`focus:border focus:border-blue-500 bg-gray-50 border 
                border-gray-300 text-gray-900 rounded-lg h-[35px] 
              xl:w-[300px] lg:w-[200px] lg:text-[12px] md:w-[150px] 
              md:h-[30px] md:text-[10px] p-1 xl:h-[50px] w-[220px] outline-none
              ${errors.to ? "border-red-500" : ""}`}
                {...register("to")}
              />
              <div className="text-red-500 xl:text-[14px] lg:text-[14px] text-[12px]">
                {errors.to?.message}
              </div>
            </div>
            {/* TO */}

            {/* Amount */}
            <div className="flex flex-col my-4">
              <label
                className="xl:text-[18px] lg:text-[14px] md:text-[12px] font-[500]
              flex items-center"
              >
                Amount {<div className="text-red-500 ml-2">*</div>}
              </label>
              <div className="flex">
                <input
                  type="text"
                  className={`focus:border focus:border-blue-500 bg-gray-50 border 
                border-gray-300 text-gray-900 rounded-lg h-[35px] 
              xl:w-[300px] lg:w-[200px] lg:text-[12px] md:w-[150px] 
              md:h-[30px] md:text-[10px] p-1 xl:h-[50px] w-[220px] outline-none
              ${errors.amount ? "border-red-500" : ""}`}
                  {...register("amount")}
                />
              </div>
              <div className="text-red-500 xl:text-[14px] lg:text-[14px] text-[12px]">
                {errors.amount?.message}
              </div>
            </div>
            {/* Amount */}

            {/* T&C's */}
            <div
              className="flex flex-col my-4 xl:w-[300px] lg:w-[200px] md:w-[150px]
            md:ml-[0px] ml-[40px]"
            >
              <label
                className="xl:text-[18px] lg:text-[14px] md:text-[12px] font-[500]
              xl:mr-[120px] xl:w-[300px] lg:w-[200px] flex items-center
              "
              >
                Terms and Conditions
                {<div className="text-red-500 ml-2">*</div>}
              </label>
              <div className="flex xl:w-[300px] lg:w-[200px] md:w-[200px]">
                <div className="flex mt-[10px]">
                  <input
                    type="checkbox"
                    placeholder="0"
                    className={`focus:border focus:border-[#ffc100] bg-gray-50 border 
                    border-gray-300 rounded-lg h-[20px] 
                    xl:w-[50px] lg:w-[50px] lg:text-[12px] md:w-[50px] 
                    md:h-[20px] md:text-[10px] p-1 xl:h-[20px] w-[50px] outline-none
              ${errors.Terms ? "border-red-500" : ""}`}
                    {...register("Terms", { required: "true" })}
                  />
                  <div className="xl:w-[300px] lg:w-[170px] lg:text-[14px] xl:text-[16px]">
                    I agree to Terms and Conditions
                  </div>
                </div>
              </div>
              <div className="xl:w-[300px] lg:w-[200px] text-[12px] mt-[5px]">
                Terms & Conditions state that the user agrees to donate the
                desired amount to the other person which cannot be returned
                back. It is the basic policy of website. Also, the amount shared
                on wrong address cannot be returned. Kindly make sure the given
                detail is correct.
              </div>
              <div className="text-red-500 xl:text-[14px] lg:text-[14px] text-[12px]">
                {errors.Terms?.message}
              </div>
            </div>
            {/* T&C's */}

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
                Donate
              </button>
            </div>
            {/* Button */}
          </div>
        </form>
        {/* Form */}
      </Wrapper>
    </>
  );
};

export default DonateForm;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${Donate});
`;
