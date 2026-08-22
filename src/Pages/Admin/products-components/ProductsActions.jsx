import React, { useEffect, useReducer, useState, memo } from "react";
import { FaMagnifyingGlass, FaListUl, FaAngleDown } from "react-icons/fa6";
import { getAllBrands } from "../../../services/ProductsDashboardServices";
import DropDownList from "../components/DropDownList";
import { CiFilter, CiGrid41 } from "react-icons/ci";
import { getAllCategories } from "../../../services/CategoriesServices";

const status = [
  { name: "Active", id: true },
  { name: "Not Active", id: false },
];

const stocks = [
  { name: "In Stock", id: "in_stock" },
  { name: "Out Stock", id: "out_stock" },
];

const sortList = [
  { name: "Newest", id: "newest" },
  { name: "Best Seller", id: "best-seller" },
  { name: "A To Z", id: "a-to-z" },
  { name: "Z To A", id: "z-to-a" },
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
        getAllCategories(),
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
          currentSelect={filterOptions.categories.name}
          list={filterData.categories}
          optionFun={(item) => updateFilterOptions("UPDATE_CATEGORIES", item)}
          listType={"Categories"}
          opionsStyle={"w-full!"}
        />
      )}

      {/* filterData.brands Dropdown */}
      {filterData.brands.length > 0 && (
        <DropDownList
          currentSelect={filterOptions.brands.name}
          list={filterData.brands}
          optionFun={(item) => updateFilterOptions("UPDATE_BRANDS", item)}
          listType={"Brands"}
          opionsStyle={"w-full!"}
        />
      )}

      {/* Status Dropdown */}
      {status.length > 0 && (
        <DropDownList
          currentSelect={filterOptions.status.name}
          list={status}
          optionFun={(item) => updateFilterOptions("UPDATE_STATUS", item)}
          listType={"Status"}
          opionsStyle={"w-full!"}
        />
      )}

      {/* Stocks Dropdown */}
      {stocks.length > 0 && (
        <DropDownList
          currentSelect={filterOptions.stocks.name}
          list={stocks}
          optionFun={(item) => updateFilterOptions("UPDATE_STOCKS", item)}
          opionsStyle={"w-full!"}
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
        currentSelect={filterOptions.sort.name}
        opionsStyle={"w-full!"}
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
    prevProps.filterOptions.categories.id ===
      nextProps.filterOptions.categories.id &&
    prevProps.filterOptions.brands.id === nextProps.filterOptions.brands.id &&
    prevProps.filterOptions.status.id === nextProps.filterOptions.status.id &&
    prevProps.filterOptions.stocks.id === nextProps.filterOptions.stocks.id &&
    prevProps.filterOptions.sort.id === nextProps.filterOptions.sort.id
  );
});
