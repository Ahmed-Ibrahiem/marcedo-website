import React, { createContext, useContext, useState } from "react";

const quickViewPopupContext = createContext();

const QuickViewPopupsProvider = ({ children }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [productData, setProductData] = useState(null);

  const value = {
    isQuickViewOpen,
    productData,
    setIsQuickViewOpen,
    setProductData,
  };
  return (
    <quickViewPopupContext.Provider value={value}>
      {children}
    </quickViewPopupContext.Provider>
  );
};

export const useQuickViewPopupContext = () => useContext(quickViewPopupContext);

export default QuickViewPopupsProvider;
