import { Swiper } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./CustomSwiper.css";

const CustomSwiper = ({ children, ...props }) => {
  return (
    <Swiper 
      modules={[Navigation, Pagination, Autoplay]}
      autoplay={{
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }}
      {...props}
    >
      {children}
    </Swiper>
  );
};

export default CustomSwiper;
