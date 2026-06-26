import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import ProductAdminHead from "./components/ProductAdminHead";
import ProductStatsCards from "./components/ProductStatsCards";
import {
  getAllBrands,
  getAllCategoreis,
  getLimitedProducts,
  getProductsStats,
  getProductsWithPaginations,
} from "../../services/ProductsDashboardServices";
import ProductsActions from "./products-components/ProductsActions";
import ProductsTable from "./products-components/ProductsTable";
import { getAllProducts } from "../../services/ProductsServices";
import TableControlsBtns from "./products-components/TableControlsBtns";
import ProductsGrid from "./products-components/ProductsGrid";
import { useProductsTableControlContext } from "./context/ProductsTableControl";
import SelectedProductsContorls from "./products-components/SelectedProductsContorls";
import { exportAllProductsToExcel } from "../../Utils/excelExport";

const initailFilter = {
  categories: { name: "All Categories", id: "all-categories" },
  brands: { name: "All Brands", id: "all-brands" },
  status: { name: "All Status", id: "all-status" },
  stocks: { name: "All Stocks", id: "all-stocks" },
  sort: { name: "Newest", id: "newest" },
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
  const [filterProducts, setFilterProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [displayProducts, setDisplayProducts] = useState(null);
  const {
    setSelectedProductsIds,
    selectedProductsIds,
    selectedAllProducts,
    setSelectedAllProducts,
    handleAllSelectedProducts,
  } = useProductsTableControlContext();
  const [tableMode, setTableMode] = useState(true);
  const [filterOptions, dispatchFilterOptions] = useReducer(
    filterReducer,
    initailFilter,
  );

  const updateFilterOptions = useCallback((type, payload) => {
    dispatchFilterOptions({ type: type, payload: payload });
  }, []);
  
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const products = await getProductsWithPaginations(filterOptions);

        if (products) {
          setFilterProducts(products);
        }
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };

    setSelectedProductsIds([]);
    getProducts();
  }, [filterOptions]);

  useEffect(() => {
    if (filterProducts) {
      handleAllSelectedProducts(filterProducts);
    }
  }, [selectedAllProducts, filterProducts]);

  const handleExportSelectedProducts = useCallback(async () => {
    const products = filterProducts.filter((pro) =>
      selectedProductsIds.includes(pro.id),
    );

    if (products.length === 0) return;

    setLoading(true);
    try {
      await exportAllProductsToExcel(products);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [filterProducts, selectedProductsIds]);

  const handleExportFilterProducts = useCallback(async () => {
    setLoading(true);
    try {
      await exportAllProductsToExcel(filterProducts);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [filterProducts]);

  return (
    <>
      <section className="flex-start-col w-full gap-2.5 h-full max-w-full ">
        {/* Page Header */}
        <ProductAdminHead
          handleExportSelectedProducts={handleExportSelectedProducts}
          handleExportFilterProducts={handleExportFilterProducts}
        />
        {/* Products Stats */}
        <ProductStatsCards />
        {/* Prodcuts Actions */}
        <div className="bg-white  rounded-sm w-full max-w-full! flex-start-col grow shadow-sm relative">
          <ProductsActions
            setTableMode={setTableMode}
            tableMode={tableMode}
            filterProducts={filterProducts}
            filterOptions={filterOptions}
            updateFilterOptions={updateFilterOptions}
          />

          {/* Products table */}
          <div className="relative w-full max-h-84 lg:max-h-81.25 min-h-75 grow last-of-type:border-b-0 overflow-auto border-y border-border fade-in-animate">
            {loading && (
              <div className="w-full h-full flex-center absolute top-0 left-0 bg-white z-50">
                <span>Loading...</span>
              </div>
            )}

            {isError && (
              <div className="w-full h-full  flex-center">
                <span>Something Went Wrong</span>
              </div>
            )}

            {displayProducts?.length > 0 && (
              <>
                {tableMode && (
                  <ProductsTable
                    productsData={displayProducts}
                    filterProducts={filterProducts}
                  />
                )}
                {!tableMode && <ProductsGrid productsData={displayProducts} />}
              </>
            )}

            {filterProducts?.length === 0 && (
              <div className="w-full h-full flex-center text-lg text-black-lite font-bold">
                There are no products with these specifications.
              </div>
            )}
          </div>

          {/* pagination btns */}
          {filterProducts && (
            <TableControlsBtns
              filterProducts={filterProducts}
              setDisplayProducts={setDisplayProducts}
            />
          )}

          {/* Products Selected Actions */}
          {selectedProductsIds.length > 0 && <SelectedProductsContorls />}
        </div>
      </section>
    </>
  );
};

export default ProductsAdmin;
