import "./Products.css";
import ProductInformation from "../../Components/Product Details Page Components/Product info components/productInformation";
import Product_details_Provider from "../../Context/Product_details_context";
import { useLayoutEffect } from "react";

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
