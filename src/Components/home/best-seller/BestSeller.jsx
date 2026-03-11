import ProductItem from "../../product/product-item/ProductItem";
import "./BestSeller.css";
import { useFetchAllProducts } from "../../../Context/FetchAllProducts";
import { useState } from "react";

const BestSeller = () => {
  const { all_products } = useFetchAllProducts();
  const [see_all_products, set_see_all_products] = useState(false);

  return (
    <div className="prodcuts_grid">
      <div className="container">
        <h1>
          Best <span>Seller</span>
        </h1>
        <div className="products">
          {all_products &&
            all_products.map((product_data, index) => {
              if (see_all_products) {
                return (
                  <div key={index} className="col">
                    <ProductItem product_data={product_data} />
                  </div>
                );
              } else {
                if (index < 8) {
                  return (
                    <div key={index} className="col">
                      <ProductItem product_data={product_data} />
                    </div>
                  );
                }
              }
            })}
        </div>
        <button
          onClick={() => set_see_all_products((prev) => !prev)}
          className="see_all_products"
        >
          {see_all_products ? "See Less" : "See All Products"}
        </button>
      </div>
    </div>
  );
};

export default BestSeller;
