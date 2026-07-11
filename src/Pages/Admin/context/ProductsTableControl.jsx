import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
const productsTableControlContext = createContext(null);

const ProductsTableControl = ({ children }) => {
  const [selectedAllProducts, setSelectedAllProducts] = useState(false);
  const [selectedProductsIds, setSelectedProductsIds] = useState([]);
  const [productsInfoMap, setProductsInfoMap] = useState({});

  // handle the addition and delete products from selectedProducts
  const handleSelectedProducts = useCallback((id) => {
    setSelectedProductsIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }, []);

  // handle Selected All Products
  const handleAllSelectedProducts = useCallback(
    (productsData) => {
      if (selectedAllProducts) {
        const selectedProsId = [...productsData.map((data) => data.id)];
        setSelectedProductsIds(selectedProsId);
      } else {
        setSelectedProductsIds([]);
      }
    },
    [selectedAllProducts],
  );

  const value = useMemo(
    () => ({
      handleSelectedProducts,
      handleAllSelectedProducts,
      selectedProductsIds,
      setSelectedProductsIds,
      selectedAllProducts,
      setSelectedAllProducts,
      productsInfoMap,
      setProductsInfoMap,
    }),
    [
      selectedProductsIds,
      selectedAllProducts,
      productsInfoMap,
      handleSelectedProducts,
      handleAllSelectedProducts,
    ],
  );

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
