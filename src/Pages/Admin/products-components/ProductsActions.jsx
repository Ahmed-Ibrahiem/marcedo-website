import React, { useEffect, useReducer, useState } from "react";
import { FaMagnifyingGlass, FaListUl, FaAngleDown } from "react-icons/fa6";
import {
  getAllBrands,
  getAllCategoreis,
} from "../../../services/ProductsDashboardServices";
import DropDownList from "../components/DropDownList";
import { CiFilter, CiGrid41 } from "react-icons/ci";

const status = [
  { name: "Active", type: "active", id: 1 },
  { name: "Not Active", type: "not-active", id: 2 },
];

const stocks = [
  { name: "In Stock", type: "in-stock", id: 1 },
  { name: "Out Stock", type: "out-of-stock", id: 2 },
];

const sortList = [
  { name: "Newest", type: "newest", id: 1 },
  { name: "Best Seller", type: "best-seller", id: 2 },
  { name: "A To Z", type: "a-to-z", id: 3 },
  { name: "Z To A", type: "z-to-a", id: 4 },
];

const ProductsActions = ({ filterOptions, updateFilterOptions }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const getCateg = async () => {
      const categ = await getAllCategoreis();
      if (categ) setCategories(categ);
    };
    const getBrands = async () => {
      const brans = await getAllBrands();
      if (brans) setBrands(brans);
    };

    getCateg();
    getBrands();
  }, []);

  return (
    <div className="text-sm flex-start gap-2.5 w-full flex-wrap p-2.5">
      {/* Search Input */}
      <div className="search border border-border  flex-start min-w-50  grow rounded-sm">
        <button className="p-2.5">
          <FaMagnifyingGlass className="text-gray" />
        </button>
        <input
          type="text"
          className="grow outline-none "
          placeholder="search product by name, Sku... "
        />
      </div>

      {/* Categories Dropdown */}
      {categories.length > 0 && (
        <DropDownList
          currentSelect={filterOptions.categories.title}
          list={categories}
          optionFun={(item) => updateFilterOptions("UPDATE_CATEGORIES", item)}
          listType={"Categories"}
        />
      )}

      {/* Brands Dropdown */}
      {brands.length > 0 && (
        <DropDownList
          currentSelect={filterOptions.brands.title}
          list={brands}
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
        <button className={` table ${gridBtnStyle}`}>
          <FaListUl />
        </button>
        <button
          className={` grid ${gridBtnStyle} text-black! bg-white! border border-border shadow-sm`}
        >
          <CiGrid41 />
        </button>
      </div>
    </div>
  );
};

const gridBtnStyle = `
text-lg! w-8.5 h-8.5 bg-orange text-white flex-center rounded-sm hover:scale-105
`;

export default ProductsActions;
