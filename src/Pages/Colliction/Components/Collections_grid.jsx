import React, { useEffect, useRef, useState, memo } from "react";
import style from "../Shop_page.module.css";
import { use_pagination_context } from "../../../Context/PaginationProvider";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import { Loading } from "../../../Components/ui/Loading/Loading";
import { getCollections } from "../../../services/collectionsServices";
import { RiArrowRightUpLongLine } from "react-icons/ri";

export const Collections_grid = () => {
  const [loaded, setLoaded] = useState(false);

  // Destructure functions and data from pagination context
  const { set_pagination_data, display_data, set_number_of_items_in_package } =
    use_pagination_context();

  // State to store all collections data
  const [all_collections, set_all_collections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Ref used to prevent multiple API calls (simulate componentDidMount behavior)
  const is_render_done = useRef(false);

  // Fetch collections data once when the component mounts
  useEffect(() => {
    // Prevent re-running the effect on re-renders
    if (is_render_done.current) return;

    is_render_done.current = true;

    // Async function to fetch data from API
    const get_data = async () => {
      setLoading(true);
      try {
        const data = await getCollections();

        // Check if request is successful
        if (data) {
          // Update state with fetched data
          set_all_collections(data);
        }
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };
    // Call the async function
    get_data();
  }, []);

  // Effect runs when collections data changes
  useEffect(() => {
    // If no data exists, stop execution
    if (all_collections.length <= 0) return;

    // Set the pagination data using all collections
    set_pagination_data(all_collections);

    // Define how many items to show per page
    set_number_of_items_in_package(9);
  }, [all_collections]);

  if (loading) {
    return <Loading />;
  }

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
                <button className="action hover:text-white!">
                  <RiArrowRightUpLongLine size={25} />
                </button>
              </Link>
            </motion.div>
          );
        })}
    </motion.div>
  );
};

export default React.memo(Collections_grid);
