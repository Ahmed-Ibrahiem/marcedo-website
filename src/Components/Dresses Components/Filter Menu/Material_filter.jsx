import { use_dress_context } from "../../../Context/DressContext";

const Material_filter = () => {
  const material_list = ["Cotton", "Wool", "Leather", "Other"];

  const { filter_options, dispatch_filter_options } = use_dress_context();

  return (
    <div className="material filter">
      <div className="h3 filter">
        <h3 className="filter">Material</h3>
        <i className="fa-solid fa-caret-right options-arrow filter"></i>
      </div>
      <div className="options filter">
        {material_list.map((material, index) => {
          return (
            <button
              onClick={() => {
                dispatch_filter_options({
                  type: "UPDATE_FILTER",
                  payload: { material },
                });
              }}
              key={index}
              className={`${filter_options.material == material ? "option-choise" : ""}`}
            >
              {material}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Material_filter;
