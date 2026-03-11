import style from "../CSS/Products_grid.module.css";
import product_item_style from "../CSS/Product_item.module.css";
import Product_item from "./Product_item";
import { use_products_grid_context } from "../../../Context/ProductsGridProvider";
import { use_pagination_context } from "../../../Context/PaginationProvider";
import { useEffect } from "react";

// Component that displays products in a responsive grid layout with dynamic column sizing
const Products_grid_content = () => {
  // Get the current display mode (2, 4, 6, or 8 columns) from products grid context
  const { current_display } = use_products_grid_context();

  // Get paginated product data and function to set items per page from pagination context
  const { display_data, set_number_of_items_in_package } =
    use_pagination_context();

  // Effect hook to update pagination settings when product data changes
  useEffect(() => {
    // Early return if there's no data to display
    if (display_data.length <= 0) return;

    // Set pagination to display 9 items per page
    set_number_of_items_in_package(9);
  }, [display_data, set_number_of_items_in_package]); // Re-run when display_data or setter function changes

  return (
    <div
      className={`${style.products_grid_content}
        ${current_display === 4 ? product_item_style.grid_2 : ""}
        ${current_display === 6 ? product_item_style.grid_3 : ""}
        ${current_display === 8 ? product_item_style.grid_4 : ""}`}
    >
      {/* Map through paginated products and render each product as a Product_item component */}
      {display_data.map((pro) => (
        <Product_item key={pro.id} data={pro} />
      ))}
    </div>
  );
};

export default Products_grid_content;
