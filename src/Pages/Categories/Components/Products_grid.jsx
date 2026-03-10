import style from "../CSS/Products_grid.module.css";
import Products_grid_header from "./Products_grid_header";
import Products_grid_content from "./Products_grid_content";
import { useEffect } from "react";
import { use_products_grid_context } from "../../../Context/Products_grid_provider";
import { use_categories_context } from "../../../Context/Categories_provider";
import Bubbles from "../../../Components/Product Details Page Components/Product info components/Bubbles/Bubbles";
import { use_pagination_context } from "../../../Context/Pagination_provider";
import Quick_view from "./Quick_view";

const Products_grid = () => {
  // Extracting display state and its setter from the custom context hook
  const { current_display, set_current_display, is_quick_view_open } =
    use_products_grid_context();
  const { set_pagination_data } = use_pagination_context();
  const { filter_products } = use_categories_context();

  useEffect(() => {
    if (filter_products.length == 0) return;
    set_pagination_data(filter_products);
  }, [filter_products]);

  useEffect(() => {
    /**
     * Define the logic to handle window resizing.
     * Checks the current window width and updates the display count
     * if it meets specific responsive design conditions.
     **/
    const handle_resize = () => {
      const size_screen = window.innerWidth;

      if (size_screen <= 1150 && current_display == 8) {
        set_current_display(6);
      } else if (size_screen <= 768) {
        set_current_display(2);
      }
    };

    // Attach the resize event listener to the window object
    window.addEventListener("resize", handle_resize);

    /**
     * Cleanup function:
     * Removes the event listener whenever the component unmounts
     * or before re-running the effect due to dependency changes.
     **/
    return () => window.removeEventListener("resize", handle_resize);

    // The effect re-syncs whenever current_display changes to avoid stale closures
  }, [current_display]);

  return (
    <div className={style.products_grid}>
      <Products_grid_header />
      <Products_grid_content />
      <Bubbles />
      {is_quick_view_open && <Quick_view />}
    </div>
  );
};

export default Products_grid;
