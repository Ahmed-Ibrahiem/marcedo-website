import { assets } from "../../../assets/assets.js";
import ProductItem from "../../product/product-item/ProductItem.jsx";
import "./FeaturedProducts.css";
import CustomSwiper from "../custom-swiper/CustomSwiper.jsx";
import { SwiperSlide } from "swiper/react";
import { useFetchAllProducts } from "../../../Context/FetchAllProducts.jsx";
import { motion } from "framer-motion";

const FeaturedProducts = () => {
  const { listingProducts } = useFetchAllProducts();

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      viewport={{ amount: 0.2, once: true }}
      className="feature_Product"
    >
      <div className="container">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1, transition: { delay: 0.6 } }}
          viewport={{ amount: 0.2, once: true }}
          className="right"
        >
          <h1>
            Devialet Phantom II <span>Speaker</span>
          </h1>
          <div className="price">
            <p>STARTING AT PRICE</p>
            <span>EGP</span>
            <p className="sell">77,496</p>
          </div>
          <img src={assets.featur_product} alt="" />
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1, transition: { delay: 0.6 } }}
          viewport={{ amount: 0.2, once: true }}
          className="left"
        >
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
            {listingProducts &&
              listingProducts.map((product_data, index) => {
                if (index < 4) {
                  return (
                    <SwiperSlide key={product_data.id}>
                      <ProductItem product_data={product_data} />
                    </SwiperSlide>
                  );
                }
              })}
          </CustomSwiper>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeaturedProducts;
