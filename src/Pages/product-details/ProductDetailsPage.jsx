import Reviews_Provider from "../../Context/Reviews_Provider";
import ReviewsUIProvider from "../../Context/ReviewsUIProvider";
import FeaturesSection from "./components/FeaturesSection";
import ReviewsSection from "./components/ReviewsSection";
import ProductDetails from "./ProductDetails";
import ProductInfo from "./ProductInfo";
import ProductMedia from "./ProductMedia";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import CreateReviewForm from "./components/CreateReviewForm";
import RecommendedProducts from "./components/RecommendedProducts";
import {
  getProductById,
  getProductBySlug,
} from "../../services/ProductsServices.js";
import { Link, useParams } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import ProductDetailsProvider from "../../Context/ProductDetailsProvider.jsx";

const ProductDetailsPage = () => {
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWrong, setIsWrong] = useState(false);
  const { productSlug } = useParams();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, [productSlug]);

  useEffect(() => {
    const get_product = async () => {
      try {
        setIsLoading(true);
        const data = await getProductBySlug(productSlug);
        if (data) {
          setProductData(data);
        } else {
          throw new Error("");
        }
      } catch (error) {
        console.log(error);
        setIsWrong(true);
      } finally {
        setIsLoading(false);
      }
    };

    get_product();
  }, [productSlug]);

  return (
    <>
      {isWrong && <div>Something went wrong</div>}
      {isLoading && <div>Loading...</div>}
      {productData && (
        <div>
          <div className="container ">
            {/* Path */}
            <div className="access-path flex-start my-10 text-sm! gap-2 font-semibold">
              <Link to={"/"} className="master-page">
                Home
              </Link>
              <FaAngleRight />
              <span className="current-page text-orange">
                Apple Iphone 15 (128 GB) - Black
              </span>
            </div>

            <div className="product-info w-full grid grid-cols-1 lg:grid-cols-2 px-5 sm:px-0 relative ">
              {/* Product Images Gallary */}
              <ProductMedia productData={productData} />
              {/* Product Basics info */}
              <ProductDetailsProvider productData={productData}>
                <ProductInfo productData={productData} />
              </ProductDetailsProvider>
            </div>

            {/* Product Detials */}
            <ProductDetails productData={productData} />
          </div>

          {/* Start Features Section */}
          <FeaturesSection />

          {/* Start Reviews Section */}
          {productData && (
            <Reviews_Provider productData={productData}>
              <ReviewsUIProvider>
                <ReviewsSection />
                {/* Start CreateReviewForm Popup */}
                <CreateReviewForm />
              </ReviewsUIProvider>
            </Reviews_Provider>
          )}

          {/* Recommended Products Section  */}
          <RecommendedProducts productData={productData} />
        </div>
      )}
    </>
  );
};

export default ProductDetailsPage;
