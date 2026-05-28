import React, { useEffect, useState, memo } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import SocialMediaActions from "./components/SocialMediaActions";
import ProductBasicInfo from "./components/ProductBasicInfo";
import OurFeatures from "./components/OurFeatures";
import { LiaShippingFastSolid } from "react-icons/lia";
import { TbPackage } from "react-icons/tb";
import ProductVariants from "./components/ProductVariants";
import {
  getProductShipping,
  getProductVariants,
} from "../../services/productDetailsServices";
import ProductShipping from "./components/ProductShipping";

const ProductInfo = ({ productData }) => {
  const [count, setCount] = useState(1);
  const [productVariants, setProductVariants] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);

  useEffect(() => {
    if (!productData) return;

    const getVariants = async () => {
      const variants = await getProductVariants(productData.id);
      if (!variants) return;
      setProductVariants(variants);
    };

    const getShipping = async () => {
      const shipping = await getProductShipping(productData.id);
      if (!shipping) return;
      setShippingInfo(shipping);
    };

    getVariants();
    getShipping();
  }, [productData]);

  return (
    <>
      <div className="w-full lg:pl-10 flex flex-col gap-7.5 mt-12.5 lg:mt-0">
        <ProductBasicInfo productData={productData} />

        {/* Start select options */}
        {productVariants && <ProductVariants prodVariants={productVariants} />}

        {/* Start Actions Btn */}
        <div className="actions-btn flex flex-col w-full gap-2.5 text-sm!">
          <div className="flex flex-col sm:grid grid-cols-12 gap-2.5">
            <div className="flex-between p-3.5 gap-2.5 col-span-3 sm:col-span-2 text-gray lg:col-span-3 2xl:col-span-2 border border-border rounded-sm">
              <button
                className="hover:text-orange"
                onClick={() => setCount((prev) => prev + 1)}
              >
                <FiPlus />
              </button>
              <span className="text-black">{count}</span>
              <button
                className="hover:text-orange"
                onClick={() => {
                  if (count >= 2) setCount((prev) => prev - 1);
                }}
              >
                <FiMinus />
              </button>
            </div>
            {/* add to cart btn */}
            <button className="add-to-cart p-3.5 grid-area col-span-7 sm:col-span-9 lg:col-span-7 2xl:col-span-9 bg-gray-200! rounded-sm hover:text-white hover:bg-black!">
              <span className="uppercase font-bold text-xs!">add to bag</span>
            </button>
            {/* wislist btn */}
            <button className="add-to-wishlist p-3.5 place-items-center col-span-2 sm:col-span-1 lg:col-span-2 2xl:col-span-1 hover:text-white hover:bg-black! bg-gray-200! rounded-sm">
              <FaHeart className="text-lg!" />
            </button>
          </div>
          {/* Buy btn */}
          <button className="p-4 shadow-[0_0_5px_var(--color-gray-300)] hover:text-white hover:bg-black! flex-center rounded-sm">
            <span className="uppercase text-xs! font-bold text-center">
              buy it now
            </span>
          </button>
        </div>

        {/* Start social media actions */}
        <SocialMediaActions />

        {/* Start Product Features */}
        <OurFeatures />

        {/* Start Order info */}
        {shippingInfo && <ProductShipping shippingInfo={shippingInfo} />}
      </div>
    </>
  );
};

export default React.memo(ProductInfo);
