import { toast } from "react-toastify";
import { use_product_detials_context } from "../../../../Context/Product_details_context";
import Success_Toast from "../../../confirm-message/Success_Toast";

const Main_Section = () => {
  const { data, handle_despatch_options, selected_options, is_in_a_cart } =
    use_product_detials_context();

  return (
    <div className="main-section">
      <a href={`${data.brand_info.link}`} className="apple-store">
        {data.brand_info.brand_name}
      </a>
      <h1>{data.full_name}</h1>
      <div className="sales-details">
        <div className="rating-details">
          <i className="fa-solid fa-star"></i>
          <span className="rating">{data.ratings.avarage} Ratings</span>
        </div>
        <div className="review-details">
          <span>
            {data.ratings.total_reviews.toString().slice(0, 2)}K Reviews
          </span>
        </div>
        <div className="sold-details">
          <span>{data.sold} Sold</span>
        </div>
      </div>
      <div className="storage-options">
        <p>{data.options.specification.label} :</p>
        {data.options.specification.values.map((stor, index) => {
          return (
            <span
              className={`${stor.label == selected_options.specification ? "choies-storage" : ""}`}
              key={index}
              onClick={() => {
                handle_despatch_options("UPDATE_OPTIONS", {
                  color: selected_options.color,
                  specification: stor.label,
                });
                // Show success toast
                is_in_a_cart() &&
                  toast(<Success_Toast message={"Update Successfully"} />);
              }}
            >
              {stor.label}
            </span>
          );
        })}
      </div>
      <div className="color-option">
        <p>Choose Color :</p>
        <div className="the-options">
          {data.options.colors.map((color, index) => {
            if (color.available) {
              return (
                <span
                  key={index}
                  className={`${color.name == selected_options.color ? "choise-color" : ""}`}
                  onClick={() => {
                    handle_despatch_options("UPDATE_OPTIONS", {
                      color: color.name,
                      specification: selected_options.specification,
                    });
                    // Show success toast
                    is_in_a_cart() &&
                      toast(<Success_Toast message={"Update Successfully"} />);
                  }}
                >
                  <div style={{ background: `${color.hex}` }}></div>
                  {color.name}
                </span>
              );
            }
          })}
        </div>
      </div>
      <div className="item-info">
        <div className="head">
          <h2 className="about-item active">About Item</h2>
          <h2 className="review">Reviews</h2>
        </div>
        <div className="about-item-content">
          <div className="brand">
            Brand: <span>{data.brand}</span>
          </div>
          <div className="material">
            Material: <span>{data.material}</span>
          </div>
          <div className="color">
            Color: <span>{selected_options.color}</span>
          </div>
          <div className="Condition">
            Condition: <span>{data.condition}</span>
          </div>
          <div className="category">
            Category: <span>{data.category}</span>
          </div>
          <div className="Weight">
            Weight: <span>{data.weight_grams} G</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main_Section;
