import style from "./Categories.module.css";
import Our_banner from "../../Components/ui/our-banner/Our_banner";
import { useParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../../Components/ui/Loading/Loading";
import Products_grid from "./Components/Products_grid";
import Products_grid_provider from "../../Context/ProductsGridProvider";
import Sidebar from "./Components/Sidebar";
import Pagination_provider from "../../Context/PaginationProvider";
import { getCollectionBySlag } from "../../services/collectionsServices";

/**
 * Main Categories Page Component
 **/
const Categories = () => {
 
  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

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
