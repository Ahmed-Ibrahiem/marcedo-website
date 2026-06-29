import React from "react";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import ErrorMessageFrom from "../../../../Components/ui/ErrorMessageFrom";
import AddBrandDropDown from "./step1-components/AddBrandDropDown";
import AddCategories from "./step1-components/AddCategories";
import ShortDescription from "./step1-components/ShortDescription";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DescriptionSection from "./step1-components/DescriptionSection";

const Step1 = ({
  allBrands,
  allCategories,
  setOpenCategoryPopup,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <motion.form
      {...props}
      onSubmit={(e) => e.preventDefault()}
      className="w-full bg-white rounded-sm p-2.5 pb-6 shadow-[3px_3px_5px_var(--color-gray-300)] flex-start-col gap-3"
    >
      <h1 className="font-bold">Basic Information</h1>

      {/* Top row: product name, brand, categories */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {/* Product name — registered directly with RHF */}
        <div className="box-form-style">
          <label htmlFor="name" className="label-form-style">
            Product Name
          </label>
          <input
            {...register("name")}
            type="text"
            className="input-form-style"
            placeholder="Enter Product Name"
          />
          {errors?.name && <ErrorMessageFrom message={errors.name.message} />}
        </div>

        {/* Brand dropdown — shows skeleton while brands are loading */}
        {allBrands.length === 0 ? (
          <SkeletonLoading />
        ) : (
          <AddBrandDropDown allBrands={allBrands} />
        )}

        {/* Category multi-select with popup to add new categories */}
        <AddCategories
          allCategories={allCategories}
          setOpenCategoryPopup={setOpenCategoryPopup}
        />
      </div>

      {/* Short description with character counter */}
      <ShortDescription />

      {/* Block-based long description builder */}
      <DescriptionSection />
    </motion.form>
  );
};

// Placeholder shown while brand data is being fetched
const SkeletonLoading = () => {
  return (
    <div className="box-form-style w-full">
      <Skeleton width={100} height={15} />
      <Skeleton className="w-30! md:w-60!" height={35} />
    </div>
  );
};

export default Step1;
