import React, { useEffect, useStat, memo } from "react";
import ProductRow from "./ProductRow";
import { useProductsTableControlContext } from "../context/ProductsTableControl";

const ProductsTable = ({ productsData }) => {
  const { selectedAllProducts, setSelectedAllProducts } =
    useProductsTableControlContext();

  return (
    <table className="w-full min-w-225 xl:min-w-auto ">
      <thead className="border-y border-border bg-gray-50 ">
        <tr className="text-sm">
          <th className="text-start! pl-2.5 ">
            <div className="py-3.5 flex-start">
              <input
                checked={selectedAllProducts}
                onChange={() => setSelectedAllProducts((prev) => !prev)}
                type="checkbox"
                name=""
                id=""
                className="w-5! h-5! border-gray-300! checkbox"
              />
            </div>
          </th>
          <th className="text-start pl-2.5 ">Product</th>
          <th className="text-start pl-2.5 ">Categories</th>
          <th className="text-start pl-2.5 ">Brands</th>
          <th className="text-start pl-2.5 ">Price</th>
          <th className="text-start pl-2.5">Stock</th>
          <th className="text-start pl-2.5 ">Sold</th>
          <th className="text-start pl-2.5 ">Rating</th>
          <th className="text-start pl-2.5 ">Status</th>
          <th className="text-start pl-2.5 ">Actions</th>
        </tr>
      </thead>
      <tbody>
        {productsData.map((pro) => {
          return <ProductRow key={pro.id} product={pro} />;
        })}
      </tbody>
    </table>
  );
};

export default React.memo(ProductsTable);
