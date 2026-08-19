import React, { useEffect, useState, memo } from "react";
import { FaAngleUp } from "react-icons/fa6";

const StockSection = ({ stockStatus, activeFilters, setActiveFilters }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleStocks = (id) => {
    if (id === "in_stock" && !stockStatus.inStock) return;
    if (id === "out_stock" && !stockStatus.outStock) return;

    if (activeFilters.stocks) {
      if (activeFilters.stocks?.includes(id)) {
        const newBrands = [
          ...activeFilters.stocks.filter((brandId) => brandId !== id),
        ];
        setActiveFilters((prev) => ({ ...prev, stocks: newBrands }));
      } else {
        const newBrands = [...activeFilters.stocks, id];
        setActiveFilters((prev) => ({ ...prev, stocks: newBrands }));
      }
    } else {
      const newBrands = [id];
      setActiveFilters((prev) => ({ ...prev, stocks: newBrands }));
    }
  };
  return (
    <div className="border-b border-border">
      <div
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="w-full flex-between gap-2.5 cursor-pointer"
      >
        <h1 className="capitalize text-2xl ">Stock</h1>
        <FaAngleUp className={isMenuOpen ? "rotate-180" : ""} />
      </div>
      <ul
        className={`flex-start-col gap-2.5 my-5 overflow-y-hidden`}
        style={{ maxHeight: isMenuOpen ? "320px" : "0" }}
      >
        <li
          className={`flex-start gap-2.5 ${stockStatus.inStock === 0 ? disabledStyle : ""}`}
        >
          <input
            checked={activeFilters.stocks?.includes("in_stock") ?? false}
            onChange={() => {
              toggleStocks("in_stock");
            }}
            type="checkbox"
            className="checkbox"
            id={"in-stock-status"}
            disabled={!stockStatus.inStock}
          />
          <label
            className="text-sm grow cursor-pointer"
            htmlFor={"in-stock-status"}
          >
            In Stock ({stockStatus.inStock})
          </label>
        </li>
        <li
          className={`flex-start gap-2.5 ${stockStatus.outStock === 0 ? disabledStyle : ""}`}
        >
          <input
            checked={activeFilters.stocks?.includes("out_stock") ?? false}
            onChange={() => {
              toggleStocks("out_stock");
            }}
            type="checkbox"
            className={`checkbox ${!stockStatus.outStock ? "text-gray cursor-auto!" : ""}`}
            id={"out-stock-products"}
            disabled={!stockStatus.outStock}
          />
          <label
            className={`text-sm grow cursor-pointer ${!stockStatus.outStock ? "text-gray cursor-auto!" : ""}`}
            htmlFor={"out-stock-products"}
          >
            Out Stock ({stockStatus.outStock})
          </label>
        </li>
      </ul>
    </div>
  );
};

const disabledStyle = `
relative before:absolute before:w-30 before:h-[1px] before:bg-gray-light before:left-0 before:top-[50%] before:translate-y-[-50%]
cusor-auto!
`;

export default React.memo(StockSection);
