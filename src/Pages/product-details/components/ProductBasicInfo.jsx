import React, { memo, useEffect, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineInbox } from "react-icons/md";
import {
  getProductCategories,
  getProductDetails,
  getProductRatings,
} from "../../../services/productDetailsServices";

const ProductBasicInfo = ({ productData }) => {
  const [details, setDetails] = useState(null);
  const [rating, setRating] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    if (!productData) return;
    const getProDetails = async () => {
      const proDetails = await getProductDetails(productData.id);
      if (proDetails) setDetails(proDetails);
    };

    const getProRatings = async () => {
      const proRating = await getProductRatings(productData.id);
      if (proRating) setRating(proRating);
    };

    const getProCateg = async () => {
      const categs = await getProductCategories(productData.category_ids);
      if (categs) setCategories(categs);
    };

    getProDetails();
    getProRatings();
    getProCateg();
  }, [productData]);
  return (
    <>
      <h1 className="font-bold max-w-full text-lg  ">{details?.full_name}</h1>

      {/* Start Rating */}
      {rating && (
        <div className="flex-start gap-2.5 -mt-2.5">
          {/* Rating stars */}
          <div className="flex gap-1">
            {Array(5)
              .fill(0)
              .map((_, index) => {
                return (
                  <MdOutlineStar
                    size={20}
                    className={`text-gray-300 ${rating.average > index + 1 ? "text-gold!" : ""} `}
                    key={index}
                  />
                );
              })}
          </div>
          {/* Rating average */}
          <p className="text-sm text-gray">({rating.average})</p>
          {/* See All Review */}
          <button
            type="button"
            className="text-sm uppercase font-bold hover:text-orange"
          >
            see all reviews
          </button>
        </div>
      )}

      {/* Start Price  */}
      <h2 className="text-2xl font-bold ">${productData?.current_price}</h2>

      {/* Start Short Description */}
      <p className="text-sm leading-5 text-gray mr-12.5">
        {details?.short_description}
      </p>

      {/* Start product info */}
      <div className="flex-start-col text-sm! gap-1.5">
        {/* available */}
        <div className="flex-start">
          <h3 className="min-w-29 sm:min-w-32.5 font-bold">AVAILABLE:</h3>
          <div className="flex-start gap-1">
            <p
              className={`${productData.stock_status === "in_stock" ? "text-green" : "text-gray"} `}
            >
              {productData.stock_status === "in_stock"
                ? "In Stock"
                : "Out Stock"}
            </p>
            {productData.stock_status === "in_stock" ? (
              <IoMdCheckboxOutline className="text-green" />
            ) : (
              <MdOutlineInbox className="text-gray" />
            )}
          </div>
        </div>

        {/* tags */}
        <div className="flex-start">
          <h3 className="min-w-29 sm:min-w-32.5 font-bold uppercase">Tags:</h3>
          <p className="text-black">{productData.tags.join(", ")}</p>
        </div>

        {/* SKU */}
        <div className="flex-start">
          <h3 className="min-w-29 sm:min-w-32.5 font-bold uppercase">sku:</h3>
          <p className="text-gray">{productData.sku}</p>
        </div>

        {/* categories */}
        <div className="flex-start">
          <h3 className="min-w-29 sm:min-w-32.5 font-bold uppercase">
            Category:
          </h3>
          <div className="flex-start gap-1.5 flex-wrap sm:flex-nowrap">
            {categories?.map((cat, index) => {
              return (
                <p key={cat.id}>
                  {cat.name} {index !== categories.length - 1 ? "|" : ""}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ProductBasicInfo);
