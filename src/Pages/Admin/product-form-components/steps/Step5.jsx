import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductSummary from "./step5-components/ProductSummary";
import PriceAndInventorySummary from "./step5-components/PriceAndInventorySummary";
import VisibilityAndMarketing from "./step5-components/VisibilityAndMarketing";
import RelatedProducts from "./step5-components/RelatedProducts";

const Step5 = ({ setCurrentStep, ...props }) => {
  return (
    <motion.section
      {...props}
      className="w-full min-h-full h-full text-sm flex-start-col gap-4 grow "
    >
      <ProductSummary setCurrentStep={setCurrentStep} />
      <PriceAndInventorySummary setCurrentStep={setCurrentStep} />
      <RelatedProducts />
      <VisibilityAndMarketing />
    </motion.section>
  );
};

const SkeletonLoading = () => {
  return (
    <div className="box-form-style max-w-full">
      <Skeleton width={100} height={15} />
      <Skeleton className="w-30! md:w-50!" height={35} />
    </div>
  );
};

export default Step5;
