import React, { createContext, useContext, useState } from "react";
const productsTableControlContext = createContext(null);

const ProductsTableControl = ({ children }) => {
  const [selectedAllProducts, setSelectedAllProducts] = useState(false);
  const [selectedProductsIds, setSelectedProductsIds] = useState([]);

  // handle the addition and delete products from selectedProducts
  const handleSelectedProducts = (id) => {
    if (selectedProductsIds.includes(id)) {
      setSelectedProductsIds((prev) => [...prev.filter((i) => i !== id)]);
    } else {
      setSelectedProductsIds((prev) => [...prev, id]);
    }
  };

  // handle Selected All Products
  const handleAllSelectedProducts = (productsData) => {
    if (selectedAllProducts) {
      const selectedProsId = [...productsData.map((data) => data.id)];
      setSelectedProductsIds(selectedProsId);
    } else {
      setSelectedProductsIds([]);
    }
  };

  const value = {
    handleSelectedProducts,
    handleAllSelectedProducts,
    selectedProductsIds,
    setSelectedProductsIds,
    selectedAllProducts,
    setSelectedAllProducts,
  };

  return (
    <productsTableControlContext.Provider value={value}>
      {children}
    </productsTableControlContext.Provider>
  );
};

export const useProductsTableControlContext = () => {
  return useContext(productsTableControlContext);
};

export default ProductsTableControl;
