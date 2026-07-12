// src/Components/ui/SuccessPopup.jsx
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCircleCheck } from "react-icons/fa6";

const SuccessPopup = ({ title = "Done", message, onOk }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed z-100 top-0 left-0 w-full h-full bg-black/40 flex-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-sm p-5 w-full max-w-90 flex-center-col gap-3 text-center shadow-lg"
        >
          <FaCircleCheck size={40} className="text-green" />
          <h2 className="font-bold text-lg">{title}</h2>
          <p className="text-sm text-gray">{message}</p>

          <button
            type="button"
            onClick={onOk}
            className="px-8 py-2 text-sm bg-orange text-white rounded-sm hover:bg-orange/90 mt-2.5"
          >
            OK
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SuccessPopup;
