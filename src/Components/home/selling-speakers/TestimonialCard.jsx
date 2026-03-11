import CreateStarsOfRating from "../../product/create-stars-of-rating/CreateStarsOfRating";
import "./TestimonialCard.css";

const TestimonialCard = ({ testimonial_data }) => {
  return (
    <div className="testimonial_card">
      <CreateStarsOfRating rating_value={testimonial_data.rating} />
      <h3>{testimonial_data.title}</h3>
      <p>{testimonial_data.content}</p>
      <div className="personal-info">
        <img
          alt={`The Image Of User ${testimonial_data.id}`}
          loading="lazy"
          src={testimonial_data.avatar}
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
