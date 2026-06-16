import React, { useCallback, useState } from "react";

const useProductVariants = ({ proVariants }) => {
  const [selectedOptions, setSeletedOptions] = useState(null);

  // Create function to get default option when the component render
  const getDefaultOptions = useCallback(() => {
    if (!proVariants) return;
    let options = {};

    proVariants.options.forEach((op) => {
      options = { ...options, [op.key]: op.values[0] };
      if (op.key === "color")
        options = { ...options, [op.key]: op.values[0].label };
    });

    setSeletedOptions(options);
  }, [proVariants]);

  // Create function to get the selected variants by check the matching with options selected
  const getSelectedVariants = useCallback(() => {
    if (!proVariants) return;
    if (!selectedOptions || !proVariants.variants) return;

    const varaint = proVariants.variants.find((varia) => {
      return Object.entries(varia.attributes).every(
        ([key, value]) => selectedOptions[key] === value,
      );
    });

    return varaint || null;
  }, [proVariants, selectedOptions]);

  return {
    selectedOptions,
    setSeletedOptions,
    getDefaultOptions,
    getSelectedVariants,
  };
};

export default useProductVariants;
