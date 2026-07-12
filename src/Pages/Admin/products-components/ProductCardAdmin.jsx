import React, { useEffect, useState } from "react";
import {
  getProductBrands,
  getProductCategories,
  getProductStock,
} from "../../../services/productDetailsServices";
import { FaEye, FaStar } from "react-icons/fa";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { CiEdit } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { useProductsTableControlContext } from "../context/ProductsTableControl";
import { useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import SelectionCheckbox from "./SelectionCheckbox";

const ProductCardAdmin = ({ productsData, brand, categories, stock }) => {
  const { selectedProductsIds, handleSelectedProducts, requestDelete } =
    useProductsTableControlContext();

  const category = categories.reduce(
    (item, next) => (item.level > next.level ? item : next),
    categories[0],
  );

  const navigate = useNavigate();
  return (
    <div
      className="border border-border rounded-sm shadow-sm p-2.5 text-[14px] fade-in-animate cursor-pointer relative
     hover:shadow-[0_0_10px_var(--color-gray-200)]! hover:scale-101"
    >
      <div onClick={() => handleSelectedProducts(productsData.id)}>
        <div className="pt-[58%] flex-center relative">
          <div onClick={(e) => e.stopPropagation()}>
            <SelectionCheckbox
              style="w-6.5! h-6.5! border-[1.5px]! checked:border-orange! absolute! left-0! top-0!  after:-top-px! after:-left-px"
              productId={productsData.id}
            />
          </div>

          <img
            loading="lazy"
            src={productsData.thumbnail}
            className="max-h-[90%] max-w-[90%] absolute inset-0 m-auto"
            alt=""
          />
        </div>
        <div className="product-info mt-2.5 w-full flex-start-col gap-1.5">
          {/* name and rating */}
          <div className="flex-between w-full gap-2.5 font-semibold ">
            <p className="line-clamp-1 ">{productsData.name}</p>
            <p
              className={`text-xs p-1 rounded-sm ${productsData.is_active ? "text-green bg-green-100" : "bg-gray-200 text-gray"}`}
            >
              {productsData.is_active ? "Published" : "Draft"}{" "}
            </p>
          </div>
          {/* category and brand */}
          <div className="w-full flex-between gap-2.5 text-gray flex-wrap">
            <p>{category?.name}</p>
            <p>{brand?.name}</p>
          </div>
          {/* price and active  */}
          <div className="w-full flex-between gap-1.5">
            <div className="flex-start gap-1.5">
              <p>{productsData.current_price}</p>
              {productsData.has_discount && (
                <p className="line-through text-gray relative">
                  {productsData.original_price}
                </p>
              )}
              {productsData.has_discount && (
                <span className="text-[10px] text-red-600 p-1 rounded-sm bg-red-100 font-semibold ">
                  {productsData.discount_percentage}%
                </span>
              )}
            </div>
            <div className="flex-start gap-2">
              <FaStar className="text-amber-400" />
              <p>{productsData.rating_average}</p>
            </div>
          </div>
          {/* stock and sold */}
          <div className="w-full flex-between gap-1.5">
            <div className="flex-start gap-1.5">
              <p>{stock?.quantity}</p>
              <p
                className={`p-1 rounded-sm font-semibold ${productsData.stock_status === "in_stock" ? "text-green bg-green-100" : "bg-gray-200 text-gray"}`}
              >
                {productsData.stock_status === "in_stock"
                  ? "In Stock"
                  : "Out Stock"}
              </p>
            </div>
            <div className="flex-start gap-1.5">
              <p className="font-semibold">sold: {productsData.sold_count}</p>
              <HiMiniArrowTrendingUp className="text-green" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-start-col gap-5  z-20 absolute right-2.5 top-2.5">
        {/* <button className={btnstyle}>
          <FaEye />
        </button> */}
        <button
          onClick={() =>
            navigate(`/admin/products/add_new_product/${productsData.id}`)
          }
          className={btnstyle}
        >
          <CiEdit />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            requestDelete([productsData.id], `"${productsData.name}"`);
          }}
          className={btnstyle}
        >
          <FaTrashCan />
        </button>
      </div>
    </div>
  );
};

const btnstyle = `
w-7.5 h-7.5 flex-center rounded-sm border border-border text-sm shadow-sm bg-white hover:bg-orange hover:text-white 
hover:border-orange
`;

export default ProductCardAdmin;
