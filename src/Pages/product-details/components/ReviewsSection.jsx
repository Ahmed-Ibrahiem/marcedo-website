import { useReviewsContext } from "../../../Context/Reviews_Provider";
import RatingsContainer from "./RatingsContainer";
import ReviewsContainer from "./ReviewsContainer";

const ReviewsSection = () => {
  const { productReviews } = useReviewsContext();

  return (
    <>
      {productReviews && (
        <div className="pb-30 px-2.5 lg:px-10 border-b border-border grid lg:grid-cols-12 gap-5 ">
          {/* Start Ratings Display */}
          {<RatingsContainer />}

          {/* Start Reviews Display */}
          <ReviewsContainer />
        </div>
      )}
    </>
  );
};

export default ReviewsSection;
