import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getCategoryPath } from "../../../../../services/CategoriesServices";
import { FaAngleRight, FaPencil } from "react-icons/fa6";
import {
  getBrandName,
  getBrandNameByBrandId,
} from "../../../../../services/BrandsServices";
import { FaEdit } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

const ProductSummary = ({ setCurrentStep }) => {
  const { getValues } = useFormContext();
  const categories = getValues("category_ids");
  const thumbnail = getValues("thumbnail");
  const brand_id = getValues("brand_id");
  const tags = getValues("tags");
  const shortDescription = getValues("short_description");
  const [categoryPath, setCategoryPath] = useState(null);
  const [brandName, setBrandName] = useState(null);
  // const {} = useFormContext()

  useEffect(() => {
    const getCategory = async () => {
      try {
        let category =
          categories.find((cat) => cat.level === 3) ||
          categories.find((cat) => cat.level === 2);

        if (category === undefined) {
          category = categories.find((cat) => cat.level === 1);
        }

        const path = await getCategoryPath(category);
        setCategoryPath(path);
        const brand = await getBrandNameByBrandId(brand_id);
        setBrandName(brand);
      } catch (errors) {}
    };

    getCategory();
  }, [categories, brand_id]);

  return (
    <div className="w-full rounded-sm bg-white shadow-sm p-2.5 flex-start-col gap-2.5">
      <h1 className="font-bold">Product Summary</h1>
      <div className="flex gap-5 w-full md:pr-5 ">
        {/* Products Thumbnail */}
        <div className="flex flex-col md:flex-row gap-5 grow ">
          <div className="thumbnail min-w-50 sm:w-50 min-h-60 max-h-60 rounded-sm flex-center bg-gray-100">
            <img
              src={thumbnail}
              className="max-w-[90%] max-h-[90%]"
              loading="lazy"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 h-fit  gap-y-4 ">
            {/* Products Name */}
            <div className="box-form-style ">
              <h4 className="text-gray">Name</h4>
              <p className="label-form-style">Men Casual Styel</p>
            </div>
            {/* Products Categories */}
            <div className="box-form-style ">
              {categoryPath && (
                <>
                  <motion.h4
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray"
                  >
                    Category
                  </motion.h4>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-start gap-1"
                  >
                    {categoryPath.map((cat, index) => (
                      <div key={index} className="flex-start gap-1.5">
                        <p className="text-orange font-semibold">{cat}</p>
                        {index !== categoryPath.length - 1 && (
                          <FaAngleRight className="text-gray" />
                        )}
                      </div>
                    ))}
                  </motion.div>
                </>
              )}
              {!categoryPath && <SkeletonLoading />}
            </div>
            {/* Products Brand */}
            {brandName && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-start-col gap-1"
              >
                <h4 className="text-gray">Brand Name</h4>
                <p className="font-semibold">{brandName}</p>
              </motion.div>
            )}
            {!brandName && <SkeletonLoading />}
            {/* Products Short Tags */}
            {tags && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-start-col gap-1"
              >
                <h4 className="text-gray">Tags</h4>
                {tags && <p>{tags.join(" | ")}</p>}
              </motion.div>
            )}
            {!tags && <SkeletonLoading />}
            {/* Products Short Description */}
            {shortDescription && (
              <div className="flex-start-col gap-1">
                <h4 className="text-gray">Short Description</h4>
                <p className="font-semibold">{shortDescription}</p>
              </div>
            )}
          </div>
        </div>
        {/* Edit Btn */}
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className={btnStyle}
        >
          <FaPencil />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
};
const btnStyle = `
flex-start max-sm:absolute max-sm:top-12.5 max-sm:right-5 gap-2.5 p-1.5 px-4 bg-white
rounded-sm border border-border h-fit hover:bg-gray-200 
`;

const SkeletonLoading = () => {
  return (
    <div className="box-form-style max-w-full">
      <Skeleton width={100} height={10} />
      <Skeleton className="w-30! md:w-40!" height={15} />
    </div>
  );
};

export default ProductSummary;
