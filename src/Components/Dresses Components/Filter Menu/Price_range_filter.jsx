import { useEffect, useRef, useState } from "react";
import { use_dress_context } from "../../../Context/DressContext";

const Price_range_filter = () => {
  const {
    filter_options,
    dispatch_filter_options,
    price_range,
    max_price,
  } = use_dress_context();

  return (
    <div className="price-range filter">
      <h3 className="filter">Price Range</h3>
      <div className="main-slider filter">
        <input
          type="range"
          value={filter_options.price_range}
          min="0"
          max={"100"}
          onChange={(e) => {
            dispatch_filter_options({
              type: "UPDATE_FILTER",
              payload: { price_range: e.target.value },
            });
          }}
          className="slider filter"
        />
        <div
          className="prograssBar filter"
          style={{ width: `${filter_options.price_range}%` }}
        ></div>
      </div>
      <div className="text filter">
        <span className="filter">Price</span>
        <span className="filter">Max Price</span>
      </div>
      <div className="average filter">
        <p className="min-price filter">{price_range} EGP</p>
        <p className="max-price filter">
          <span className="max-price-span">{max_price.current}</span> &nbsp; EGP
        </p>
      </div>
    </div>
  );
};

export default Price_range_filter;
