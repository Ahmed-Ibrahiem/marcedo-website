import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import ReviewStepOne from "./ReviewStepOne";
import ReviewStepTwo from "./ReviewStepTwo";
import ReviewStepThree from "./ReviewStepThree";
import ReviewStepFour from "./ReviewStepFour";
import ReviewStepFive from "./ReviewStepFive";
import { useReviewsContext } from "../../../Context/Reviews_Provider";
import { useReviewsUIContext } from "../../../Context/ReviewsUIProvider";
const CreateReviewForm = () => {
  const { productData } = useReviewsContext();
  const { currentStep, isOpenReviewForm } = useReviewsUIContext();

  return (
    <AnimatePresence>
      {isOpenReviewForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.5 } }}
          className="w-full h-screen fixed top-0 left-0 bg-black-lite/50 z-40 flex-center "
        >
          <motion.form
            initial={{ height: 0, padding: 0 }}
            animate={{
              height: "90%",
              padding: 20,
              transition: { ease: "linear", delay: 0.3 },
            }}
            exit={{ height: 0, padding: 0, transition: { ease: "linear" } }}
            className="relative w-[90%] md:w-162.5 bg-white rounded-md h-[92%] p-5 shadow-[0_0_10px_var(--color-gray)] overflow-hidden"
          >
            {/* Step one review content */}
            {currentStep === 1 && <ReviewStepOne />}

            {/* Step two review content */}
            {currentStep === 2 && <ReviewStepTwo />}

            {/* Step three review content */}
            {currentStep === 3 && <ReviewStepThree />}

            {/* Step four review content */}
            {currentStep === 4 && <ReviewStepFour />}

            {/* Step Five Confirm Review */}
            {currentStep === 5 && <ReviewStepFive />}
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(CreateReviewForm);
