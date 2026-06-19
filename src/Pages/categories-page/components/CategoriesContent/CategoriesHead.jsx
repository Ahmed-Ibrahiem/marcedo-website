import { useState } from "react";
import { motion } from "framer-motion";
import { display_image } from "../../../../assets/assets";
import { use_products_grid_context } from "../../../../Context/ProductsGridProvider";

const CategoriesHead = ({
  setIsSidebarOpen,
  gridMode,
  setGridMode,
  selectedSort,
  setSelectedSort,
}) => {
  const [is_sort_open, set_is_sort_open] = useState(false);

  const sort_options = [
    "best selling",
    "alphabetically, a-z",
    "alphabetically, z-a",
    "price, low to high",
    "price, high to low",
    "date, old to new",
    "date, new to old",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex-between gap-5 flex-wrap"
    >
      {/* Filter button - hidden by default, shows on <= 1350px */}
      <div
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className="
          flex-between 2xl:hidden! 
          px-3.75 py-2.5 border border-border
          text-sm rounded-[5px] gap-7.5 w-fit cursor-pointer
        "
      >
        <span>Filter</span>
        <i className="fa-solid fa-filter" />
      </div>

      {/* Sort dropdown */}
      <div
        onClick={() => set_is_sort_open(!is_sort_open)}
        className="
          flex items-center justify-between
          px-3.75 py-2.5 border border-border
          text-sm rounded-[5px] gap-2.5 min-w-42.5
          cursor-pointer relative capitalize
        "
      >
        <p>{selectedSort}</p>
        <i
          className="fa-solid fa-angle-right transition-all duration-300"
          style={{ rotate: is_sort_open ? "90deg" : "0deg" }}
        />

        {/* Dropdown options */}
        <div
          className={`
            absolute w-full top-full left-0 z-10
            flex flex-col p-1.5
            border border-border rounded-[5px]
            bg-white cursor-pointer
            transition-all duration-200
            ${is_sort_open ? "visible opacity-100" : "invisible opacity-0"}
          `}
        >
          {sort_options.map((option, index) => (
            <span
              key={index}
              className="
                text-sm px-1.5 py-1.5 text-gray capitalize
                hover:bg-gray-light hover:text-black 
              "
              onClick={() => setSelectedSort(option)}
            >
              {option}
            </span>
          ))}
        </div>
      </div>

      {/* Display options - hidden on <= 768px */}
      <div className="w-fit flex items-center gap-5 max-[765px]:hidden">
        {display_image.map((btn) => (
          <button
            key={btn.count}
            onClick={() => setGridMode(btn.count)}
            className={`
              border-none outline-none cursor-pointer transition-opacity duration-200
              max-[1024px]:last:hidden
              ${gridMode === btn.count ? "opacity-100" : "opacity-25"}
            `}
          >
            <img src={btn.image} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoriesHead;
