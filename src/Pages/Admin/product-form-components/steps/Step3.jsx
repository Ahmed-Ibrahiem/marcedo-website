import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Step3 = ({ ...props }) => {
  return (
    <motion.form
      {...props}
      onSubmit={(e) => e.preventDefault()}
      className="w-full min-h-full rounded-sm text-sm flex-start-col gap-4 grow "
    ></motion.form>
  );
};

export default Step3;
