import Main_Section from "./Main_Section";
import Description from "./Description";
import Sipping_information from "./Sipping_information";
import Top_Reviews from "./Top_Reviews";
import Review_area from "./Reviews/Review_area";
import Bubbles from "../Bubbles/Bubbles";
import { use_reviews_context } from "../../../../Context/ReviewsProvider";
import Pagination_provider from "../../../../Context/Pagination_provider";

const Product_details = () => {

  return (
    <div className="product-details">
      <Main_Section />
      <Description />
      <Sipping_information />
      {/* <ReviewsProvider> */}
      <Top_Reviews />
      <Pagination_provider>
        <Review_area />
        <Bubbles />
      </Pagination_provider>
      {/* </ReviewsProvider> */}
    </div>
  );
};

export default Product_details;
