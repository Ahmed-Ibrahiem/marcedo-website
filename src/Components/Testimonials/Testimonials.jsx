import { SwiperSlide } from "swiper/react";
import CustomSwiper from "../Custom Swiper/CustomSwiper";
import TestimonialCard from "../Selling Speakers/TestimonialCard.jsx";
import "./Testimonials.css";
import { useFetch } from "../../server/fetchData.js";

const Testimonials = () => {
  const data_url = "listingTestmonials.json";

  return (
    <div className="testimonials">
      <div className="container">
        <h1>Best Selling Speakers</h1>
        <CustomSwiper
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            720: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {useFetch(data_url) &&
            useFetch(data_url).map((data, index) => {
              return (
                <SwiperSlide key={data.id}>
                  <TestimonialCard testimonial_data={data} />
                </SwiperSlide>
              );
            })}
        </CustomSwiper>
      </div>
    </div>
  );
};

export default Testimonials;
