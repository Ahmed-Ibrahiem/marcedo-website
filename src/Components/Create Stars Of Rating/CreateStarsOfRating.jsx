import styles from "./CreateStarsOfRating.module.css";

const CreateStarsOfRating = ({ rating_value }) => {
  return (
    <div className={`stars ${styles.stars}`}>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            <i
              key={index}
              className={`fa-solid fa-star ${
                index <= Math.floor(rating_value) - 1 ? styles.active : ""
              }`}
            ></i>
          );
        })}
    </div>
  );
};

export default CreateStarsOfRating;
