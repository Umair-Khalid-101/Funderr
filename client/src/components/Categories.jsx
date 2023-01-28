import React from "react";
import { useNavigate } from "react-router-dom";

import { categoryArray } from "../constants";

const CategoriesCard = ({ categoryname, image, handleClick }) => {
  return (
    <>
      <div
        className="sm:w-[300px] w-full rounded-t-[50px] bg-[#1c1c24] cursor-pointer duration-1000"
        onClick={handleClick}
      >
        <img
          src={image}
          alt="campaign"
          className="w-full h-[200px] object-center overflow-hidden rounded-[15px] py-[6px]"
        />
      </div>
      <div
        className="flex justify-center items-center sm:w-[300px] w-full rounded-b-[50px] bg-[#818191] cursor-pointer
      xl:mb-[40px] lg:mb-[30px] md:mb-[20px] mb-[10px] pb-[20px] shadow-lg"
      >
        <div className="font-semibold text-white text-[20px] mt-[10px]">
          {categoryname}
        </div>
      </div>
    </>
  );
};

const Categories = () => {
  const navigate = useNavigate();
  const onClick = (name) => {
    navigate(`/Campaigns/${name}`);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-[40px]">
        <div className="font-semibold xl:text-[32px] lg:text-[24px] md:text-[22px] text-[24px]">
          What we have?
        </div>
        <div
          className="font-bold xl:text-[32px] xl:my-[30px] lg:text-[26px] lg:my-[10px]
        md:text-[20px] md:my-[20px] text-[20px] ml-[24px] my-[20px]"
        >
          We have vast amount of Categories having enormous number of campaigns
        </div>
        {/* Categories Card */}

        <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {categoryArray.map((category) => (
            <ul key={Math.random()}>
              <li className="xl:mx-[80px] lg:mx-[25px] md:mx-[40px]">
                <CategoriesCard
                  categoryname={category.name}
                  image={category.image}
                  handleClick={() => onClick(category.name)}
                />
                {/* {category.name} */}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
