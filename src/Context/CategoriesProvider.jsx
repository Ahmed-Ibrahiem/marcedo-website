import React, { createContext, useContext } from "react";

const categoriesContext = createContext(null);

const CategoriesProvider = ({ children }) => {
  const value = {};
  return (
    <categoriesContext.Provider value={value}>
      {children}
    </categoriesContext.Provider>
  );
};

export const useCategoiresContext = () => useContext(categoriesContext);

export default CategoriesProvider;
