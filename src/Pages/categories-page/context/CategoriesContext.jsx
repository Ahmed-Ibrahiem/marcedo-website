import React, { useCallback, useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  getCategoriesPageInfo,
  getFilterProducts,
} from "../../../services/categoriesPageServices";

// Create Categories Context
const categoriesContext = createContext(null);

// use Categories Context
export const useCategoriesContext = () => {
  return useContext(categoriesContext);
};

// Categories Provider
const CategoriesProvider = ({ children }) => {
  const { categorySlug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categoriesPageInfo, setCategoriesPageInfo] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleFilterChange = useCallback(
    (key, value) => {
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
    },
    [activeFilters],
  );

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const categoriesInfo = await getCategoriesPageInfo(categorySlug);
        // console.log(categoriesInfo)

        if (categoriesInfo) setCategoriesPageInfo(categoriesInfo);
      } catch (error) {
        console.error("Get category error:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, [categorySlug]);

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
    if (!categoriesPageInfo) return;

    const getProducts = async () => {
      const products = await getFilterProducts(
        activeFilters,
        categoriesPageInfo.variants,
        categoriesPageInfo.products,
      );

      if (products) setFilteredProducts(products);
    };

    getProducts();
  }, [activeFilters, categoriesPageInfo]);

  const value = {
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    isSidebarOpen,
    setIsSidebarOpen,
    categoriesPageInfo,
    setCategoriesPageInfo,
    activeFilters,
    setActiveFilters,
    handleFilterChange,
    filteredProducts,
    setFilteredProducts,
  };

  return (
    <categoriesContext.Provider value={value}>
      {children}
    </categoriesContext.Provider>
  );
};

export default CategoriesProvider;
