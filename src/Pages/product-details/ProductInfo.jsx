import React, { memo } from "react";

import SocialMediaActions from "./components/SocialMediaActions";
import ProductBasicInfo from "./components/ProductBasicInfo";
import OurFeatures from "./components/OurFeatures";
import { LiaShippingFastSolid } from "react-icons/lia";
import { TbPackage } from "react-icons/tb";
import ProductVariants from "./components/ProductVariants";
import ProductShipping from "./components/ProductShipping";
import ProductActions from "./components/ProductActions";
import { useProductDetailsContext } from "../../Context/ProductDetailsProvider";

const ProductInfo = ({ productData }) => {
  const { selectedOptions, setSelectedOptions, productVariants } =
    useProductDetailsContext();
  return (
    <>
      <div className="w-full lg:pl-10 flex flex-col gap-7.5 mt-12.5 lg:mt-0">
        <ProductBasicInfo productData={productData} />

        {/* Start select options */}
        <ProductVariants
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          productVariants={productVariants}
        />

        {/* Start Actions Btn */}
        <ProductActions productData={productData} />

        {/* Start social media actions */}
        <SocialMediaActions />

        {/* Start Product Features */}
        <OurFeatures />

        {/* Start Order info */}
        <ProductShipping productData={productData} />
      </div>
    </>
  );
};

export default React.memo(ProductInfo);
