import React, { useEffect, useState } from "react";
import CategoriesHead from "./CategoriesHead";
import ProductsGridOfCategories from "../ProductsGridOfCategories";
import PaginationBtns from "./PaginationBtns";
import { sortProducts } from "../../../../services/categoriesPageServices";

const CategoriesContent = ({ setIsSidebarOpen, min, max, filterProducts }) => {
  const [gridMode, setGridMode] = useState(2);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedSort, setSelectedSort] = useState("best selling");

  useEffect(() => {
    const products = sortProducts(filterProducts, selectedSort);
    setSortedProducts(products);
  }, [filterProducts, selectedSort]);
  return (
    <div className="grow">
      <CategoriesHead
        setIsSidebarOpen={setIsSidebarOpen}
        gridMode={gridMode}
        setGridMode={setGridMode}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
      <ProductsGridOfCategories
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

export default CategoriesContent;
