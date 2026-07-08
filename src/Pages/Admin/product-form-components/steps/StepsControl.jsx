import React from "react";
import { useWatch } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const StepsControl = ({
  currentStep,
  onNext,
  onBack,
  formId,
  onSave,
  isSubmitting,
}) => {
  return (
    <div className="flex-between w-full bg-white p-2.5 rounded-sm shadow-[3px_3px_5px_var(--color-gray-300)] font-semibold">
      {currentStep === 1 ? (
        <button
          type="button"
          className="px-5 py-2 text-sm flex-center border border-border rounded-sm text-gray hover:text-black! hover:bg-gray-200!"
        >
          <span>Cancel</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-5 py-2 text-sm flex-center gap-1.5 border border-border rounded-sm text-gray hover:text-black! hover:bg-gray-200! disabled:opacity-50"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>
      )}
      {currentStep <= 4 ? (
        <button
          type="button"
          onClick={onNext}
          className="px-5 text-sm py-2 flex-center border border-border rounded-sm bg-orange-lite gap-1.5 text-black hover:text-white! hover:bg-orange!"
        >
          <span>Continue</span>
          <FaArrowRight />
        </button>
      ) : (
        <button
          type="button"
          onClick={onSave}
          disabled={isSubmitting}
          className="px-5 text-sm py-2 flex-center border-2 border-orange rounded-sm bg-orange gap-1.5 text-white hover:text-orange! hover:bg-white! disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{isSubmitting ? "Saving..." : "Save"}</span>
          <FaSave />
        </button>
      )}
    </div>
  );
};

export default StepsControl;
