import React, { memo } from "react";
import ProductCard from "../../../Components/product/product-item/ProductCard";

const ProductsGridOfCategories = ({ products, gridMode, setGridMode }) => {
  return (
    <div
      className={`grid max-xs:grid-cols-1! max-md:grid-cols-2! gap-10 mt-10 `}
      style={{ gridTemplateColumns: `repeat(${gridMode} , minmax(0 , 1fr))` }}
    >
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

export default React.memo(ProductsGridOfCategories);
