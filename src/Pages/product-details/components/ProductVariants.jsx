import React, { useEffect, useState } from "react";
import { useProductDetailsContext } from "../../../Context/ProductDetailsProvider";

const ProductVariants = () => {
  const { selectedOptions, setSelectedOptions, productVariants } =
    useProductDetailsContext();

  return (
    <>
      {productVariants && selectedOptions && (
        <div className="colors-container flex-start-col gap-7.5 text-sm!">
          {productVariants.options.map((op) => {
            return (
              <div key={op.key}>
                <h3 className="font-bold capitalize">{op.key}:</h3>
                {/* color Options */}
                {op.key === "color" && (
                  <ul className="flex-start gap-1.5 mt-2.5 flex-wrap sm:flex-nowrap">
                    {op.values.map((value, index) => {
                      return (
                        <li
                          key={index}
                          className={`flex-start gap-1 cursor-pointer!`}
                        >
                          <input
                            checked={selectedOptions.color === value.label}
                            onChange={() => {
                              setSelectedOptions((prev) => ({
                                ...prev,
                                color: value.label,
                              }));
                            }}
                            name={op.key}
                            id={value.label}
                            type="radio"
                            className={`color_options`}
                            style={{ "--bg-color": value.hex }}
                          />
                          <label
                            className="cursor-pointer"
                            htmlFor={value.label}
                          >
                            {value.label}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {/* Another Veraings */}
                {op.key !== "color" && (
                  <div className="flex-start gap-2.5 mt-2.5">
                    {op.values.map((value, index) => {
                      return (
                        <button
                          onClick={() =>
                            setSelectedOptions((prev) => ({
                              ...prev,
                              [op.key]: value,
                            }))
                          }
                          key={index}
                          className={`p-1.5  rounded-md border border-gray-light 
                                 ${selectedOptions[op.key] === value ? "border-gray-300! bg-gray-light!" : ""}`}
                        >
                          <span>{value}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ProductVariants;
