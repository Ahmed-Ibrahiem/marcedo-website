import { Link } from "react-router-dom";
import { useState } from "react";
import { popular_categories } from "../../../../assets/assets";
import { FaAngleUp } from "react-icons/fa6";

const CategoriesSeciton = () => {
  const [is_menu_open, set_is_menu_open] = useState(false);

  return (
    <div className="flex-start-col w-full relative border-b border-border flex-wrap">
      {/* Title */}
      <div
        className="flex-between w-full cursor-pointer"
        onClick={() => set_is_menu_open(!is_menu_open)}
      >
        <h2 className="text-2xl font-normal text-black">Categories</h2>
        <FaAngleUp
          className="transition-all duration-[0.6s]"
          style={{ rotate: is_menu_open ? "180deg" : "0deg" }}
        />
      </div>

      {/* Options list */}
      <ul
        className="w-full flex-start-col overflow-hidden transition-all duration-[0.6s] ease-out gap-3 pl-1 my-5"
        style={{ maxHeight: is_menu_open ? "450px" : "0px" }}
      >
        {popular_categories.map((category, index) => (
          <li key={index} className=" ml-0">
            <Link
              to={`/categories${category.category_page}`}
              className="text-[15px] font-normal flex items-center gap-1.5"
            >
              <p>{category.category_name}</p>
              <span className="text-gray">(10)</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesSeciton;
