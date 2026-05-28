import { assets } from "../../../assets/assets.js";
import CustomSwiper from "../custom-swiper/CustomSwiper.jsx";
import { SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import ProductCard from "../../product/product-item/ProductCard.jsx";

const FeaturedProducts = ({ bestSellerProducts }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
      viewport={{ amount: 0.2, once: true }}
      className="mt-12.5 w-full container feature_Product"
    >
      <div className="flex items-center flex-col! lg:flex-row! w-full gap-27.5 py-8.75 px-6.25 border-2 border-border rounded-2xl overflow-hidden">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1, transition: { delay: 0.6 } }}
          viewport={{ amount: 0.2, once: true }}
          className="w-full sm:w-[80%] lg:w-[40%]"
        >
          <h1 className="text-4xl w-88.75 mt-7.5 font-bold">
            Devialet Phantom II <span>Speaker</span>
          </h1>
          <div className="text-xs w-12.5 leading-[1.3] mt-5 flex gap-2.5 ">
            <p>STARTING AT PRICE</p>
            <span className="w-fit!">EGP</span>
            <p className="text-3xl text-orange p-0">77,496</p>
          </div>
          <img className="w-110 mt-17.5" src={assets.featur_product} alt="" />
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1, transition: { delay: 0.6 } }}
          viewport={{ amount: 0.2, once: true }}
          className=" w-full sm:max-w-[80%] lg:max-w-[50%]"
        >
          {bestSellerProducts && (
            <CustomSwiper
              className="max-w-full!"
              loop={bestSellerProducts.length > 2}
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
              {bestSellerProducts.map((product_data, index) => {
                if (index < 4) {
                  return (
                    <SwiperSlide key={product_data.id}>
                      <ProductCard product={product_data} />
                    </SwiperSlide>
                  );
                }
              })}
            </CustomSwiper>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeaturedProducts;
