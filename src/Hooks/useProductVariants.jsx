import React, { useCallback, useState } from "react";

const useProductVariants = ({ proVariants }) => {
  const [selectedOptions, setSelectedOptions] = useState(null);
  const [validOptions, setValidOptions] = useState({});

  const getValidOptions = (activeFilterAttribute) => {
    // Extract the specific attribute key we are filtering by (e.g., "case_size")
    const filterKey = Object.keys(activeFilterAttribute)[0];

    // Standardize the color options format to use strings (labels) instead of objects
    const normalizedOptions = proVariants.options.map((option) => {
      if (option.key === "color") {
        return {
          ...option,
          values: option.values.map((value) => value.label),
        };
      }
      return option;
    });

    // Keep only the variants that contain our target filter key
    const applicableVariants = proVariants.variants.filter(
      (variant) => variant.attributes[filterKey],
    );

    // Extract the attributes from variants that match the selected filter value
    const matchedVariantAttributes = applicableVariants
      .filter(
        (variant) =>
          variant.attributes[filterKey] === activeFilterAttribute[filterKey],
      )
      .map((variant) => variant.attributes);

    // Group other available attributes together, excluding the one we just filtered by
    const availableOptionsByAttribute = matchedVariantAttributes.reduce(
      (groupedOptions, currentAttributes) => {
        Object.entries(currentAttributes).forEach(([key, value]) => {
          // Exclude the current filter key to determine available options for other attributes
          if (key !== filterKey) {
            if (!groupedOptions[key]) {
              groupedOptions[key] = []; // Initialize an empty array for new attributes
            }

            // Prevent duplicate values in the final options lists
            if (!groupedOptions[key].includes(value)) {
              groupedOptions[key].push(value);
            }
          }
        });
        return groupedOptions;
      },
      {},
    );

    // Return the final grouped options that are valid based on the active selection
    setValidOptions(availableOptionsByAttribute);
  };

  // Create function to get default option when the component render
  const getDefaultOptions = useCallback(() => {
    if (!proVariants) return;
    let options = {};

    proVariants.options.forEach((op) => {
      options = { ...options, [op.key]: op.values[0] };
      if (op.key === "color")
        options = { ...options, [op.key]: op.values[0].label };
    });

    // Get Valid Options
    const firstAttributte = Object.keys(options)[0];
    const flagAttribute = { [firstAttributte]: options[firstAttributte] };

    getValidOptions(flagAttribute);
    setSelectedOptions(options);
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

  const updateValidOptions = useCallback(
    (newOptions) => {
      // Bring the attribute that will be relied upon to determine validity
      const foundEntry = Object.entries(newOptions).find(
        ([key, value]) => selectedOptions[key] !== newOptions[key],
      );

      const flagAttribute = foundEntry
        ? { [foundEntry[0]]: foundEntry[1] }
        : undefined;

      if (!flagAttribute) return;

      getValidOptions(flagAttribute);
    },
    [selectedOptions, proVariants],
  );

  return {
    selectedOptions,
    setSelectedOptions,
    getDefaultOptions,
    getSelectedVariants,
    validOptions,
    updateValidOptions,
  };
};

export default useProductVariants;
