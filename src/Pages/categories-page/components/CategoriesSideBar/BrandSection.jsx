import React, { useEffect, memo, useState } from "react";
import { FaAngleUp } from "react-icons/fa6";

const BrandSection = ({
  categoriesPageInfo,
  activeFilters,
  setActiveFilters,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const brands = categoriesPageInfo.brands;

  const toggleBrands = (id) => {
    if (activeFilters.brands) {
      if (activeFilters.brands.includes(id)) {
        const newBrands = [
          ...activeFilters.brands.filter((brandId) => brandId !== id),
        ];
        setActiveFilters((prev) => ({ ...prev, brands: newBrands }));
      } else {
        const newBrands = [...activeFilters.brands, id];
        setActiveFilters((prev) => ({ ...prev, brands: newBrands }));
      }
    } else {
      const newBrands = [id];
      setActiveFilters((prev) => ({ ...prev, brands: newBrands }));
    }
  };

  return (
    <div className="border-b border-border">
      <div
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="w-full flex-between gap-2.5 cursor-pointer"
      >
        <h1 className="capitalize text-2xl ">Brands</h1>
        <FaAngleUp className={isMenuOpen ? "rotate-180" : ""} />
      </div>
      <ul
        className={`flex-start-col gap-2.5 my-5 overflow-y-hidden`}
        style={{ maxHeight: isMenuOpen ? "320px" : "0" }}
      >
        {brands.map((brand, index) => {
          const isChecked = activeFilters.brands?.includes(brand.id) || false;
          return (
            <li key={brand.id} className="flex-start gap-2.5 cursor-pointer ">
              <input
                checked={isChecked}
                onChange={() => toggleBrands(brand.id)}
                type="checkbox"
                className="checkbox"
                id={brand.id}
              />
              <label className="grow cursor-pointer" htmlFor={brand.id}>
                {brand.name}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(BrandSection);
