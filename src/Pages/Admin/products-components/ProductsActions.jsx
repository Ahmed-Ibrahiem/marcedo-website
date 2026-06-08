import React, { useEffect, useReducer, useState, memo } from "react";
import { FaMagnifyingGlass, FaListUl, FaAngleDown } from "react-icons/fa6";
import {
  getAllCategoreis,
  getAllBrands,
} from "../../../services/ProductsDashboardServices";
import DropDownList from "../components/DropDownList";
import { CiFilter, CiGrid41 } from "react-icons/ci";

const status = [
  { name: "Active", type: true, id: 1 },
  { name: "Not Active", type: false, id: 2 },
];

const stocks = [
  { name: "In Stock", type: "in_stock", id: 1 },
  { name: "Out Stock", type: "out_of_stock", id: 2 },
];

const sortList = [
  { name: "Newest", type: "newest", id: 1 },
  { name: "Best Seller", type: "best-seller", id: 2 },
  { name: "A To Z", type: "a-to-z", id: 3 },
  { name: "Z To A", type: "z-to-a", id: 4 },
];

const ProductsActions = ({
  filterOptions,
  updateFilterOptions,
  setTableMode,
  tableMode,
}) => {
  const [filterData, setFilterData] = useState({ categories: [], brands: [] });

  useEffect(() => {
    const fetchData = async () => {
      const [categories, brands] = await Promise.all([
        getAllCategoreis(),
        getAllBrands(),
      ]);

      if (categories && brands) setFilterData({ categories, brands });
    };

    fetchData();
  }, []);

  return (
    <div className="text-sm flex-start gap-2.5 w-full flex-wrap p-2.5 fade-in-animate relative z-10">
      {/* Search Input */}
      <div className="search border border-border  flex-start min-w-40  grow rounded-sm">
        <button className="p-2.5">
          <FaMagnifyingGlass className="text-gray" />
        </button>
        <input
          type="text"
          className="grow outline-none "
          placeholder="search product by name, Sku... "
        />
      </div>

      {/* filterData.categories Dropdown */}
      {filterData.categories.length > 0 && (
        <DropDownList
          currentSelect={filterOptions.categories.title}
          list={filterData.categories}
          optionFun={(item) => updateFilterOptions("UPDATE_CATEGORIES", item)}
          listType={"Categories"}
        />
      )}

      {/* filterData.brands Dropdown */}
      {filterData.brands.length > 0 && (
        <DropDownList
          currentSelect={filterOptions.brands.title}
          list={filterData.brands}
          optionFun={(item) => updateFilterOptions("UPDATE_BRANDS", item)}
          listType={"Brands"}
        />
      )}

      {/* Status Dropdown */}
      {status.length > 0 && (
        <DropDownList
          currentSelect={filterOptions.status.title}
          list={status}
          optionFun={(item) => updateFilterOptions("UPDATE_STATUS", item)}
          listType={"Status"}
        />
      )}

      {/* Stocks Dropdown */}
      {stocks.length > 0 && (
        <DropDownList
          currentSelect={filterOptions.stocks.title}
          list={stocks}
          optionFun={(item) => updateFilterOptions("UPDATE_STOCKS", item)}
          listType={"Stocks"}
        />
      )}

      {/* More Filters */}
      <button
        className="border border-border p-1.5 text-sm shadow-sm rounded-sm
       flex-start gap-2.5 hover:scale-105 active:scale-95 "
      >
        <CiFilter />
        <span>More Filters</span>
      </button>

      {/* Sort Products */}
      <DropDownList
        list={sortList}
        optionFun={(item) => updateFilterOptions("UPDATE_SORT", item)}
        currentSelect={filterOptions.sort.title}
      />

      {/* Grid View */}
      <div className="flex-start gap-2.5">
        <button
          onClick={() => setTableMode(true)}
          className={` table ${gridBtnStyle} ${tableMode ? "bg-orange! text-white!" : "bg-white! text-black"}`}
        >
          <FaListUl />
        </button>
        <button
          onClick={() => setTableMode(false)}
          className={` grid ${gridBtnStyle} text-black! ${!tableMode ? "bg-orange! text-white!" : "bg-white!"}`}
        >
          <CiGrid41 />
        </button>
      </div>
    </div>
  );
};

const gridBtnStyle = `
text-lg! w-8.5 h-8.5  flex-center rounded-sm hover:scale-105 border border-border shadow-sm
`;

// Optimized memoization: Prevents parent-induced re-renders by comparing primitive values instead of object references.
export default React.memo(ProductsActions, (prevProps, nextProps) => {
  return (
    prevProps.tableMode === nextProps.tableMode &&
    prevProps.filterOptions.categories.type ===
      nextProps.filterOptions.categories.type &&
    prevProps.filterOptions.brands.type ===
      nextProps.filterOptions.brands.type &&
    prevProps.filterOptions.status.type ===
      nextProps.filterOptions.status.type &&
    prevProps.filterOptions.stocks.type ===
      nextProps.filterOptions.stocks.type &&
    prevProps.filterOptions.sort.type === nextProps.filterOptions.sort.type
  );
});
