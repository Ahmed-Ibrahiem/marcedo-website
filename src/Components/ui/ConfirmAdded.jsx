import React from "react";
import { motion } from "framer-motion";
import { GiCheckMark } from "react-icons/gi";

const ConfirmAdded = ({actionFunc , confirmMessage}) => {
  return (
    <div className="fixed flex-center w-full h-full bg-black/20 rounded-sm inset-0 p-2.5 ">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { type: "tween", ease: "[0, 0 , 1 , 1]" },
        }}
        className="w-100 h-100 p-2.5  bg-white shadow-sm rounded-sm flex-center-col gap-10"
      >
        <div className="flex-center-col gap-5">
          <div
            className="w-17.5 h-17.5 rounded-full flex-center text-3xl text-orange
               bg-orange-lite shadow-[0_0_5px_var(--color-orange-lite)]  "
          >
            <GiCheckMark />
          </div>
          <span className="text-center">{confirmMessage}</span>
        </div>
        <button
          onClick={() => actionFunc()}
          className="text-white bg-orange p-2.5 px-4 rounded-sm hover:scale-105"
        >
          Ok
        </button>
      </motion.div>
    </div>
  );
};

export default ConfirmAdded;
