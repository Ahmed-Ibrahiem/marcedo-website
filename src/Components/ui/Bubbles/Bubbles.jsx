import { useLocation } from "react-router-dom";
import { use_pagination_context } from "../../../Context/PaginationProvider";
import "./Bubbles.css";

// Pagination bubbles component (used for navigating between pages)
const Bubbles = () => {
  // Get current route location (used to conditionally render UI)
  const location = useLocation();

  // Get pagination state and updater from context
  const {
    current_package_index,
    set_current_package_index,
    number_of_packages,
  } = use_pagination_context();

  // Alias variables for better readability
  const current_bubbles_index = current_package_index;
  const set_current_bubble_index = set_current_package_index;
  const num_of_rev_pag = number_of_packages;

  // Function to generate pagination bubbles dynamically
  const get_bubbles_details = () => {
    const bubbles = [];

    // If total pages are small, display all page numbers
    if (num_of_rev_pag <= 5) {
      for (let i = 1; i <= num_of_rev_pag; i++) {
        bubbles.push(i);
      }
    } else {
      // Show leading dots if current page is far from the start
      if (current_bubbles_index >= 3) {
        bubbles.push("dots");
      }

      // Add previous, current, and next pages
      for (
        let i = current_bubbles_index - 1;
        i <= current_bubbles_index + 1;
        i++
      ) {
        bubbles.push(i);
      }

      // Show trailing dots if current page is far from the end
      if (current_bubbles_index <= num_of_rev_pag - 2) {
        bubbles.push("dots");
      }
    }

    // Filter out invalid values and keep only valid page numbers and dots
    return bubbles.filter(
      (page) => (page > 0 && page <= num_of_rev_pag) || page == "dots",
    );
  };

  // Handle moving to the next page
  const increase_index = () => {
    if (current_bubbles_index < num_of_rev_pag) {
      set_current_bubble_index((prev) => prev + 1);
    }
  };

  // Handle moving to the previous page
  const decrease_index = () => {
    if (current_bubbles_index > 1) {
      set_current_bubble_index((prev) => prev - 1);
    }
  };

  return (
    <div className="bubbles-container">
      <div className="bubbles-box">
        {/* Previous page button */}
        <button
          className={`${current_bubbles_index > 1 ? "active" : ""}`}
          onClick={decrease_index}
        >
          <i className="fa-solid fa-caret-left left"></i>
        </button>

        {/* Render pagination bubbles */}
        <div className="bubbles">
          {get_bubbles_details().map((bubble, index) => {
            // Render dots between page ranges
            if (bubble == "dots") {
              return <div key={index}>...</div>;
            } else {
              return (
                <div
                  key={index}
                  onClick={() => set_current_bubble_index(bubble)}
                  className={`bubble ${
                    bubble == current_bubbles_index ? "current-bubble" : ""
                  }`}
                >
                  {bubble}
                </div>
              );
            }
          })}
        </div>

        {/* Next page button */}
        <button
          className={`${current_bubbles_index < num_of_rev_pag ? "active" : ""}`}
          onClick={increase_index}
        >
          <i className="fa-solid fa-caret-right right"></i>
        </button>
      </div>

      {/* Show additional text only on product details route */}
      {location.pathname.includes("/product_detials") && (
        <span>See More Reviews</span>
      )}
    </div>
  );
};

export default Bubbles;
