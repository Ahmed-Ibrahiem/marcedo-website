import React from "react";
import { motion } from "framer-motion";
import ProductLevelPricing from "./step4-components/ProductLevelPricing";
import ProductLevelInventory from "./step4-components/ProductLevelInventory";
import ProductLevelShipping from "./step4-components/ProductLevelShipping";
import { useWatch } from "react-hook-form";
import VariantsSummary from "./step4-components/VariantsSummary";

const Step4 = ({ ...props }) => {
  const variants = useWatch({ name: "variants" });
  return (
    <motion.form
      {...props}
      onSubmit={(e) => e.preventDefault()}
      className="w-full h-full  flex-start-col gap-5"
    >
      {variants.length > 0 && <VariantsSummary variants={variants} />}
      <div
        className={`w-full grid grid-cols-1 md:grid-cols-2 gap-5 ${variants.length === 0 ? "" : ""}`}
      >
        <ProductLevelPricing />
        <ProductLevelInventory />
      </div>
      <ProductLevelShipping />
    </motion.form>
  );
};

export default Step4;
