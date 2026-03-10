import React from "react";
import { use_dress_context } from "../../../Context/DressContext";

const Type_filter = () => {
  const type_list = ["A-Line", "Bodycon", "Maxi", "Other"];
  const { filter_options, dispatch_filter_options } = use_dress_context();

  return (
    <div className="type ">
      <div className="h3 ">
        <h3>Type</h3>
        <i className="fa-solid fa-caret-right options-arrow "></i>
      </div>
      <div className="options ">
        {type_list.map((type_text, index) => {
          return (
            <button
              onClick={() => {
                dispatch_filter_options({
                  type: "UPDATE_FILTER",
                  payload: { type: type_text },
                });
              }}
              key={index}
              className={`${filter_options.type == type_text ? "option-choise" : ""}`}
            >
              {type_text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Type_filter;
