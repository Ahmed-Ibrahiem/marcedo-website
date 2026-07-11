// SelectionCheckbox.jsx
import React from "react";
import { useProductsTableControlContext } from "../context/ProductsTableControl";

const SelectionCheckbox = ({ productId, style }) => {
  const { handleSelectedProducts, selectedProductsIds } =
    useProductsTableControlContext();

  return (
    <input
      checked={selectedProductsIds.includes(productId)}
      onChange={() => handleSelectedProducts(productId)}
      type="checkbox"
      className={`w-5! h-5! border-gray-300! checkbox ${style || ""}`}
    />
  );
};

export default React.memo(SelectionCheckbox);
