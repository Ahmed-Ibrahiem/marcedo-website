import { SwiperSlide } from "swiper/react";
import CustomSwiper from "../custom-swiper/CustomSwiper.jsx";
import TestimonialCard from "../selling-speakers/TestimonialCard.jsx";
import "./Testimonials.css";
import { useFetch } from "../../../services/fetchData.js";

const Testimonials = () => {
  const data_url = "listingTestmonials.json";

  // Fetch testimonials data at the top level of the component
  const testimonials = useFetch(data_url);

  return (
    <div className="testimonials">
      <div className="container">
        <h1>Best Selling Speakers</h1>
        <CustomSwiper
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            720: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {/* Render a slide for each testimonial */}
          {testimonials &&
            testimonials.map((data) => {
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
