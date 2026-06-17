import React, { useEffect, useState } from "react";
import {
  getProductBrands,
  getProductCategories,
  getProductStock,
} from "../../../services/productDetailsServices";
import { FaArrowTrendUp, FaEye } from "react-icons/fa6";
import { FaPen, FaStar } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { useProductsTableControlContext } from "../context/ProductsTableControl";

const ProductRow = ({ product }) => {
  const [proBrand, setProBrand] = useState(null);
  const [proCateg, setProCateg] = useState(null);
  const [proStock, setProStock] = useState(null);
  const { handleSelectedProducts, selectedProductsIds } =
    useProductsTableControlContext();

  useEffect(() => {
    const getBrand = async () => {
      const brand = await getProductBrands(product.brand_id);
      if (brand) setProBrand(brand);
    };

    const getStock = async () => {
      const stock = await getProductStock(product.id);
      if (stock) setProStock(stock);
    };

    const getCategs = async () => {
      const categs = await getProductCategories(product.category_ids);
      if (categs) {
        const theParent = categs.find((cat) => !cat.parent_id);
        const theChild = categs.find((cat) => cat.parent_id);
        if (theChild) setProCateg(theChild);
        else setProCateg(theParent);
      }
    };

    getStock();
    getCategs();
    getBrand();
  }, []);

  return (
    <>
      {product && (
        <tr
          onClick={() => handleSelectedProducts(product.id)}
          key={product.id}
          className="text-sm border-b border-border last-of-type:border-b-0 font-semibold hover:bg-gray/5 cursor-pointer "
        >
          <td className="text-start pl-2.5">
            <div className="">
              <input
                checked={selectedProductsIds.includes(product.id)}
                onChange={() => {
                  handleSelectedProducts(product.id);
                }}
                type="checkbox"
                className="w-5! h-5! border-gray-300!"
              />
            </div>
          </td>
          <td className="text-start pl-2.5 py-1.75 flex-start items-start! gap-1.5 max-w-30">
            <div
              className="flex-center min-w-10 w-10 min-h-10 h-10 rounded-sm overflow-hidden
             bg-gray-200 border border-border"
            >
              <img loading="lazy"
                className="max-w-[90%] max-h-[90%]"
                src={product.thumbnail}
                alt=""
              />
            </div>
            <p className="line-clamp-1 ">{product?.name}</p>
          </td>

          <td className="text-start pl-2.5">
            <span>{proCateg?.name}</span>
          </td>

          <td className="text-start pl-2.5">
            <span>{proBrand?.name}</span>
          </td>

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

          <td className="text-start pl-2.5 font-semibold">
            <p>{proStock?.quantity}</p>
            <span
              className={`capitalize text-[10px] p-1 rounded-sm ${proStock?.status === "in_stock" ? "bg-green/10 text-green" : "text-gray bg-gray/10"}`}
            >
              {proStock?.status.split("_").join(" ")}
            </span>
          </td>

          <td className="text-start pl-2.5">
            <div className="flex-start gap-1.5">
              <span>{product?.sold_count}</span>
              <FaArrowTrendUp className="text-green" />
            </div>
          </td>

          <td className="text-start pl-2.5">
            <div className="flex-start gap-1.5">
              <FaStar className="text-amber-400" />
              <span>{product?.rating_average}</span>
            </div>
          </td>

          <td className="text-start pl-2.5">
            <span
              className={`p-1 rounded-sm ${product?.is_active ? "text-green bg-green/10" : "text-gray bg-gray/10"}`}
            >
              {product?.is_active ? "Published" : "Draft"}
            </span>
          </td>

          <td>
            <div className="flex-start gap-1.5">
              <button className={btnstyle}>
                <FaEye />
              </button>
              <button className={btnstyle}>
                <CiEdit />
              </button>
              <button className={btnstyle}>
                <BsThreeDots />
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
