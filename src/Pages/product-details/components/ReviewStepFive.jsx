import { FiCheck } from "react-icons/fi";
import { useReviewsContext } from "../../../Context/Reviews_Provider";
import { useReviewsUIContext } from "../../../Context/ReviewsUIProvider";

const ReviewStepFive = () => {
  const { setUserRated, setCurrentStep, setIsUserRated, setIsOpenReviewForm } =
    useReviewsUIContext();
  return (
    <div className="w-full flex flex-col justify-between h-full py-10 items-center gap-3.5 text-center!">
      <div className="w-full flex-center-col gap-3.5 ">
        <h1 className="text-2xl font-semibold ">Thanks for your review!</h1>
        <p className="text-gray font-semibold">
          We are processing it and it will appear on the store soon.
        </p>
        <p className="text-gray">
          Please confirm you email by clicking the link we just sent you. this
          help us keep reviews authentic.
        </p>
      </div>
      <div className="w-25 h-25 rounded-full flex-center bg-orange text-5xl! text-white shadow-[0_0_0_15px_var(--color-orange-lite)]">
        <FiCheck />
      </div>
      <button
        onClick={() => {
          setCurrentStep((prev) => 1);
          setIsOpenReviewForm(false);
          setUserRated(-1);
          setIsUserRated(true);
        }}
        type="button"
        className="font-semibold py-2.5 px-5 rounded-sm bg-orange-lite! hover:text-white! hover:bg-orange!"
      >
        Done
      </button>
    </div>
  );
};

export default ReviewStepFive;
