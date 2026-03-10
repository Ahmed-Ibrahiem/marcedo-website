import Product_show from "./Product Show/Product_show";
import Product_details from "./ProductDetailsComponents.jsx/Product_details";
import RatingReviews from "./Rating Reviews/RatingReviews";
import SetOrder from "./Set Order/SetOrder";

// Context for product details
import { use_product_detials_context } from "../../../Context/Product_details_context";
import ReviewsProvider from "../../../Context/ReviewsProvider";
import Recommendations from "./ProductDetailsComponents.jsx/Recommendations/Recommendations";
import PathPage from "../PathPage";
import Coming_soon from "../../Coming Soon/Coming_soon";

const ProductInformation = () => {
  const { data } = use_product_detials_context();

  if (data) {
    return (
      <>
        <PathPage />
        <div className="product-information">
          {data != undefined && data != {} && (
            <>
              {/* Product images / gallery */}
              <Product_show />

              {/* Product main details */}
              <ReviewsProvider>
                <Product_details />
              </ReviewsProvider>

              {/* Ratings and reviews section */}
              <RatingReviews />

              {/* Order setup (quantity, add to cart, etc.) */}
              <SetOrder />
            </>
          )}
        </div>
        <Recommendations />
      </>
    );
  } else {
    return <Coming_soon />;
  }
};

export default ProductInformation;
