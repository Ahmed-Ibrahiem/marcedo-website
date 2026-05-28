import React, { useEffect, useState } from "react";

const ProductVariants = ({ prodVariants }) => {
  const [selectedVaraints, setSelectedVaraints] = useState(null);

  useEffect(() => {
    if (prodVariants) {
      let defaultVariant = {};
      prodVariants.variants.forEach((variant) => {
        const firstVariant = variant.values.find((value) => value.available);
        defaultVariant = {
          ...defaultVariant,
          [variant.key]: firstVariant.label,
        };
      });
      setSelectedVaraints(defaultVariant);
    }
  }, [prodVariants]);

  return (
    <div className="colors-container flex-start-col gap-7.5 text-sm!">
      {selectedVaraints &&
        prodVariants.variants.map((variant) => {
          return (
            <div key={variant.key}>
              <h3 className="font-bold">{variant.label}:</h3>
              {/* color Options */}
              {variant.key === "color" && (
                <ul className="flex-start gap-1.5 mt-2.5 flex-wrap sm:flex-nowrap">
                  {variant.values.map((value, index) => {
                    return (
                      <li
                        key={index}
                        className={`flex-start gap-1 cursor-pointer!`}
                      >
                        <input
                          checked={
                            selectedVaraints.color &&
                            selectedVaraints.color === value.label
                          }
                          onChange={() => {
                            setSelectedVaraints((prev) => ({
                              ...prev,
                              color: value.label,
                            }));
                          }}
                          name={variant.key}
                          id={value.label}
                          type="radio"
                          className={`color_options `}
                          style={{ "--bg-color": value.hex }}
                        />
                        <label className="cursor-pointer" htmlFor={value.label}>
                          {value.label}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Another Veraings */}
              {selectedVaraints && variant.key !== "color" && (
                <div className="flex-start gap-2.5 mt-2.5">
                  {variant.values.map((value, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() =>
                          setSelectedVaraints((prev) => ({
                            ...prev,
                            [variant.key]: value.label,
                          }))
                        }
                        className={`p-1.5  rounded-md border border-transparent
                                 ${selectedVaraints[variant.key] === value.label ? "border-gray-300! bg-gray-light!" : ""}`}
                      >
                        <span>{value.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default ProductVariants;
