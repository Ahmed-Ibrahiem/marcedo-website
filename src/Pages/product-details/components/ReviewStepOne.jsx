import React, { useState } from "react";
import { FaStar, FaXmark } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useReviewsContext } from "../../../Context/Reviews_Provider";
import { useReviewsUIContext } from "../../../Context/ReviewsUIProvider";
const ReviewStepOne = () => {
  const { productData } = useReviewsContext();

  const {
    userRated,
    setUserRated,
    setIsClicked,
    setCurrentStep,
    setIsOpenReviewForm,
  } = useReviewsUIContext();
  const [starsHover, setStarsHover] = useState(userRated);

  return (
    <motion.div className="review-content w-full flex flex-col justify-between items-center py-10 h-full gap-10 fade-in-animate">
      {/* Exit Popup */}
      <button
        type="button"
        onClick={() => {
          setIsClicked(false);
          setUserRated(-1);
          setIsOpenReviewForm(false);
        }}
        className="absolute  top-0   right-0  w-8 h-8 rounded-sm
           flex-center border-2 border-border text-gray hover:text-black hover:border-black"
      >
        <FaXmark />
      </button>

      {/* start heading */}
      <div className="flex-center-col gap-2.5 text-center!">
        <h1 className="text-2xl font-semibold">How whould you like rate us?</h1>

        <p>We would love it if you whould share a bit about your experiance.</p>
      </div>

      <div className="flex-center-col gap-5">
        <div className="image-box w-30 md:w-40 h-30 md:h-40 rounded-lg bg-gray-300 flex-center">
          <img
            src={productData.thumbnail}
            alt=""
            className="max-w-[80%] max-h-[80%]!" loading="lazy"
          />
        </div>

        <p className="font-semibold text-center">{productData.name}</p>
      </div>

      <div>
        <div
          className="flex-start gap-5 text-2xl md:text-4xl"
          onMouseLeave={() => setStarsHover(userRated)}
        >
          {Array(5)
            .fill(0)
            .map((_, index) => {
              return (
                <FaStar
                  onClick={() => {
                    setCurrentStep((prev) => prev + 1);
                    setUserRated(index);
                  }}
                  onMouseEnter={() => setStarsHover(index)}
                  className={`cursor-pointer  ${starsHover >= index ? "text-amber-400 scale-130!" : ""}`}
                  key={index}
                />
              );
            })}
        </div>
        <div className="flex-between gap-2.5 text-gray text-sm mt-2.5">
          <p>Poor</p>
          <p>Great</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewStepOne;
