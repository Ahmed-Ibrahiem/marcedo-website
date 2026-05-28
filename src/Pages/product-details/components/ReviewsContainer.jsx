import React from "react";
import { useReviewsContext } from "../../../Context/Reviews_Provider";
import { FaStar } from "react-icons/fa";
import { useReviewsUIContext } from "../../../Context/ReviewsUIProvider";
import ReviewsGrid from "./ReviewsGrid";

const ReviewsContainer = () => {
  const { productReviews } = useReviewsContext();

  return (
    <>
      <div className="lg:col-span-8 p-5 shadow-[0_5px_10px_var(--color-gray-300)] h-fit rounded-sm border border-border">
        {/* when number of review is zero */}
        {productReviews.length === 0 && (
          <p className="text-gray text-center">
            No reviews yet, lead the way and share your thoughts
          </p>
        )}

        {/* when there are any reviews */}
        {productReviews.length > 0 && <ReviewsGrid reviews={productReviews} />}
      </div>
    </>
  );
};

export default React.memo(ReviewsContainer);
