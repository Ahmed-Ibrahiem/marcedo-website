import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import FetchData from "../services/fetchData";
import { getListingProducts } from "../services/listingProductsSevices";

const allProductsContext = createContext([]);

const FetchAllProductsProvider = ({ children }) => {
  const [listingProducts, setListingProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      const fetchData = async () => {
        const data = await getListingProducts();
        if (data) {
          setListingProducts(data);
        }
      };

      fetchData();
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    listingProducts,
    isLoading,
    isError,
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
