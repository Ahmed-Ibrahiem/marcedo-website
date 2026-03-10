import { use_categories_context } from "../../../Context/Categories_provider";
import main_style from "../Categories.module.css";
import { useState } from "react";

const Colors_section = () => {
  // State to manage the collapse/expand toggle of the colors menu
  const [is_menu_open, set_is_menu_open] = useState(false);

  // Destructuring necessary data and dispatch function from the categories context
  const { filter_options, colors_id, update_filter_options } =
    use_categories_context();

  // Update colors using the main function located in the context.
  const update_colors = (option) => {
    update_filter_options({ type: "UPDATE_COLORS", value: option }, "colors");
  };

  const dome_color = [
    { id: 1, name: "Camel", code: "#C19A6B" },
    { id: 2, name: "Terracotta", code: "#E2725B" },
    { id: 3, name: "Mustard Yellow", code: "#FFDB58" },
    { id: 4, name: "Sage Green", code: "#8A9A5B" },
    { id: 5, name: "Beige / Sand", code: "#F5F5DC" },
  ];

  return (
    <div className={` ${main_style.section}`}>
      {/* Accordion header: Toggles the visibility of the color list */}
      <div
        className={main_style.title}
        onClick={() => {
          set_is_menu_open(!is_menu_open);
        }}
      >
        <h2>Colors</h2>
        {/* Dynamic icon rotation based on the menu open/close state */}
        <i
          style={is_menu_open ? { rotate: "180deg" } : {}}
          className="fa-solid fa-angle-up"
        ></i>
      </div>

      {/* Animated list of colors with dynamic maxHeight for the collapse effect */}
      <ul
        style={is_menu_open ? { maxHeight: "450px" } : { maxHeight: "0" }}
        className={` ${main_style.section_options}`}
      >
        {dome_color.map((color, index) => {
          return (
            <li
              key={index}
              className={`${main_style.color_li} `}
              style={
                !colors_id.includes(+color.id)
                  ? { pointerEvents: "none", cursor: "not-allowed" }
                  : {}
              }
            >
              {/* Checkbox input using a CSS Variable (--bg-color) to pass dynamic colors */}
              <input
                checked={filter_options.colors.includes(+color.id)}
                onChange={() => update_colors(color.id)}
                type="checkbox"
                id={color.name}
                className={main_style.color_options}
                style={{ "--bg-color": color.code }}
              />
              <label htmlFor={color.name}>{color.name}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Colors_section;
