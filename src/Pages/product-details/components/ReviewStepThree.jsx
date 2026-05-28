import { FaArrowLeft, FaStar, FaXmark } from "react-icons/fa6";
import { useReviewsContext } from "../../../Context/Reviews_Provider";
import { useReviewsUIContext } from "../../../Context/ReviewsUIProvider";

const ReviewStepThree = () => {
  const { setIsOpenReviewForm, productData } = useReviewsContext();
  const { setCurrentStep } = useReviewsUIContext();
  return (
    <div className="review-content w-full flex flex-col justify-between pt-7.5 pb-1.5  gap-5 h-full fade-in-animate">
      {/* heading */}
      <div className="w-full flex-center-col gap-2.5">
        <h1 className="text-xl font-semibold">About You</h1>
        {/* Stars rating */}
        <p>Please tell us more about you.</p>
      </div>

      {/* Content input */}
      <div className="w-full flex-start-col gap-5 -mt-20">
        <div className="flex-start-col gap-2.5 w-full">
          <label className="text-sm font-semibold" htmlFor="email">
            Email (required)
          </label>
          <input
            type="text"
            id="email"
            className="w-full border border-border py-2.5 outline-none focus:border-gray/80 px-4 rounded-sm text-sm"
          />
        </div>

        <div className="flex-start-col gap-2.5 w-full">
          <label className="text-sm font-semibold" htmlFor="displayName">
            Display name (required)
          </label>
          <input
            type="text"
            id="displayName"
            className="w-full border border-border py-2.5 outline-none focus:border-gray/80 px-4 rounded-sm text-sm"
          />
        </div>
        {/* Terms and policy */}
        <div className="flex-start gap-2.5">
          <input type="checkbox" id="anonymous" />
          <label className="text-sm font-semibold" htmlFor="anonymous">
            Post review as anonymous
          </label>
        </div>
      </div>

      {/* action buttons */}
      <div className="flex-between w-full mt-10">
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

export default ReviewStepThree;
