// src/Components/ui/ConfirmDeletePopup.jsx
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ConfirmDeletePopup = ({
  title = "Are you sure?",
  message = "This action cannot be undone.",
  onConfirm,
  onCancel,
  isDeleting = false,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed z-100 top-0 left-0 w-full h-full bg-black/40 flex-center"
        onClick={onCancel}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-sm p-5 w-full max-w-90 flex-start-col gap-4 relative shadow-lg"
        >
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="absolute top-2.5 right-2.5 text-gray hover:text-black"
          >
            <FaXmark size={18} />
          </button>

          <h2 className="font-bold text-lg">{title}</h2>
          <p className="text-sm text-gray">{message}</p>

          <div className="flex-end gap-2.5 w-full mt-2.5">
            <button
              type="button"
              onClick={onCancel}
              disabled={isDeleting}
              className="px-5 py-2 text-sm border border-border rounded-sm hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="px-5 py-2 text-sm bg-red-600 text-white rounded-sm hover:bg-red-700 disabled:opacity-50 flex-center gap-1.5"
            >
              {isDeleting && (
                <AiOutlineLoading3Quarters className="loading-animate-1" />
              )}
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmDeletePopup;
