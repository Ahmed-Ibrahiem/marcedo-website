import { useEffect, useRef, useState } from "react";
import { use_product_detials_context } from "../../../../Context/Product_details_context";

const RatingReviews = () => {
  const { data } = use_product_detials_context();
  const reviews_data = data.ratings;

  const get_percentage = (value) => {
    const total = reviews_data.total_ratings;
    const percentage = (value / total) * 100;
    return `${Math.ceil(percentage)}%`;
  };

  const render_reviews_line = () => {
    const elements = [];
    for (const rate in reviews_data.distribution) {
      elements.push(
        <div key={rate} className="line">
          <i className="fa-solid fa-star"></i>
          <p>{rate}</p>
          <div>
            <span
              data-width={get_percentage(reviews_data.distribution[rate])}
            ></span>
          </div>
          <p
            className="five-star rating"
            data-rate_number={reviews_data.distribution[rate]}
          >
            0
          </p>
        </div>,
      );
    }
    return elements.reverse();
  };

  const reviews_elements_ref = useRef(null);
  const is_animate_done = useRef(false);
  const rating_average_ref = useRef(null);

  // // Animate the progress bars width based on percentage
  const progress_animation = () => {
    if (reviews_elements_ref.current) {
      reviews_elements_ref.current
        .querySelectorAll(".line span")
        .forEach((element) => {
          element.style.width = element.dataset.width;
        });
    }
  };

  // Animate the individual rating numbers from 0 to their actual value
  const rating_animation = () => {
    const total_duration = 1500;
    const frame = 40;
    const step = total_duration / frame;

    reviews_elements_ref.current
      .querySelectorAll(".line .rating")
      .forEach((element) => {
        const target = element.dataset.rate_number;
        let increment = target / step;
        let count = 0;
        const animation = setInterval(() => {
          if (count >= target) {
            clearInterval(animation);
          }
          element.textContent = Math.round(count);
          count += increment;
        }, frame);
      });
  };

  // Animate the total average rating from 0 to actual value
  const total_rating_animate = () => {
    const target = reviews_data.average;
    const total_duration = 1500;
    const frame = 40;
    const step = total_duration / frame;

    let count = 0.0;
    const increment = target / step;

    const animate = setInterval(() => {
      if (count >= target) {
        rating_average_ref.current.textContent = target;
        clearInterval(animate);
      } else {
        rating_average_ref.current.textContent = count.toFixed(1);
        count += increment;
      }
    }, frame);
  };

  // Trigger animations when the reviews section comes into view
  const handle_animation = () => {
    if (window.scrollY >= reviews_elements_ref.current.offsetTop - 200) {
      progress_animation();
      if (!is_animate_done.current) {
        total_rating_animate();
        rating_animation();
        is_animate_done.current = true;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handle_animation);
    return () => window.removeEventListener("scroll", handle_animation);
  }, []);

  return (
    <div className="rating-reviews-container">
      <div className="rating-reviews" ref={reviews_elements_ref}>
        <h2>Ratings & Reviews</h2>
        <div className="rating-reviews-container">
          <div className="left">
            <div className="scor">
              <span className="scor-num" ref={rating_average_ref}>
                0.0
              </span>{" "}
              /<span className="actual-num">5</span>
            </div>
            <div className="stars">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star-half"></i>
            </div>
            <div className="num-of-reviews">
              {`${reviews_data.total_ratings}`.charAt(0)},
              {`${reviews_data.total_ratings}`.charAt(1)}K Reviews
            </div>
          </div>
          <div className="right">{render_reviews_line()}</div>
        </div>
      </div>
    </div>
  );
};

export default RatingReviews;
