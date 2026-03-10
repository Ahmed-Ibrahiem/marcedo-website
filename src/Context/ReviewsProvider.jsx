import { createContext, useContext, useEffect, useState } from "react";
import { use_product_detials_context } from "./Product_details_context";

// Create Reviews Context
const reviews_context = createContext();

const ReviewsProvider = ({ children }) => {
  // Get current product data from Product Details Context
  const { data } = use_product_detials_context();

  // Current selected sort/filter type (Popular, Newest, Positive, Negative, etc.)
  const [sort_type, set_sort_type] = useState("Newest");

  // Reference to product reviews (fallback to empty array)
  const reviews_ref = data.reviews || [];

  // Reviews after applying filter/sort logic
  const [filter_reviews, set_filter_reviews] = useState([]);

  // Reviews that will be displayed on the current page
  const [rev_wil_display, set_rev_wil_display] = useState([]);

  // Filter or sort reviews based on selected sort type
  const handle_filter_reviews = () => {
    // Sort reviews by newest date
    if (sort_type == "Newest") {
      set_filter_reviews(sort_by_newest(reviews_ref));
    } else {
      // Filter reviews by type (case-insensitive)
      set_filter_reviews(
        reviews_ref.filter(
          (rev) => rev.type.toLowerCase() == sort_type.toLowerCase(),
        ),
      );
    }
  };

  // Sort reviews array by newest date first
  const sort_by_newest = (arr = []) => {
    const sort_array = [...arr].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );

    return sort_array;
  };

  // Current pagination index (page number)
  const [current_bubbles_index, set_current_bubble_index] = useState(1);

  // Total number of review pages
  const [num_of_rev_pag, set_num_of_rev_pag] = useState(1);

  // Re-filter reviews when sort type changes
  useEffect(() => {
    handle_filter_reviews();
  }, [sort_type]);

  // Reset pagination when filtered reviews change
  useEffect(() => {
    set_current_bubble_index(1);
    set_num_of_rev_pag(Math.ceil(filter_reviews.length / 2));
  }, [filter_reviews]);

  // Update displayed reviews when page index changes
  useEffect(() => {
    const end = current_bubbles_index * 2;
    const start = end - 2;

    set_rev_wil_display(filter_reviews.slice(start, end));
  }, [current_bubbles_index, num_of_rev_pag]);

  // Values exposed to Reviews Context consumers
  const value = {
    sort_type,
    set_sort_type,
    filter_reviews,
    current_bubbles_index,
    set_current_bubble_index,
    num_of_rev_pag,
    rev_wil_display,
  };

  return (
    <reviews_context.Provider value={value}>
      {children}
    </reviews_context.Provider>
  );
};

// Custom hook to consume Reviews Context
export const use_reviews_context = () => {
  return useContext(reviews_context);
};

export default ReviewsProvider;
