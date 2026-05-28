import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { FaArrowLeft, FaStar, FaXmark } from "react-icons/fa6";
import { useReviewsContext } from "../../../Context/Reviews_Provider";
import { useReviewsUIContext } from "../../../Context/ReviewsUIProvider";

const ReviewStepTwo = () => {
  const { setIsOpenReviewForm, productData } = useReviewsContext();

  const { userRated, setUserRated, setCurrentStep } = useReviewsUIContext();

  return (
    <div className="review-content w-full flex flex-col justify-between pt-7.5 pb-1.5  gap-5 h-full fade-in-animate">
      {/* heading */}
      <div className="w-full flex-center-col gap-2.5">
        <h1 className="text-lg font-semibold text-center">
          {productData.name}
        </h1>
        {/* Stars rating */}
        <div className="flex-start gap-3 text-2xl">
          {Array(5)
            .fill(0)
            .map((_, index) => {
              return (
                <FaStar
                  className={` ${userRated >= index ? "text-amber-400 scale-130!" : ""}`}
                  key={index}
                />
              );
            })}
        </div>
      </div>

      {/* Content input */}
      <div className="w-full ">
        <label className="text-sm font-semibold" htmlFor="reviewContent">
          Review Content (required)
        </label>
        <textarea
          className="w-full text-sm outline-none focus:border-gray/80 min-h-50 p-2.5 border border-border rounded-sm self-start shadow-sm mt-1.5"
          id="reviewContent"
          placeholder="Start write here..."
        ></textarea>

        {/* Terms and policy */}
        <p className="text-gray text-sm mt-5">
          We'll only contact you about your review if necessary. by submitting
          you review, you agree to our{" "}
          <a className="underline!" href="##">
            terms and conditions
          </a>{" "}
          and{" "}
          <a className="underline!" href="##">
            privacy policy
          </a>
        </p>
      </div>

      {/* action buttons */}
      <div className="flex-between w-full ">
        <button
          type="button"
          className="font-semibold flex-start gap-2.5"
          onClick={() => setCurrentStep((prev) => prev - 1)}
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>
        <button
          onClick={() => setCurrentStep((prev) => prev + 1)}
          type="button"
          className="font-semibold py-2.5 px-5 rounded-sm bg-orange-lite! hover:text-white! hover:bg-orange!"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewStepTwo;
