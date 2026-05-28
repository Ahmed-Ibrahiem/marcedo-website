import React from "react";
import { FaStar } from "react-icons/fa";
import { useReviewsUIContext } from "../../../Context/ReviewsUIProvider";
import { useReviewsContext } from "../../../Context/Reviews_Provider";

const RatingsContainer = () => {
  const { productRatings, productReviews } = useReviewsContext();
  const {
    setIsOpenReviewForm,
    isUserRated,
    setUserRated,
    setIsClicked,
    userRated,
    isClicked,
  } = useReviewsUIContext();
  return (
    <>
      <div className="lg:col-span-4 flex-start-col gap-5 p-4 shadow-[0_5px_10px_var(--color-gray-300)] rounded-sm border border-border h-fit lg:sticky lg:top-25">
        {/* when there are reviews of product */}
        {productReviews.length > 0 && productRatings && (
          <div className="flex-center-col gap-5 w-full py-5">
            <div className="flex-center-col gap-1.5">
              {/* rating average */}
              <h1 className="text-5xl font-semibold">
                {productRatings.average}
              </h1>
              {/* rating Stars */}
              <div className="flex-start gap-1 text-2xl text-gray-light">
                {Array(5)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <FaStar
                        className={
                          index + 1 <= productRatings.average
                            ? "text-amber-400"
                            : ""
                        }
                        key={index}
                      />
                    );
                  })}
              </div>
            </div>
            {/* rating number */}
            <span className="text-sm text-gray">
              ({productRatings.total_ratings} Reviews)
            </span>
            {/*Write a Review Button */}
            {!isUserRated && (
              <button
                onClick={() => setIsOpenReviewForm(true)}
                type="button"
                className="rounded-sm p-2.5 px-10 bg-gray-light/80! hover:text-white! hover:bg-black-lite!"
              >
                Write a Review
              </button>
            )}

            {isUserRated && (
              <span className="rounded-sm p-2.5 px-5 bg-gray-light/80! text-gray font-semibold">
                Thanks for your review
              </span>
            )}
          </div>
        )}

        {/* when there are no reviews of product */}
        {productReviews.length === 0 && (
          <>
            <h1 className="font-semibold text-xl  ">Reviews</h1>
            {!isUserRated && (
              <>
                <p className="text-gray text-sm">
                  {reviews.length > 0
                    ? "Share your review with athor people"
                    : "Be the first to write a review"}
                </p>
                <div className="p-5 rounded-sm bg-gray-light/50 flex-center-col gap-3.5 w-full">
                  <h3>Click To Review:</h3>
                  <div
                    className="flex-start gap-3.5 text-[32px]"
                    onMouseLeave={() => {
                      if (!isClicked) setUserRated(-1);
                    }}
                  >
                    {Array(5)
                      .fill(0)
                      .map((_, index) => {
                        return (
                          <FaStar
                            onClick={() => {
                              setIsClicked(true);
                              setUserRated(index);
                              setIsOpenReviewForm(true);
                            }}
                            onMouseEnter={() => setUserRated(index)}
                            className={`cursor-pointer  ${userRated >= index ? "text-amber-400 scale-130!" : ""}`}
                            key={index}
                          />
                        );
                      })}
                  </div>
                </div>
              </>
            )}
            {isUserRated && <h2>Thanks For Your Review! we proccessing it.</h2>}
          </>
        )}
      </div>
    </>
  );
};

export default RatingsContainer;
