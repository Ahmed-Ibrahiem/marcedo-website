import React, { memo, useEffect, useReducer, useState } from "react";
import ProductAdminHead from "./components/ProductAdminHead";
import ProductStatsCards from "./components/ProductStatsCards";
import {
  getLimitedProducts,
  getProductsStats,
} from "../../services/ProductsDashboardServices";
import ProductsActions from "./products-components/ProductsActions";
import ProductsTable from "./products-components/ProductsTable";
import { getAllProducts } from "../../services/ProductsServices";

const initailFilter = {
  categories: { title: "All Categories", type: "all-categories" },
  brands: { title: "All Brands", type: "all-brands" },
  status: { title: "All Status", type: "all-status" },
  stocks: { title: "All Stocks", type: "all-stocks" },
  sort: { title: "Newest", type: "newest" },
  limit: { start: 0, end: 5 },
};

const filterReducer = (state, action) => {
  const options = {
    UPDATE_CATEGORIES: "categories",
    UPDATE_BRANDS: "brands",
    UPDATE_STATUS: "status",
    UPDATE_STOCKS: "stocks",
    UPDATE_SORT: "sort",
  };

  if (options[action.type])
    return { ...state, [options[action.type]]: action.payload };
};

const ProductsAdmin = () => {
  const [currentProducts, setCurrentProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [filterOptions, dispatchFilterOptions] = useReducer(
    filterReducer,
    initailFilter,
  );

  const updateFilterOptions = (type, payload) => {
    dispatchFilterOptions({ type: type, payload: payload });
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const products = await getLimitedProducts(5);
        if (products) setCurrentProducts(products);
      } catch {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <>
      {loading && (
        <div className="w-full h-full flex-center">
          <span>Loading...</span>
        </div>
      )}

      {isError && (
        <div className="w-full h-full flex-center">
          <span>Something Went Wrong</span>
        </div>
      )}
      {!loading && !isError && currentProducts && (
        <section className="flex-start-col w-full gap-2.5 h-full max-w-full ">
          {/* Page Header */}
          <ProductAdminHead />
          {/* Products Stats */}
          <ProductStatsCards />
          {/* Prodcuts Actions */}
          <div className="bg-white  rounded-sm w-full max-w-full! flex-start-col gap-2.5 grow shadow-sm ">
            <ProductsActions
              filterOptions={filterOptions}
              updateFilterOptions={updateFilterOptions}
            />
            {/* Products table */}
            <ProductsTable productsData={currentProducts} />
            {/* pagination btns */}
          </div>
        </section>
      )}
    </>
  );
};

export default React.memo(ProductsAdmin);
