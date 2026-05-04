import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./HeroSection.css";
import { swiper_slider_info } from "../../../assets/assets";
import { useState } from "react";
import HeroSingle from "../Hero Single/HeroSingle";
import CustomSwiper from "../custom-swiper/CustomSwiper";
import { motion } from "framer-motion";
const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, ease: "easeInOut" , duration: 0.5 }}
    >
      <CustomSwiper
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        navigation
        loop={true}
        speed={700}
        className="hero_section"
      >
        {swiper_slider_info.map((slider, index) => {
          return (
            <SwiperSlide key={index}>
              <HeroSingle
                index={index}
                activeIndex={activeIndex}
                slider={slider}
              />
            </SwiperSlide>
          );
        })}
      </CustomSwiper>
    </motion.div>
  );
};

export default HeroSection;
