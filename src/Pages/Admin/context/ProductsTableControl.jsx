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
  const [deleteRequest, setDeleteRequest] = useState(null);

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

  // Any delete button - whether from a row or from bulk actions - uses this function only
  const requestDelete = useCallback((ids, label) => {
    if (!ids || ids.length <= 0) return;
    setDeleteRequest({ ids, label });
  }, []);

  const clearDeleteRequest = useCallback(() => {
    setDeleteRequest(null);
  }, []);

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
      requestDelete,
      clearDeleteRequest,
      deleteRequest,
    }),
    [
      selectedProductsIds,
      selectedAllProducts,
      productsInfoMap,
      deleteRequest,
      handleSelectedProducts,
      handleAllSelectedProducts,
      requestDelete,
      clearDeleteRequest,
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
