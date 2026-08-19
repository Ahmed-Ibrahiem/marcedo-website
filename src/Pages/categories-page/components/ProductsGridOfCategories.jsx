import React, { memo } from "react";
import ProductCard from "../../../Components/product/product-item/ProductCard";
import { FaBoxOpen } from "react-icons/fa6";

const ProductsGridOfCategories = ({
  products,
  gridMode,
  setGridMode,
  setActiveFilters,
  categoriesPageInfo,
}) => {
  if (!products.length)
    return (
      <div className="w-full px-5 py-10 flex-center-col gap-5">
        <FaBoxOpen className="text-7xl text-orange " />
        <div className="flex-center-col">
          <h1 className="text-orange font-semibold text-lg text-center">
            No products match your filters{" "}
            <p className="text-sm text-gray text-center">
              Try removing some filters or adjusting your selections
            </p>
          </h1>
        </div>
        <button
          onClick={() => setActiveFilters({ price: categoriesPageInfo.price })}
          className="px-3.5 py-1.5 rounded-sm text-white bg-orange border-2 border-orange hover:bg-transparent hover:text-orange "
        >
          Clear all filters
        </button>
      </div>
    );

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
