import { SwiperSlide } from "swiper/react";
import CustomSwiper from "../custom-swiper/CustomSwiper.jsx";
import TestimonialCard from "../selling-speakers/TestimonialCard.jsx";
import "./Testimonials.css";
import { useFetch } from "../../../services/fetchData.js";
import { motion } from "framer-motion";

const Testimonials = () => {
  const data_url = "listingTestmonials.json";

  // Fetch testimonials data at the top level of the component
  const testimonials = useFetch(data_url);

  return (
    <div className="testimonials">
      <div className="container">
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1, transition: { delay: 0.2 } }}
          viewport={{ amount: 0.5, once: true }}
        >
          Best Selling Speakers
        </motion.h1>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
          viewport={{ amount: 0.2, once: true }}
        >
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
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
