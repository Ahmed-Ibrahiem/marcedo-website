import { useState } from "react";
import style from "../CSS/Products_grid.module.css";
import { display_image } from "../../../assets/assets";
import { use_products_grid_context } from "../../../Context/ProductsGridProvider";
import { use_categories_context } from "../../../Context/CategoriesProvider";

const Products_grid_header = () => {
  const [is_sort_open, set_is_sort_open] = useState(false);

  const {
    set_is_sidebar_open,
    current_sort_type,
    set_current_sort_type,
    current_display,
    set_current_display,
  } = use_products_grid_context();

  const sort_options = [
    "Best Selling",
    "Alphabetically, A-Z",
    "Alphabetically, Z-A",
    "Price, low to high",
    "Price, high to low",
    "Date, old to new",
    "Date, new to old",
  ];

  const { set_sort_option } = use_categories_context();

  return (
    <div className={style.head}>
      <div
        className={style.filter_menu_btn}
        onClick={() => set_is_sidebar_open((pre) => !pre)}
      >
        <span>Filter</span>
        <i className="fa-solid fa-filter"></i>
      </div>

      <div
        className={style.sort_options}
        onClick={() => set_is_sort_open(!is_sort_open)}
      >
        <p>{current_sort_type}</p>
        <i
          className="fa-solid fa-angle-right"
          style={is_sort_open ? { rotate: "90deg" } : {}}
        ></i>
        <div
          onClick={() => set_is_sort_open(true)}
          className={`${style.options}  ${is_sort_open ? style.active : ""}`}
        >
          {sort_options.map((option, index) => {
            return (
              <span
                key={index}
                onClick={() => {
                  set_current_sort_type(option);
                  set_sort_option(option);
                }}
              >
                {option}
              </span>
            );
          })}
        </div>
      </div>

      <div className={style.display_options}>
        {display_image.map((btn) => {
          return (
            <button
              key={btn.count}
              className={
                current_display == btn.count ? style.current_display : ""
              }
              onClick={() => set_current_display(btn.count)}
            >
              <img src={btn.image} alt="" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Products_grid_header;
