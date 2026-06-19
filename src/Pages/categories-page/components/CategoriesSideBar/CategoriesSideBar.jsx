import { motion } from "framer-motion";
import CategoriesSeciton from "./CategoriesSection";
import PriceSection from "./PriceSection";
import DynamicOptionsSection from "./DynamicOptionsSection";

const CategoriesSideBar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  categoriesPageInfo,
}) => {
  const price = categoriesPageInfo.price;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      className={`
       ${sidebarStyle}
        ${isSidebarOpen ? "max-2xl:max-w-75!" : ""}
      `}
    >
      {/* Close button */}
      <button
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className={`${closeBtnStyle} `}
      >
        <i className="fa-solid fa-xmark" />
      </button>

      {/* Sidebar content */}
      <div
        className={`${sidebarContentStyle} ${isSidebarOpen ? "max-2xl:px-5!" : ""}`}
      >
        {/* Category */}
        <CategoriesSeciton />
        {/* Price */}
        <PriceSection max={price.max} min={price.min} />
        {/* Other Options */}
        {categoriesPageInfo.options.map((option, index) => (
          <DynamicOptionsSection option={option} key={index} />
        ))}
      </div>
    </motion.aside>
  );
};

const sidebarStyle = `
w-75 max-2xl:fixed relative top-0 left-0 max-2xl:h-full max-2xl:border-r max-2xl:border-border
max-2xl:z-100 max-2xl:bg-white max-2xl:max-w-0 max-2xl:overflow-hidden transition-all duration-300
flex-start-col gap-10
`;

const sidebarContentStyle = `
flex flex-col gap-7.5  max-w-full
max-2xl:max-h-full max-2xl:overflow-y-auto max-2xl:overflow-x-hidden
`;

const closeBtnStyle = `
hidden max-2xl:flex justify-center items-center text-base text-white bg-black
border border-black min-w-8.5 min-h-8.5 rounded-[5px] transition-colors duration-200
z-10 hover:bg-white hover:border-gray hover:text-black self-end mt-2.5 mr-2.5
`;

export default CategoriesSideBar;
