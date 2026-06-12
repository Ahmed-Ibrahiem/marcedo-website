import React, { createContext, useContext, useEffect, useState } from "react";
import { getProductVariants } from "../services/productDetailsServices";
import { toast } from "react-toastify";
import { useCartContext } from "./CartMenuContext";
import Success_Toast from "../Components/ui/confirm-message/Success_Toast";

const ProductDetailsContext = createContext(null);

const ProductDetailsProvider = ({ productData, children }) => {
  const [selectedOptions, setSelectedOptions] = useState(null);
  const [productVariants, setProductVariants] = useState(null);
  const [selectedCount, setSelectedCount] = useState(1);
  const { addItem } = useCartContext();

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

    const options = {};

    productVariants.options.forEach((op, index) => {
      if (op.key === "color") options[op.key] = op.values[0].label;
      else options[op.key] = op.values[0];
    });

    setSelectedOptions(options);
  }, [productVariants]);

  const getSelectedVariant = () => {
    if (!selectedOptions || !productVariants?.variants)
      return toast.error("Please Select Options");

    return productVariants.variants.find((varian) =>
      Object.entries(varian.attributes).every(
        ([key, value]) => selectedOptions[key] === value,
      ),
    );
  };

  const addProductToCart = () => {
    const variants = getSelectedVariant();
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
