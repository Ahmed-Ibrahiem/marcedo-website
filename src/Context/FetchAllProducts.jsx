import React, { useEffect, useRef, useState } from "react";
import { createContext, useContext } from "react";
import FetchData from "../services/fetchData";

const allProductsContext = createContext([]);

const FetchAllProductsProvider = ({ children }) => {
  const Url = "/listingProducts.json";
  const [all_products, set_all_products] = useState([]);

  useEffect(() => {
    const getProductsData = async () => {
      set_all_products(await FetchData(Url));
    };
    getProductsData();
  }, []);

  const value = {
    all_products,
  };

  return (
    <allProductsContext.Provider value={value}>
      {children}
    </allProductsContext.Provider>
  );
};

export const useFetchAllProducts = () => {
  return useContext(allProductsContext);
};

export default FetchAllProductsProvider;
