import React, { useEffect, useState } from "react";
import {
  getProductBrands,
  getProductCategories,
  getProductStock,
} from "../../../services/productDetailsServices";
import { FaArrowTrendUp, FaEye, FaTrashCan } from "react-icons/fa6";
import { FaPen, FaStar } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { useProductsTableControlContext } from "../context/ProductsTableControl";
import { getProductForEdit } from "../product-form-components/services/productFormServices";
import { useNavigate } from "react-router-dom";
import SelectionCheckbox from "./SelectionCheckbox";

const ProductRow = ({ product, brand, categories, stock }) => {
  const category = categories.reduce(
    (item, next) => (item.level > next.level ? item : next),
    categories[0],
  );
  const { handleSelectedProducts, selectedProductsIds } =
    useProductsTableControlContext();

  const navigate = useNavigate();
  return (
    <>
      {product && (
        <tr
          onClick={(e) => {
            if (e.target === e.currentTarget)
              handleSelectedProducts(product.id);
          }}
          key={product.id}
          className="text-sm border-b border-border last-of-type:border-b-0 font-semibold hover:bg-gray/5 cursor-pointer "
        >
          {/* select row */}
          <td className="text-start pl-2.5">
            <SelectionCheckbox productId={product.id} />
          </td>

          {/* Product thumbnail and name */}
          <td className="text-start pl-2.5 py-1.75 flex-start items-start! gap-1.5 max-w-30">
            <div
              className="flex-center min-w-10 w-10 min-h-10 h-10 rounded-sm overflow-hidden
             bg-gray-200 border border-border"
            >
              <img
                loading="lazy"
                className="max-w-[90%] max-h-[90%]"
                src={product.thumbnail}
                alt=""
              />
            </div>
            <p className="line-clamp-1 ">{product?.name}</p>
          </td>

          {/* Category */}
          <td className="text-start pl-2.5">
            <span>{category?.name}</span>
          </td>

          {/* Brand */}
          <td className="text-start pl-2.5">
            <span>{brand?.name}</span>
          </td>

          {/* Price */}
          <td className="text-start pl-2.5">
            <div className="flex-between gap-1.5 ">
              <p className="font-semibold">${product.current_price}</p>
              {product.has_discount && (
                <span className="p-1 text-red-600 bg-red-200 rounded-sm text-[10px] font-semibold">
                  -{product.discount_percentage}%
                </span>
              )}
            </div>
            {product?.has_discount && (
              <p className="text-xs text-gray line-through">
                ${product.original_price}
              </p>
            )}
          </td>

          {/* Stock */}
          <td className="text-start pl-2.5 font-semibold">
            <p>{stock?.quantity}</p>
            <span
              className={`capitalize text-[10px] p-1 rounded-sm ${product.stock_status === "in_stock" ? "bg-green/10 text-green" : "text-gray bg-gray/10"}`}
            >
              {stock?.status.split("_").join(" ")}
            </span>
          </td>

          {/* Sold Count */}
          <td className="text-start pl-2.5">
            <div className="flex-start gap-1.5">
              <span>{product?.sold_count}</span>
              <FaArrowTrendUp className="text-green" />
            </div>
          </td>

          {/* Rating Average */}
          <td className="text-start pl-2.5">
            <div className="flex-start gap-1.5">
              <FaStar className="text-amber-400" />
              <span>{product?.rating_average}</span>
            </div>
          </td>

          {/* isActive (Publish or Draft) */}
          <td className="text-start pl-2.5">
            <span
              className={`p-1 rounded-sm ${product?.is_active ? "text-green bg-green/10" : "text-gray bg-gray/10"}`}
            >
              {product?.is_active ? "Published" : "Draft"}
            </span>
          </td>

          {/* Row Actions */}
          <td>
            <div className="flex-start gap-1.5">
              {/* Hide */}
              <button className={btnstyle}>
                <FaEye />
              </button>
              {/* Edit Product */}
              <button
                onClick={() =>
                  navigate(`/admin/products/add_new_product/${product.id}`)
                }
                className={btnstyle}
              >
                <CiEdit />
              </button>
              <button className={btnstyle}>
                <FaTrashCan />
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const btnstyle = `
w-7.5 h-7.5 rounded-sm border border-border flex-center text-lg! shadow-sm hover:scale-110 hover:shadow-md 
active:scale-90
`;

export default ProductRow;
