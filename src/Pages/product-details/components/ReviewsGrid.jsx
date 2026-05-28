import React from "react";
import ReviewBox from "./ReviewBox";

const ReviewsGrid = ({ reviews }) => {
  return (
    <>
      {reviews.length > 0 && (
        <div className="w-full flex-start-col ">
          {reviews.map((review, index) => {
            return (
              <ReviewBox
                review={review}
                key={review.id}
                style={index === reviews.length - 1 ? "border-0! " : ""}
              />
            );
          })}
          <button className="view_all text-orange font-semibold underline">
            See all reviews
          </button>
        </div>
      )}
    </>
  );
};

export default React.memo(ReviewsGrid);
