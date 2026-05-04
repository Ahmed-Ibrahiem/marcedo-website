import { useEffect, useState } from "react";
import style from "../Shop_page.module.css";
import { use_shop_context } from "../../../Context/ShopProvider";
import { use_pagination_context } from "../../../Context/PaginationProvider";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

export const Collections_grid = () => {
  const [loaded, setLoaded] = useState(false);

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
    <motion.div className={style.collections_grid}>
      {/* Render collections only if display data exists */}
      {display_data &&
        display_data.map((data) => {
          return (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3, once: true }}
              key={data.id}
            >
              <Link to={data.slug} className={style.collection}>
                {/* Collection image */}
                {!loaded && (
                  <div className={style.skeletonImage}>
                    <Skeleton height="100%" width="100%" />
                  </div>
                )}
                <div>
                  <img
                    onLoad={() => setLoaded(true)}
                    src={data.image}
                    alt={`This Image Of ${data.title}`}
                    loading="lazy"
                    style={{ opacity: loaded ? 1 : 0 }}
                  />
                </div>

                {/* Collection title */}
                <span className={style.title}>{data.title}</span>

                {/* Action button with hover effect */}
                <button
                  onMouseEnter={() => set_has_hover(true)} // Trigger hover state
                  onMouseLeave={() => set_has_hover(false)} // Remove hover state
                  className="action"
                >
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </Link>
            </motion.div>
          );
        })}
    </motion.div>
  );
};
