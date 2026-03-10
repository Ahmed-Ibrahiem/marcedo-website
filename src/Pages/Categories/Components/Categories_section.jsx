import { Link } from "react-router-dom";
import { popular_categories } from "../../../assets/assets";
import style from "../Categories.module.css";
import { useState } from "react";

const Categories_section = () => {
  // State to control the visibility of the categories menu
  const [is_menu_open, set_is_menu_open] = useState(false);

  return (
    <div className={`${style.section}`}>
      {/* Header/title section that toggles the menu visibility when clicked */}
      <div
        className={style.title}
        onClick={() => {
          set_is_menu_open(!is_menu_open);
        }}
      >
        <h2>Categoires</h2> {/* Note: Typo should be "Categories" */}
        {/* Arrow icon that rotates based on menu state */}
        <i
          style={is_menu_open ? { rotate: "180deg" } : {}}
          className="fa-solid fa-angle-up"
        ></i>
      </div>

      {/* Collapsible menu containing category links */}
      <ul
        style={is_menu_open ? { maxHeight: "450px" } : { maxHeight: "0" }}
        className={` ${style.section_options}`}
      >
        {/* Map through popular_categories data to create navigation links */}
        {popular_categories.map((categories, index) => {
          return (
            <li key={index}>
              {/* Link to category page using React Router */}
              <Link to={`/categories${categories.category_page}`}>
                <p>{categories.category_name}</p> 
                <span>(10)</span> 
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories_section;
