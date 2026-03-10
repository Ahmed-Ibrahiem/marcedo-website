import BestSeller from "../../Components/Best Seller/BestSeller";
import Brands from "../../Components/Brands/Brands";
import { Collection } from "../../Components/Collection/Collection";
import Deals from "../../Components/Deals/Deals";
import FeaturedProducts from "../../Components/Featured Products/FeaturedProducts";
import HeroSection from "../../Components/Hero Section/HeroSection";
import PopularCategories from "../../Components/Popular Categories/PopularCategories";
import PerOrder from "../../Components/Pre Order/PerOrder";
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
