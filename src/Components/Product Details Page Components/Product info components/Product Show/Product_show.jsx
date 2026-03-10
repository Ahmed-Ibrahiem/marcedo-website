import { useState } from "react";
import { use_product_detials_context } from "../../../../Context/Product_details_context";

const Product_show = () => {
  const [main_index, set_main_index] = useState(0);
  const { data } = use_product_detials_context();
  const gallary = data.images.gallery;
  return (
    <div className="product-show">
      <div className="big-show">
        {gallary.map((url, index) => {
          return (
            <img
              key={index}
              src={url}
              className={`${index == main_index ? "current-img" : ""}`}
            />
          );
        })}
      </div>
      <div className="small-show">
        {gallary.map((url, index) => {
          return (
            <div
              onClick={() => set_main_index(index)}
              key={index}
              className="product1"
            >
              <img src={url} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Product_show;
