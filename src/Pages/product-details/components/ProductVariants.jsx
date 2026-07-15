import React, { memo } from "react";

const ProductVariants = ({
  selectedOptions,
  setSelectedOptions,
  productVariants,
  validOptions,
  updateValidOptions,
}) => {
  return (
    <>
      {productVariants && selectedOptions && (
        <div className=" flex-start-col gap-7.5 text-sm!">
          {productVariants.options.map((op) => {
            return (
              <div className="fade-in" key={op.key}>
                <h3 className="font-bold capitalize">
                  {op.key.split("_").join(" ")}:
                </h3>
                {/* color Options */}
                {op.key === "color" && (
                  <ul className="flex-start gap-1.5 mt-2.5 flex-wrap sm:flex-nowrap ">
                    {op.values.map((value, index) => {
                      const getOpttion = validOptions[op.key];
                      const isValid =
                        getOpttion === undefined ||
                        getOpttion.includes(value.label);
                      return (
                        <li key={index} className={`flex-start gap-1`}>
                          <input
                            checked={selectedOptions.color === value.label}
                            disabled={!isValid}
                            onChange={() => {
                              const newOptions = {
                                ...selectedOptions,
                                color: value.label,
                              };
                              updateValidOptions(newOptions);
                              setSelectedOptions(newOptions);
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
                      const getOpttion = validOptions[op.key];
                      const isValid =
                        getOpttion === undefined || getOpttion.includes(value);
                      return (
                        <button
                          disabled={!isValid}
                          onClick={() => {
                            const newOptions = {
                              ...selectedOptions,
                              [op.key]: value,
                            };
                            updateValidOptions(newOptions);
                            setSelectedOptions(newOptions);
                          }}
                          key={index}
                          className={`p-1.5  rounded-sm border border-gray-light relative
                                 ${selectedOptions[op.key] === value ? "border-gray-300! bg-gray-light!" : ""}
                                 ${!isValid ? disabledBtn : ""}
                                 `}
                        >
                          <span className="min-w-10 block">{value}</span>
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

const disabledBtn = `
before:w-full before:h-[1px] before:bg-gray before:rotate-15 before:absolute before:left-[50%] before:top-[50%]
bg-gray-50! text-gray! cursor-not-allowed! before:translate-x-[-50%] before:translate-y-[-50%] 
`;

export default React.memo(ProductVariants);
