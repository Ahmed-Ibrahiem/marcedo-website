import { useEffect } from "react";
import { use_pagination_context } from "../../../../../Context/Pagination_provider";
import { use_reviews_context } from "../../../../../Context/ReviewsProvider";
import Review_item from "./Review_item";

const Review_area = () => {
  const { filter_reviews } = use_reviews_context();
  const { display_data, set_pagination_data, set_number_of_items_in_package } =
    use_pagination_context();

  useEffect(() => {
    set_pagination_data(filter_reviews);
    set_number_of_items_in_package(4);
  }, [filter_reviews]);

  return (
    <div className="reviews">
      {display_data &&
        display_data.map((rev) => {
          return <Review_item key={rev.id} review_data={rev} />;
        })}
      {display_data.length == 0 && (
        <div className="no_reviews">
          <h2>No Reviews To Showing</h2>
        </div>
      )}
    </div>
  );
};

export default Review_area;
