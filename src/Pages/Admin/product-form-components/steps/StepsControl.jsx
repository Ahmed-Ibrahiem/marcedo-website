import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const StepsControl = ({ currentStep, setCurrentStep }) => {
  return (
    <div className="flex-between w-full bg-white p-2.5 rounded-sm shadow-[3px_3px_5px_var(--color-gray-300)] font-semibold">
      {currentStep === 1 ? (
        <button className="px-5 py-2 text-sm flex-center border border-border rounded-sm text-gray hover:text-black! hover:bg-gray-200!">
          <span>Cancel</span>
        </button>
      ) : (
        <button
          onClick={() => setCurrentStep((prev) => prev - 1)}
          className="px-5 py-2 text-sm flex-center gap-1.5 border border-border rounded-sm text-gray hover:text-black! hover:bg-gray-200!"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>
      )}
      <button
        onClick={() => setCurrentStep((prev) => prev + 1)}
        className="px-5 text-sm py-2 flex-center border border-border rounded-sm bg-orange-lite gap-1.5 text-black hover:text-white! hover:bg-orange!"
      >
        <span>Continue</span>
        <FaArrowRight />
      </button>
    </div>
  );
};

export default StepsControl;
