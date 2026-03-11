import BestSeller from "../../Components/home/best-seller/BestSeller";
import Brands from "../../Components/home/brands/Brands";
import { Collection } from "../../Components/home/collection/Collection";
import Deals from "../../Components/home/Deals/Deals";
import FeaturedProducts from "../../Components/home/featured-products/FeaturedProducts";
import HeroSection from "../../Components/home/hero-section/HeroSection";
import PopularCategories from "../../Components/home/popular-categories/PopularCategories";
import PerOrder from "../../Components/home/pre-order/PerOrder";
import Testimonials from "../../Components/home/Testimonials/Testimonials";

const Home = () => {
  return (
    <div className="Home_page">
      <HeroSection />
      <PopularCategories />
      <Deals />
      <PerOrder />
      <BestSeller />
      <Brands />
      <Collection />
      <FeaturedProducts />
      <Testimonials />
    </div>
  );
};

export default Home;
