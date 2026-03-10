import { use_categories_context } from "../../../Context/Categories_provider";
import main_style from "../Categories.module.css";
import size_style from "../CSS/Size_section.module.css";
import { useState } from "react";

const Size_section = () => {
  const [is_menu_open, set_is_menu_open] = useState(false);
  const all_size = ["S", "M", "L", "XL", "2XL"];

  const { filter_options, update_filter_options, available_size } =
    use_categories_context();

  // Update size using the main function located in the context.
  const update_size = (option) => {
    update_filter_options({ type: "UPDATE_SIZE", value: option }, "size");
  };
  return (
    <div className={`${main_style.section}`}>
      <div
        className={main_style.title}
        onClick={() => {
          set_is_menu_open(!is_menu_open);
        }}
      >
        <h2>Size</h2>
        <i
          style={is_menu_open ? { rotate: "180deg" } : {}}
          className="fa-solid fa-angle-up"
        ></i>
      </div>
      <ul
        style={is_menu_open ? { maxHeight: "450px" } : { maxHeight: "0" }}
        className={`${main_style.section_options} ${size_style.size_section} `}
      >
        {all_size.map((size, index) => {
          return (
            <li
              key={index}
              className={`${size_style.size_options} 
              ${filter_options.size.includes(size) ? size_style.active : ""} `}
            >
              <button
                className={`${!available_size.includes(size) ? size_style.not_exist : ""}`}
                onClick={() => {
                  if (available_size.includes(size)) update_size(size);
                }}
              >
                {size}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Size_section;
