import { useState } from "react";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegFlag, FaFlag } from "react-icons/fa6";
import React from "react";

const ReviewBox = ({ review, style }) => {
  const [isReviewLike, setIsReviewLike] = useState(false);
  const [isReviewFlag, setIsReviewFlag] = useState(false);

  return (
    <div
      className={`flex flex-wrap gap-5 w-full py-7.5 border-b border-border ${style || ""}`}
    >
      <div className="min-w-18! w-18 min-h-18! h-18 rounded-full overflow-hidden flex-center relative">
        <img
          className="w-full object-contain "
          src={review.user_image}
          loading="lazy"
        />
      </div>
      {/* Review Content */}
      <div className="content text-sm flex-start-col gap-2.5 grow">
        {/* Head */}
        <div className="head flex-between gap-2.5 w-full flex-wrap">
          <div className="flex-start gap-3 flex-wrap">
            <h1 className="font-semibold">{review.user_name}</h1>
            {review.verfied && (
              <div className="flex-start gap-1">
                <FaCheckCircle className="text-green" />
                <p className="text-gray">Verfied Buyer</p>
              </div>
            )}
          </div>
          <div className="flex-start gap-1 text-xl text-amber-400">
            {Array(Math.floor(review.rating))
              .fill(0)
              .map((_, index) => {
                return <FaStar key={index} />;
              })}
          </div>
        </div>
        {/* Review Date */}
        <h4 className="text-gray">{review.created_at}</h4>

        {/* Review Tags */}
        <div className="tags flex-start gap-2.5 flex-wrap">
          {review.tags.map((tag, index) => {
            return (
              <span
                key={index}
                className="py-1.5 px-5 rounded-sm bg-gray-light text-gray font-semibold"
              >
                {tag}
              </span>
            );
          })}
        </div>

        {/* review comment */}
        <p>{review.comment}</p>

        {/* review usefull */}
        <div className="flex-between gap-2.5 w-full text-gray! flex-wrap">
          <p>Was this review usefull?</p>
          <div className="flex-start gap-5">
            {/* review like */}
            <button
              className={` ${isReviewLike ? "scale-120 duration-150" : ""}`}
              type="button"
              onClick={() => setIsReviewLike(true)}
            >
              {isReviewLike ? (
                <BiSolidLike size={20} className="text-green!" />
              ) : (
                <BiLike size={20} />
              )}
            </button>
            {/* review flag */}
            <button
              type="button"
              className={`${isReviewFlag ? "scale-120 duration-100" : ""}`}
              onClick={() => setIsReviewFlag(true)}
            >
              {isReviewFlag ? (
                <FaFlag size={18} className="text-green!" />
              ) : (
                <FaRegFlag size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ReviewBox);
