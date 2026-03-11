import { useState } from "react";
import { use_reviews_context } from "../../../../Context/ReviewsProvider";

const Top_Reviews = () => {
  const options = ["Popular", "Global", "Newest", "Helpful"];
  const { sort_type, set_sort_type } = use_reviews_context();
  const [is_sort_menu_active, set_is_sort_menu_active] = useState(false);
  return (
    <div className="top-reviews">
      <h2>Top Reviews</h2>
      <div className="head">
        <p>
          Showing <span className="reviews-showing">3</span> of
          <span className="total-reviews"> 2.3K+</span> Reviews
        </p>
        <div
          className="short-by"
          onClick={() => set_is_sort_menu_active((prev) => !prev)}
        >
          <p>Sort By</p>
          <div className="current-sort">
            <span>{sort_type}</span>
            <i className="fa-solid fa-caret-down"></i>
            <div
              className={`sort-options ${is_sort_menu_active ? "sort-menu-open" : ""}`}
            >
              {options.map((option, index) => {
                return (
                  <p onClick={() => set_sort_type(option)} key={index}>
                    {option}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top_Reviews;
