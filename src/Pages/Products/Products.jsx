import "./Products.css";
import Product_details_Provider from "../../Context/ProductDetailsContext";
import { useLayoutEffect } from "react";
import ProductInformation from "./components/product-info-components/ProductInformation";

const Products = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="product_page">
        <div className="container">
          <Product_details_Provider>
            <ProductInformation />
          </Product_details_Provider>
        </div>
      </div>
    </>
  );
};

export default Products;
