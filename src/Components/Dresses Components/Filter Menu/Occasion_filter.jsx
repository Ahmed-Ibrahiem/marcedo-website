import React from "react";
import { use_dress_context } from "../../../Context/DressContext";

const Occasion_filter = () => {
  const occasion_list = ["Casual", "Formal", "Sports", "Party"];

  const { filter_options, dispatch_filter_options } = use_dress_context();
  return (
    <div className="occasion filter">
      <div className="h3 filter">
        <h3 className="filter">Occasion</h3>
        <i className="fa-solid fa-caret-right options-arrow filter"></i>
      </div>
      <div className="options filter">
        {occasion_list.map((occasion, index) => {
          return (
            <button
              onClick={() => {
                dispatch_filter_options({
                  type: "UPDATE_FILTER",
                  payload: { occasion },
                });
              }}
              key={index}
              className={`${filter_options.occasion == occasion ? "option-choise" : ""}`}
            >
              {occasion}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Occasion_filter;
