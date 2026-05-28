import styles from "./CreateStarsOfRating.module.css";
import { FaStar } from "react-icons/fa6";

const CreateStarsOfRating = ({ rating_value }) => {
  return (
    <div className={`stars ${styles.stars}`}>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            <FaStar
              key={index}
              className={`${index + 1 <= rating_value ? "text-amber-400" : " text-gray-light!"}`}
            />
          );
        })}
    </div>
  );
};

export default CreateStarsOfRating;
