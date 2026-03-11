import style from "./Categories.module.css";
import Our_banner from "../../Components/ui/our-banner/Our_banner";
import { use_categories_context } from "../../Context/CategoriesProvider";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../../Components/ui/Loading/Loading";
import Products_grid from "./Components/Products_grid";
import Products_grid_provider from "../../Context/ProductsGridProvider";
import Sidebar from "./Components/Sidebar";
import Pagination_provider from "../../Context/PaginationProvider";

/**
 * Main Categories Page Component
 **/
const Categories = () => {
  // Global state for the currently selected collection
  const { current_collection, set_current_collection } =
    use_categories_context();

  // Local states for handling API loading and error status
  const [is_loading, set_is_loading] = useState(false);
  const [is_worning, set_is_worning] = useState(false);

  // Extract the category type from the URL parameters
  const collection_slug = useParams();

  // Logic to find and set the specific collection from the fetched list
  const get_current_collection = (arr) => {
    if (!arr) set_is_worning(true);
    const collection = arr.find(
      (col) => col.slug === collection_slug.category_type,
    );
    set_current_collection(collection);
  };

  // Fetch collections data whenever the URL category changes
  useEffect(() => {
    try {
      set_is_loading(true);
      const get_data = async () => {
        const req = await axios.get("/collections.json");
        if (req.status === 200) {
          set_is_loading(false);
          const collections = req.data;
          get_current_collection(collections);
        }
      };
      get_data();
    } catch {
      set_is_loading(false);
      set_is_worning(true);
    }
  }, [collection_slug.category_type]);

  return (
    <div className={style.categories_page}>
      {/* Provider to manage state for the Sidebar and Product Grid specifically */}
      <Products_grid_provider>
        <div className="container">
          <Our_banner page_data={{ title: "Dress" }} />

          {/* Conditional Rendering: Show loader while fetching data */}
          {is_loading && <Loading />}

          {/* Conditional Rendering: Show error message if fetch fails */}
          {!is_loading && is_worning && <p>Something Went Wrong</p>}

          {/* Render content only when loading is finished and data is valid */}
          {!is_loading && !is_worning && current_collection && (
            <div className={style.categories_area_content}>
              <Sidebar />
              <Pagination_provider>
                <Products_grid />
              </Pagination_provider>
            </div>
          )}
        </div>
      </Products_grid_provider>
    </div>
  );
};

export default Categories;
