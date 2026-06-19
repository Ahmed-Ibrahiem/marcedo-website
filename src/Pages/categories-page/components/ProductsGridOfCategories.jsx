import React from "react";
import ProductCard from "../../../Components/product/product-item/ProductCard";

const ProductsGridOfCategories = ({ products, gridMode, setGridMode }) => {
  return (
    <div className={`grid grid-cols-1! xs:grid-cols-${gridMode}!  gap-10 mt-10 `}>
      {products.map((data) => {
        return (
          <ProductCard
          key={data.id}
            product={data}
            cardHeight={`${gridMode === 4 ? "pt-[120%]!" : gridMode === 3 ? "pt-[110%]!" : " md:pt-[90%]! "}`}
          />
        );
      })}
    </div>
  );
};

export default ProductsGridOfCategories;
