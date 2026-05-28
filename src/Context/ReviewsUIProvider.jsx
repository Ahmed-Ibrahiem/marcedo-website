import { createContext, useContext, useState } from "react";

// contexts/ReviewsUIContext.jsx
const ReviewsUIContext = createContext(null);

const ReviewsUIProvider = ({ children }) => {
  const [userRated, setUserRated] = useState(-1);
  const [isClicked, setIsClicked] = useState(false);
  const [isUserRated, setIsUserRated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isOpenReviewForm, setIsOpenReviewForm] = useState(false);

  return (
    <ReviewsUIContext.Provider
      value={{
        userRated,
        setUserRated,
        isClicked,
        setIsClicked,
        isUserRated,
        setIsUserRated,
        currentStep,
        setCurrentStep,
        isOpenReviewForm,
        setIsOpenReviewForm,
      }}
    >
      {children}
    </ReviewsUIContext.Provider>
  );
};

export const useReviewsUIContext = () => {
  const context = ReviewsUIContext;
  if (!context) {
    throw new Error(
      "reviewsUIContext context must culled in ReviewsUIProvider",
    );
  }

  return useContext(context);
};

export default ReviewsUIProvider;
