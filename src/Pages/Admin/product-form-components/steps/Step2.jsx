import React, { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import MainImage from "./step2-components/MainImage";
import GallaryImages from "./step2-components/GallaryImages";
import VideosGallary from "./step2-components/VideosGallary";

const Step2 = ({ ...props }) => {
  return (
    <motion.section
      {...props}
      className="w-full min-h-full rounded-sm text-sm flex-start-col gap-4  "
    >
      <div className="images grid grid-cols-1 sm:grid-cols-2 w-full gap-4">
        {/* thumbnail image */}
        <MainImage />
        {/* gallary images */}
        <GallaryImages />
      </div>
      {/* Videos Gallery */}
      <VideosGallary />
    </motion.section>
  );
};

export default React.memo(Step2);
