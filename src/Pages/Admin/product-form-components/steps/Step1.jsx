import React, { useEffect, useState } from "react";
import DropDownList from "../../components/DropDownList";
import { getAllBrands } from "../../../../services/BrandsServices";
import { getAllCategories } from "../../../../services/CategoriesServices";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Step1 = ({
  allBrands,
  allCategories,
  allSubCategories,
  setOpenCategoryPopup,
  ...props
}) => {
  return (
    <motion.form
      {...props}
      onSubmit={(e) => e.preventDefault()}
      className="w-full bg-white rounded-sm p-2.5 shadow-[3px_3px_5px_var(--color-gray-300)] flex-start-col gap-4  "
    >
      <h1 className="font-bold">Basic Information</h1>

      <div className={boxStyle}>
        <label htmlFor="name" className={labelStyle}>
          Product Name
        </label>
        <input
          type="text"
          className={inputStyle}
          placeholder="Enter Product Name"
        />
      </div>

      <div className="w-full flex-start gap-4 flex-wrap sm:flex-nowrap">
        {allBrands.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${boxStyle}  grow`}
          >
            <p className={labelStyle}>Brand</p>
            <DropDownList
              listStyle={"w-full justify-between!"}
              currentSelect={"Select brand"}
              list={allBrands}
            >
              <button className="sticky top-0 left-full z-10 w-fit p-1.5 rounded-sm bg-orange text-xs text-white font-black">
                Add New +
              </button>
            </DropDownList>
          </motion.div>
        ) : (
          <SkeletonLoading />
        )}

        {allCategories.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${boxStyle} grow`}
          >
            <p className={labelStyle}>Category</p>
            <DropDownList
              listStyle={"w-full justify-between!"}
              currentSelect={"Select category"}
              list={allCategories}
            >
              <button
                onClick={() => setOpenCategoryPopup(true)}
                className="sticky top-0 left-full z-10 w-fit p-1.5 rounded-sm bg-orange text-xs text-white font-black"
              >
                Add New +
              </button>
            </DropDownList>
          </motion.div>
        ) : (
          <SkeletonLoading />
        )}

        {allSubCategories.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`${boxStyle}  grow`}
          >
            <p className={labelStyle}>
              Sub Category <span className="text-gray">(optional)</span>
            </p>
            <DropDownList
              listStyle={"w-full justify-between!"}
              currentSelect={"Select category"}
              list={allSubCategories}
            >
              <button
                onClick={() => setOpenCategoryPopup(true)}
                className="sticky top-0 left-full z-10 w-fit p-1.5 rounded-sm bg-orange text-xs text-white font-black"
              >
                Add New +
              </button>
            </DropDownList>
          </motion.div>
        ) : (
          <SkeletonLoading />
        )}
      </div>

      <div className={boxStyle}>
        <label htmlFor="name" className={labelStyle}>
          Short Description
        </label>
        <textarea
          className={`${inputStyle} h-20`}
          placeholder="Enter short description"
        />
      </div>

      <div className="w-full  bg-orange-lite rounded-sm min-h-fit p-2.5">
        <div className="flex-start text-lg gap-1 font-bold text-orange">
          <div className="image-box w-6 h-6 ">
            <img src="/assets/images/idea.png" alt="" />
          </div>
          <h4>Tip</h4>
        </div>
        <p className="mt-2.5 text-sm">
          You can add product images, attributes, variants, pricing and more in
          the next steps.
        </p>
      </div>
    </motion.form>
  );
};

const SkeletonLoading = () => {
  return (
    <div className={`${boxStyle} w-81.5`}>
      <Skeleton width={100} height={15} />
      <Skeleton className="w-30! md:w-60! " height={35} />
    </div>
  );
};

const boxStyle = `
flex-start-col w-full gap-1.5 text-sm
`;

const inputStyle = `
border border-border p-1.5 rounded-sm w-full outline-transparent focus:outline-1 focus:outline-orange  duration-500!
`;

const labelStyle = `
font-bold
`;

export default Step1;
