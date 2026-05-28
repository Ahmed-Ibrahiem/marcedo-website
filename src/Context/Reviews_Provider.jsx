import { createContext, useContext, useEffect, useState } from "react";
import {
  getProductReviews,
  getProductRatings,
} from "../services/productDetailsServices";

const reviewsContext = createContext(null);

const Reviews_Provider = ({ productData, children }) => {
  const [productReviews, setProductReviews] = useState(null);
  const [productRatings, setProductRatings] = useState(null);

  useEffect(() => {
    if (!productData) return;
    const getReviews = async () => {
      const reviews = await getProductReviews(productData.id);
      if (!reviews) return;
      setProductReviews(reviews);
    };

    const getRatings = async () => {
      const ratings = await getProductRatings(productData.id);
      if (!ratings) return;
      setProductRatings(ratings);
    };

    getReviews();
    getRatings();
  }, [productData]);

  const value = {
    productData,
    productReviews,
    productRatings,
  };

  return (
    <reviewsContext.Provider value={value}>{children}</reviewsContext.Provider>
  );
};

export const useReviewsContext = () => {
  const context = reviewsContext;
  if (!context) {
    throw new Error("reviewsContext context must culled in Reviews Provider");
  }

  return useContext(context);
};

export default Reviews_Provider;
