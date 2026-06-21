import React, { memo, useState } from "react";
import { FaAngleUp } from "react-icons/fa6";

const DynamicOptionsSection = ({
  option,
  activeFilters,
  handleFilterChange,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <div
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="w-full flex-between gap-2.5 cursor-pointer"
      >
        <h1 className="capitalize text-2xl ">{option.key}</h1>
        <FaAngleUp className={isMenuOpen ? "rotate-180" : ""} />
      </div>
      <ul
        className={`flex-start-col gap-2.5 my-5 overflow-y-hidden`}
        style={{ maxHeight: isMenuOpen ? "320px" : "0" }}
      >
        {option.key === "color" ? (
          <ColorOptions
            option={option}
            activeFilters={activeFilters}
            handleFilterChange={handleFilterChange}
          />
        ) : (
          <AntherOptions
            option={option}
            activeFilters={activeFilters}
            handleFilterChange={handleFilterChange}
          />
        )}
      </ul>
    </div>
  );
};

const ColorOptions = memo(({ option, activeFilters, handleFilterChange }) => {
  const currentSelected = activeFilters.variants
    ? activeFilters.variants[option.key] || []
    : [];

  return (
    <>
      {option.values.map((value, index) => {
        const isChecked = currentSelected.includes(value.label);
        return (
          <li key={index} className="flex-start gap-2.5 cursor-pointer ">
            <input
              type="checkbox"
              style={{ "--bg-color": value.hex }}
              className="color_options w-6.5! h-6.5! "
              id={value.label}
              checked={isChecked}
              onChange={() => handleFilterChange(option.key, value.label)}
            />
            <label className="grow cursor-pointer" htmlFor={value.label}>
              {value.label}
            </label>
          </li>
        );
      })}
    </>
  );
});

const AntherOptions = memo(({ option, activeFilters, handleFilterChange }) => {
  const currentSelected = activeFilters.variants
    ? activeFilters.variants[option.key] || []
    : [];

  return (
    <>
      {option.values.map((value, index) => {
        const isChecked = currentSelected.includes(value);
        return (
          <li key={index} className="flex-start gap-2.5">
            <input
              checked={isChecked}
              onChange={() => handleFilterChange(option.key, value)}
              type="checkbox"
              className="checkbox"
              id={value}
            />
            <label className="text-sm grow cursor-pointer" htmlFor={value}>
              {value}
            </label>
          </li>
        );
      })}
    </>
  );
});

export default React.memo(DynamicOptionsSection);
