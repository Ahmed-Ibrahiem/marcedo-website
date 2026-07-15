import React, { createContext, useContext, useEffect, useState } from "react";
import { getProductVariants } from "../services/productDetailsServices";
import { toast } from "react-toastify";
import { useCartContext } from "./CartMenuContext";
import Success_Toast from "../Components/ui/confirm-message/Success_Toast";
import useProductVariants from "../Hooks/useProductVariants";

const ProductDetailsContext = createContext(null);

const ProductDetailsProvider = ({ productData, children }) => {
  const [selectedCount, setSelectedCount] = useState(1);
  const { addItem } = useCartContext();
  const [productVariants, setProductVariants] = useState(null);
  const {
    selectedOptions,
    setSelectedOptions,
    getDefaultOptions,
    validOptions,
    updateValidOptions,
    getSelectedVariants,
  } = useProductVariants({ proVariants: productVariants });

  useEffect(() => {
    if (!productData) return;

    const getVariants = async () => {
      const variants = await getProductVariants(productData.id);
      if (!variants) return;
      setProductVariants(variants);
    };

    getVariants();
  }, [productData]);

  useEffect(() => {
    if (!productData) return;

    const getVariants = async () => {
      const variants = await getProductVariants(productData.id);
      if (!variants) return;
      setProductVariants(variants);
    };

    getVariants();
  }, [productData]);

  useEffect(() => {
    if (!productVariants) return;
    getDefaultOptions();
  }, [productVariants]);

  const addProductToCart = () => {
    const variants = getSelectedVariants();
    if (!variants || !productData) return;

    const data = { ...productData, variants };

    addItem(data, selectedCount);

    toast.success(<Success_Toast message={"The Products Has Been Added"} />);

    setSelectedCount(1);
  };

  const value = {
    selectedOptions,
    setSelectedOptions,
    productVariants,
    addProductToCart,
    selectedCount,
    setSelectedCount,
    validOptions,
    updateValidOptions,
  };

  return (
    <ProductDetailsContext.Provider value={value}>
      {children}
    </ProductDetailsContext.Provider>
  );
};

export const useProductDetailsContext = () => {
  return useContext(ProductDetailsContext);
};

export default ProductDetailsProvider;
