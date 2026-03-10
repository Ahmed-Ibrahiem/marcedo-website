import { use_dress_context } from "../../../Context/DressContext";

const Brand_filter = () => {
  const brand_list = ["All", "Zara", "New-balance", "H&M"];
  const { filter_options, dispatch_filter_options } = use_dress_context();

  return (
    <div className="brand ">
      <div className="h3 options-title-active ">
        <h3 className="">Brand</h3>
        <i className="fa-solid fa-caret-right options-arrow "></i>
      </div>
      <div className="options options-active ">
        {brand_list.map((brand_text, index) => {
          return (
            <button
              onClick={() => {
                dispatch_filter_options({
                  type: "UPDATE_FILTER",
                  payload: { brand: brand_text },
                });
              }}
              key={index}
              className={`${filter_options.brand == brand_text ? "option-choise" : ""}`}
            >
              {brand_text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Brand_filter;
