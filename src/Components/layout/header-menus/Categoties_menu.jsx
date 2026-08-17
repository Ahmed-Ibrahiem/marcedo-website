import React, { useRef, useState, memo } from "react";
import useOutside_click from "../../../Hooks/Outside_click";
import { Link } from "react-router-dom";
import { use_notification_context } from "../../../Context/NotificationProvider";
import { FaAngleDown } from "react-icons/fa6";
import { assets } from "../../../assets/assets";

const categories_options = [
  {
    title: "All Categorais",
  },
  {
    title: "Dress",
    img: assets.dress_img,
    page: "/categories/dresses",
  },
  {
    title: "Phone",
    img: assets.apple_img,
    page: "/categories/phone",
  },
  {
    title: "Electronic",
    img: assets.electronic_img,
    page: "/categories/electronics",
  },
  {
    title: "Perfume",
    img: assets.perfume_img,
    page: "/categories/perfume",
  },
  {
    title: "Smart Watch",
    img: assets.wrist_Watch,
    page: "/categories/smartwatch",
  },
];

const Categoties_menu = () => {
  const { add_message } = use_notification_context();
  const [current_category, setCurrent_category] = useState("All Categories");
  const [categories_menu, setCategories_menu] = useState(false);

  const menu_ref = useRef(null);
  useOutside_click(menu_ref, () => setCategories_menu(false));

  return (
    <div
      ref={menu_ref}
      className={`categories ${categories_menu ? "show_category_menu" : ""}`}
      onClick={(e) => {
        setCategories_menu((prev) => (prev ? false : true));
      }}
    >
      <div className="current_option">
        <span>{current_category}</span>
      </div>
      <FaAngleDown />
      <div className={`category_options`}>
        {categories_options.map((option, index) => {
          return (
            <Link
              to={option.page}
              key={index}
              className="option"
              onClick={() => {
                setCurrent_category(option.title);
              }}
            >
              <p>{option.title}</p>
              {option.img && (
                <img src={option.img} alt={option.title} loading="lazy" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(Categoties_menu);
