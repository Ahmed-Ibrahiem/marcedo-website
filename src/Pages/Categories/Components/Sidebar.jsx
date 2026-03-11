import Categories_section from "./Categories_section";
import Availability_section from "./Availability_section";
import Price_section from "./Price_section";
import Colors_section from "./Colors_section";
import Size_section from "./Size_section";
import Brand_section from "./Brand_section";
import style from "../Categories.module.css";
import { use_products_grid_context } from "../../../Context/ProductsGridProvider";
import { use_categories_context } from "../../../Context/CategoriesProvider";

/**
 * Sidebar component for product filtering
 **/
const Sidebar = () => {
  // Get sidebar visibility state and toggle function from context
  const { is_sidebar_open, set_is_sidebar_open } = use_products_grid_context();

  // Get available filter data to determine which sections to display
  const { colors_id, available_size, available_brands } =
    use_categories_context();

  return (
    /**
     * Main sidebar container
     * Dynamically applies the 'sidebar_open' class based on state
     **/
    <aside
      className={`${style.sidebar} ${is_sidebar_open ? style.sidebar_open : ""}`}
    >
      {/* Close button to hide the sidebar */}
      <button
        className={style.close_sidebar}
        onClick={() => set_is_sidebar_open(!is_sidebar_open)}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>

      {/* Wrapper for all filter sections */}
      <div className={style.sidebar_content}>
        {/* Constant filter sections */}
        <Categories_section />
        <Availability_section />
        <Price_section />

        {/* Conditional filter sections: only render if data exists */}
        {colors_id.length != 0 && <Colors_section />}
        {available_size.length != 0 && <Size_section />}
        {available_brands.length != 0 && <Brand_section />}
      </div>
    </aside>
  );
};

export default Sidebar;
