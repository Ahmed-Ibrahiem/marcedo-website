import { useEffect, useState } from "react";
import BestSeller from "../../Components/home/best-seller/BestSeller";
import Brands from "../../Components/home/brands/Brands";
import { Collection } from "../../Components/home/collection/Collection";
import Deals from "../../Components/home/Deals/Deals";
import FeaturedProducts from "../../Components/home/featured-products/FeaturedProducts";
import HeroSection from "../../Components/home/hero-section/HeroSection";
import PopularCategories from "../../Components/home/popular-categories/PopularCategories";
import PreOrder from "../../Components/home/pre-order/PreOrder";
import Testimonials from "../../Components/home/Testimonials/Testimonials";
import { getBestSellerProducts } from "../../services/ProductsServices";

const Home = () => {
  const [bestSellerProducts, setBestSellerProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getBestSellerProducts();
        if (data) {
          setBestSellerProducts(data);
        }
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="Home_page">
      <HeroSection />
      <PopularCategories />
      <Deals />
      <PreOrder />
      <BestSeller bestSellerProducts={bestSellerProducts} />
      <Brands />
      <Collection />
      <FeaturedProducts bestSellerProducts={bestSellerProducts} />
      <Testimonials />
    </div>
  );
};

export default Home;
