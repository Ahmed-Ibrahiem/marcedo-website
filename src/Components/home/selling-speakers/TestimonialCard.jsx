import { useState } from "react";
import CreateStarsOfRating from "../../product/create-stars-of-rating/CreateStarsOfRating";
import "./TestimonialCard.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TestimonialCard = ({ testimonial_data }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="testimonial_card">
      <CreateStarsOfRating rating_value={testimonial_data.rating} />
      
      <h3>{testimonial_data.title}</h3>
      <p>{testimonial_data.content}</p>
      <div className="personal-info">
        {!loaded && (
          <Skeleton
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "65px",
              height: "65px",
            }}
            circle={true}
          />
        )}
        <img
          alt={`The Image Of User ${testimonial_data.id}`}
          loading="lazy"
          src={testimonial_data.avatar}
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0 }}
        />
        <div className="info">
          <h4>
            {testimonial_data.author_name}{" "}
            <span>{testimonial_data.verified ? "VERFIYIED BUYER" : ""}</span>
          </h4>
          <p>{testimonial_data.location}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
