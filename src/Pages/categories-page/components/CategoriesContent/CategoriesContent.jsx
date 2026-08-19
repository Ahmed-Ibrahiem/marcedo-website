import React, { useEffect, useState, memo } from "react";
import CategoriesHead from "./CategoriesHead";
import ProductsGridOfCategories from "../ProductsGridOfCategories";
import PaginationBtns from "./PaginationBtns";
import { sortProducts } from "../../../../services/categoriesPageServices";
import { useCategoriesContext } from "../../context/CategoriesContext";

const CategoriesContent = ({}) => {
  const { filteredProducts, setActiveFilters, categoriesPageInfo } =
    useCategoriesContext();
  const [gridMode, setGridMode] = useState(2);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedSort, setSelectedSort] = useState("best selling");

  useEffect(() => {
    if (!filteredProducts) return;
    const products = sortProducts(filteredProducts, selectedSort);
    setSortedProducts(products);
  }, [filteredProducts, selectedSort]);

  return (
    <div className="grow">
      <CategoriesHead
        gridMode={gridMode}
        setGridMode={setGridMode}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
      <ProductsGridOfCategories
        categoriesPageInfo={categoriesPageInfo}
        setActiveFilters={setActiveFilters}
        products={displayProducts}
        gridMode={gridMode}
        setGridMode={setGridMode}
      />

      <PaginationBtns
        sortedProducts={sortedProducts}
        gridMode={gridMode}
        setDisplayProducts={setDisplayProducts}
      />
    </div>
  );
};

export default React.memo(CategoriesContent);
