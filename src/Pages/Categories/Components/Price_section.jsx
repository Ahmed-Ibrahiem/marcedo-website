import { useEffect, useRef, useState } from "react";
import section_style from "../CSS/Price_section.module.css";
import main_style from "../Categories.module.css";
import { use_categories_context } from "../../../Context/CategoriesProvider";

const Price_section = () => {
  // State to control opening and closing the price menu
  const [is_menu_open, set_is_menu_open] = useState(false);

  // Get filter options and dispatch function from context
  const { filter_options, dispatch_filter } = use_categories_context();

  // Get the highest available price from the filter options
  const highest_price = filter_options.price.highest_price;

  // State for minimum and maximum selected price
  const [min_price, set_min_price] = useState(0);
  const [max_price, set_max_price] = useState(highest_price);

  // State to control the progress bar position and width
  const [progress_info, set_progress_width] = useState({
    left: 0,
    width: 100,
  });

  // Ref to access the progress bar DOM element
  const progress_ref = useRef(null);

  // Update progress bar UI based on min and max prices
  const update_progress_UI = () => {
    // Calculate left position as a percentage
    let left = Math.ceil((min_price / highest_price) * 100);

    // Calculate selected price range
    let diff = max_price - min_price;

    // Calculate width as a percentage
    const width = Math.round((diff / highest_price) * 100);

    set_progress_width((prev) => ({ ...prev, left, width }));
  };

  // Update price values inside the global filter context
  const update_price_info = () => {
    const price_info = { ...filter_options.price };

    dispatch_filter({
      type: "UPDATE_PRICE",
      payload: { ...price_info, min: min_price, max: max_price },
    });
  };

  // Run whenever min_price or max_price changes
  useEffect(() => {
    // Update the progress bar UI
    update_progress_UI();

    // Safety check for the ref
    if (!progress_ref.current) return;

    // If min price exceeds max price, hide the progress bar
    if (+min_price > +max_price) {
      progress_ref.current.style.width = "0%";
    }

    // Update global price filter
    update_price_info();
  }, [min_price, max_price]);

  return (
    <div className={`${main_style.categories} ${main_style.section}`}>
      {/* Section title and toggle button */}
      <div
        className={main_style.title}
        onClick={() => {
          set_is_menu_open(!is_menu_open);
        }}
      >
        <h2>Price</h2>
        <i
          style={is_menu_open ? { rotate: "180deg" } : {}}
          className="fa-solid fa-angle-up"
        ></i>
      </div>

      {/* Price menu container (collapsible) */}
      <div
        style={is_menu_open ? { maxHeight: "250px" } : { maxHeight: "0" }}
        className={`${section_style.section_options} ${main_style.section_options}`}
      >
        <div className={section_style.section_content}>
          {/* Range sliders container */}
          <div className={section_style.price_field}>
            {/* Progress bar between the two sliders */}
            <span
              ref={progress_ref}
              style={{
                width: `${progress_info.width}%`,
                left: `${progress_info.left}%`,
              }}
              className={section_style.price_proccess}
            ></span>

            {/* Minimum price range slider */}
            <input
              type="range"
              value={min_price}
              max={highest_price}
              onChange={(e) => set_min_price(+e.target.value)}
            />

            {/* Maximum price range slider */}
            <input
              type="range"
              value={max_price}
              max={highest_price}
              onChange={(e) => set_max_price(+e.target.value)}
            />
          </div>

          {/* Numeric input fields for price */}
          <div className={section_style.price_box}>
            {/* Minimum price input */}
            <div className={section_style.field}>
              <span>$</span>
              <input
                type="number"
                value={min_price}
                onChange={(e) => {
                  set_min_price(+e.target.value);
                }}
              />
            </div>

            <i className="fa-solid fa-angle-right"></i>

            {/* Maximum price input */}
            <div className={section_style.field}>
              <span>$</span>
              <input
                type="number"
                value={max_price}
                onChange={(e) => {
                  set_max_price(+e.target.value);

                  // Prevent exceeding the highest available price
                  if (+e.target.value > highest_price) {
                    set_max_price(+highest_price);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price_section;
