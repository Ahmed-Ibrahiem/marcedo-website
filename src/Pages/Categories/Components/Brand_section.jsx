import { useEffect, useState } from "react";
import style from "../Categories.module.css";
import { use_categories_context } from "../../../Context/Categories_provider";
import { dresses_brands } from "../../../assets/assets";

const Brand_section = () => {
  // State to control the visibility of the brand filter menu
  const [is_menu_open, set_is_menu_open] = useState(false);
  const [brands_options, set_brands_options] = useState([]);

  // Destructure values from the categories context
  const {
    filter_options,
    update_filter_options,
    current_collection,
    available_brands,
  } = use_categories_context();

  // Function to update selected brands in the filter options
  const update_brands = (option) => {
    update_filter_options(
      { type: "UPDATE_BRANDS", value: option }, // Action object for reducer/dispatch
      "brands", // Additional parameter indicating filter type
    );
  };

  useEffect(() => {
    if (!current_collection) return;
    if (current_collection.slug == "dresses") {
      set_brands_options(dresses_brands);
    }
  }, [current_collection]);

  return (
    <div className={`${style.categories} ${style.section}`}>
      {/* Header/title section that toggles the menu visibility when clicked */}
      <div
        className={style.title}
        onClick={() => {
          set_is_menu_open(!is_menu_open);
        }}
      >
        <h2>Brand</h2>
        {/* Arrow icon that rotates based on menu state */}
        <i
          style={is_menu_open ? { rotate: "180deg" } : {}}
          className="fa-solid fa-angle-up"
        ></i>
      </div>

      {/* Collapsible menu containing brand filter options */}
      <ul
        style={is_menu_open ? { maxHeight: "300px" } : { maxHeight: "0" }}
        className={`${style.section_options}`}
      >
        {/* Map through available brands to create filter checkboxes */}
        {brands_options.map((brand, index) => {
          return (
            <li
              className={`${style.check_selection} ${!available_brands.includes(brand) ? style.not_available : ""}`}
              key={index}
            >
              {/* Checkbox input for each brand */}
              <input
                // Check if this brand is currently selected in filter options
                checked={filter_options.brands.some(
                  (fil_brand) => fil_brand.toLowerCase() == brand.toLowerCase(),
                )}
                type="checkbox"
                id={brand}
                // Update filter when checkbox state changes
                onChange={() => update_brands(brand.toLowerCase())}
              />
              {/* Label for the checkbox with brand name */}
              <label htmlFor={brand}>{brand}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Brand_section;
