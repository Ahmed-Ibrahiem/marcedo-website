import BestSeller from "../../Components/best-seller/BestSeller";
import Brands from "../../Components/brands/Brands";
import { Collection } from "../../Components/Collection/Collection";
import Deals from "../../Components/Deals/Deals";
import FeaturedProducts from "../../Components/featured-products/FeaturedProducts";
import HeroSection from "../../Components/hero-section/HeroSection";
import PopularCategories from "../../Components/popular-categories/PopularCategories";
import PerOrder from "../../Components/pre-order/PerOrder";
import Testimonials from "../../Components/Testimonials/Testimonials";

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
