import { useState } from "react";
import style from "../Categories.module.css";
import { use_categories_context } from "../../../Context/Categories_provider";

const Availability_section = () => {
  // State to control the visibility of the availability filter menu
  const [is_menu_open, set_is_menu_open] = useState(false);

  // Destructure values from the categories context
  const { filter_options, update_filter_options, stock_nums } =
    use_categories_context();

  // Function to update availability filter options
  const update_options = (option) => {
    update_filter_options(
      { type: "TOGGLE_AVAILIBILITY", value: option },
      "availability",
    );
  };

  return (
    <div className={`${style.categories} ${style.section}`}>
      {/* Header/title section that toggles the menu visibility when clicked */}
      <div
        className={style.title}
        onClick={() => {
          set_is_menu_open(!is_menu_open);
        }}
      >
        <h2>Availability</h2>
        {/* Arrow icon that rotates based on menu state */}
        <i
          style={is_menu_open ? { rotate: "180deg" } : {}}
          className="fa-solid fa-angle-up"
        ></i>
      </div>

      {/* Collapsible menu containing availability filter options */}
      <ul
        style={is_menu_open ? { maxHeight: "150px" } : { maxHeight: "0" }}
        className={`${style.section_options}`}
      >
        {/* "In stock" filter option */}
        <li
          className={`${style.check_selection} ${stock_nums.in_stock.length == 0 ? style.not_available : ""}`}
        >
          <input
            // Check if "in-stock" is currently selected in filter options
            checked={filter_options.availability.includes("in-stock")}
            type="checkbox"
            id="in_stock"
            // Update filter when checkbox is toggled
            onChange={() => update_options("in-stock")}
          />
          <label htmlFor="in_stock">In stock</label>
        </li>

        {/* "Out of stock" filter option */}
        <li
          className={`${style.check_selection} ${stock_nums.out_stock.length == 0 ? style.not_available : ""}`}
        >
          <input
            // Check if "out-stock" is currently selected in filter options
            checked={filter_options.availability.includes("out-stock")}
            type="checkbox"
            id="out_of_stock"
            // Update filter when checkbox is toggled
            onChange={() => update_options("out-stock")}
          />
          <label htmlFor="out_of_stock">Out of stock</label>
        </li>
      </ul>
    </div>
  );
};

export default Availability_section;
