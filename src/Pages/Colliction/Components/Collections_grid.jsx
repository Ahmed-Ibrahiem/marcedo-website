import { useEffect, useState } from "react";
import style from "../Shop_page.module.css";
import { use_shop_context } from "../../../Context/ShopProvider";
import { use_pagination_context } from "../../../Context/PaginationProvider";
import { Link } from "react-router-dom";

export const Collections_grid = () => {
  // State to track hover effect on button
  const [has_hover, set_has_hover] = useState(false);

  // Destructure functions and data from pagination context
  const { set_pagination_data, display_data, set_number_of_items_in_package } =
    use_pagination_context();

  // Get all collections data from shop context
  const { all_collections } = use_shop_context();

  // Effect runs when collections data changes
  useEffect(() => {
    // If no data exists, stop execution
    if (all_collections.length <= 0) return;

    // Set the pagination data using all collections
    set_pagination_data(all_collections);

    // Define how many items to show per page
    set_number_of_items_in_package(9);
  }, [all_collections]);

  return (
    <div className={style.collections_grid}>
      {/* Render collections only if display data exists */}
      {display_data &&
        display_data.map((data) => {
          return (
            <Link key={data.id} to={data.slug} className={style.collection}>
              {/* Collection image */}
              <img src={data.image} alt={`This Image Of ${data.title}`} />

              {/* Collection title */}
              <span>{data.title}</span>

              {/* Action button with hover effect */}
              <button
                onMouseEnter={() => set_has_hover(true)} // Trigger hover state
                onMouseLeave={() => set_has_hover(false)} // Remove hover state
                className="action"
              >
                {/* Show different icon based on hover state */}
                {has_hover && <img src="/src/assets/right-up.png" alt="" />}
                {!has_hover && (
                  <img src="/src/assets/right-up-black.png" alt="" />
                )}
              </button>
            </Link>
          );
        })}
    </div>
  );
};
