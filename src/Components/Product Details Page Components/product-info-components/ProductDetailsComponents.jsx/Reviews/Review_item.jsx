import { assets } from "../../../../../assets/assets";
import { use_format_date_in_reviews } from "../../../../../Hooks/Format_date";

const Review_item = ({ review_data }) => {
  const date_ref = use_format_date_in_reviews(review_data.date);

  return (
    <div className="review review-showing">
      <div className="review-head">
        <div className="image-name">
          <img src={review_data.user_image} alt="" />
          <div>{review_data.user_name}</div>
        </div>
        <div className="rating">
          <i className="fa-solid fa-star"></i>
          <span>{review_data.rating}</span>
          <p>000</p>
        </div>
      </div>
      <div className="special-comments">
        {review_data.tags.map((tag, index) => {
          return <span key={index}>{tag}</span>;
        })}
      </div>
      <div className="the-relley-comment">
        <p>{review_data.comment}</p>
      </div>
      <div className="footer">
        <div className="helpful-btn">
          <i className="fa-solid fa-thumbs-up"></i>
          <span>Helpful?</span>
        </div>
        <div className="publication-time">{date_ref}</div>
      </div>
    </div>
  );
};
export default Review_item;
