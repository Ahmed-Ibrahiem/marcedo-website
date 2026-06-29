import React, { useState, memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import ErrorMessageFrom from "../../../../../Components/ui/ErrorMessageFrom";
import DropDownList from "../../../components/DropDownList";

const AddBrandDropDown = ({ allBrands }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name="brand_id"
      control={control}
      render={({ field }) => {
        const selectedBrand =
          allBrands.find((b) => b.id === field.value) || null;

        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`box-form-style relative grow`}
          >
            <p className={`label-form-style`}>Brand</p>
            <DropDownList
              listStyle={"w-full justify-between!"}
              currentSelect={selectedBrand?.name || "select brand"}
              list={allBrands}
              optionFun={(item) => field.onChange(item.id)}
            >
              <button className="sticky top-0 left-full z-10 w-fit  p-1.5 rounded-sm bg-orange text-[10px] md:text-xs text-white font-black">
                Add New +
              </button>
            </DropDownList>
            {errors?.brand_id && (
              <ErrorMessageFrom message={errors.brand_id.message} />
            )}
          </motion.div>
        );
      }}
    />
  );
};

export default React.memo(AddBrandDropDown);
