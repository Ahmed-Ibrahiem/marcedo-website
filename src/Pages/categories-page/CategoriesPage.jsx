import React, { useEffect, useState } from "react";
import Our_banner from "../../Components/ui/our-banner/Our_banner";
import { useParams } from "react-router-dom";
import { getCategoryBySlug } from "../../services/CategoriesServices";
import { getProductsByCategories } from "../../services/ProductsServices";
import {
  getCategoriesPageInfo,
  getFilterProducts,
} from "../../services/categoriesPageServices";
import LoadingScreen from "../../Components/ui/Loading/LoadingScreen";
import CategoriesSideBar from "./components/CategoriesSideBar/CategoriesSideBar";
import CategoriesContent from "./components/CategoriesContent/CategoriesContent";

const CategoriesPage = () => {
  const { categorySlug } = useParams();
  const [categoriesPageInfo, setCategoriesPageInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  const handleFilterChange = (key, value) => {
    setActiveFilters((prev) => {
      if (prev.variants) {
        const currentValue = activeFilters.variants[key] || [];

        if (currentValue.includes(value)) {
          const updated = currentValue.filter((item) => item !== value);
          const copy = {
            ...prev,
            variants: { ...prev.variants, [key]: updated },
          };
          if (updated.length === 0) delete copy.variants[key];
          return copy;
        } else {
          return {
            ...prev,
            variants: { ...prev.variants, [key]: [...currentValue, value] },
          };
        }
      } else {
        return {
          ...prev,
          variants: { [key]: [value] },
        };
      }
    });
  };

  useEffect(() => {
    if (!categoriesPageInfo) return;
    setActiveFilters((prev) => ({
      ...prev,
      price: {
        min: categoriesPageInfo.price.min,
        max: categoriesPageInfo.price.max,
      },
    }));
  }, [categoriesPageInfo]);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const categoriesInfo = await getCategoriesPageInfo(categorySlug);

        if (categoriesInfo) setCategoriesPageInfo(categoriesInfo);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, [categorySlug]);

  useEffect(() => {
    if (!categoriesPageInfo) return;
    const getProducts = async () => {
      const products = await getFilterProducts(
        activeFilters,
        categoriesPageInfo.variants,
        categoriesPageInfo.products,
      );
    };

    getProducts();
  }, [activeFilters]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      {!isLoading && !isError && categoriesPageInfo && (
        <div>
          <Our_banner page_data={{ title: "Categories" }} />
          <div className="categories-container container mt-10 flex gap-12.5">
            <CategoriesSideBar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              categoriesPageInfo={categoriesPageInfo}
              activeFilters={activeFilters}
              handleFilterChange={handleFilterChange}
              setActiveFilters={setActiveFilters}
            />
            <CategoriesContent
              max={categoriesPageInfo.price.max}
              min={categoriesPageInfo.price.min}
              setIsSidebarOpen={setIsSidebarOpen}
              filterProducts={categoriesPageInfo.products}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CategoriesPage;
