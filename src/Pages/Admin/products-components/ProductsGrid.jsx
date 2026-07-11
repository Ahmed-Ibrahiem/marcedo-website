import React, { useEffect, useState, memo } from "react";
import ProductCard from "../../../Components/product/product-item/ProductCard";
import {
  getProductBrands,
  getProductCategories,
  getProductStock,
} from "../../../services/productDetailsServices";
import ProductCardAdmin from "./ProductCardAdmin";
import { useProductsTableControlContext } from "../context/ProductsTableControl";

const ProductsGrid = ({ productsData }) => {
  const { selectedAllProducts, setSelectedAllProducts, productsInfoMap } =
    useProductsTableControlContext();
  return (
    <div className="w-full h-full p-1.5 ">
      <input
        type="checkbox"
        checked={selectedAllProducts}
        onChange={() => setSelectedAllProducts((prev) => !prev)}
        className="w-6.5! h-6.5! checkbox
        "
      />
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-5  ">
        {Object.keys(productsInfoMap).length > 0 &&
          productsData.map((data) => {
            return (
              <ProductCardAdmin
                brand={productsInfoMap.brands[data.brand_id]}
                categories={Object.values(productsInfoMap.categories).filter(
                  (cat) => data.category_ids.includes(cat.id),
                )}
                stock={productsInfoMap.stocks[data.id]}
                productsData={data}
                key={data.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default React.memo(ProductsGrid);
