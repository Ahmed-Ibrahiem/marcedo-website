import { assets } from "../../assets/assets.js";
import ProductItem from "../product-item/ProductItem.jsx";
import "./FeaturedProducts.css";
import CustomSwiper from "../custom-swiper/CustomSwiper.jsx";
import { SwiperSlide } from "swiper/react";
import { useFetchAllProducts } from "../../Context/FetchAllProducts.jsx";

const FeaturedProducts = () => {
  const { all_products } = useFetchAllProducts();

  return (
    <div className="feature_Product">
      <div className="container">
        <div className="right">
          <h1>
            Devialet Phantom II <span>Speaker</span>
          </h1>
          <div className="price">
            <p>STARTING AT PRICE</p>
            <span>EGP</span>
            <p className="sell">77,496</p>
          </div>
          <img src={assets.featur_product} alt="" />
        </div>

        <div className="left">
          <CustomSwiper
            className="swiper_"
            loop={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              720: {
                slidesPerView: 2,
              },
            }}
            pagination={{ type: "fraction" }}
          >
            {all_products &&
              all_products.map((product_data, index) => {
                if (index < 4) {
                  return (
                    <SwiperSlide key={product_data.id}>
                      <ProductItem product_data={product_data} />
                    </SwiperSlide>
                  );
                }
              })}
          </CustomSwiper>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
