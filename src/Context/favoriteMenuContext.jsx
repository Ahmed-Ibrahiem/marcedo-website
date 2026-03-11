import { createContext, useContext, useEffect, useState } from "react";
import { UpdateFavoriteStorage } from "../services/UpdateLocalStorage.js";
import { toast } from "react-toastify";
import Success_Toast from "../Components/ui/confirm-message/Success_Toast.jsx";
const favoriteContext = createContext([]);

const FavoriteProvider = ({ children }) => {
  // Set initialvalue to favoriteItems
  const initialValue = localStorage.FavoriteStorage
    ? //  If storage favorites in local storage is already exist set the favoriteItems value is storage data
      JSON.parse(localStorage.FavoriteStorage)
    : // If storage favorites in local storage is not exist or empty then set the favoriteItems value is []
      [];
  const [favoriteItems, setFavoriteItems] = useState(initialValue);
  const [favoriteItemsId, setFavoriteItemsId] = useState([]);
  const [isHasFevoritesProducts, setIsHasFevoritesProducts] = useState(false);

  // Create function to remove the favorite product from favoriteItems menu
  const removeFromFavorites = (data) => {
    setFavoriteItems((prev) => prev.filter((item) => item.id !== data.id));
  };

  // Create function to add the favorite product from favoriteItems menu
  const addToFavorites = (data) => {
    setFavoriteItems((prev) => [...prev, data]);
  };

  // Create functin to handle the adding and removing prograss in the favoriteItems menu
  const handleFavoriteItems = (data) => {
    // Check if the product id is not includes in favoriteItem menu then add his id in favoriteItem menu
    if (!favoriteItemsId.includes(data.id)) {
      addToFavorites(data);
      toast(
        <Success_Toast message={"The product has been added to favorites"} />,
      );
    }
    // Check if the product id is includes in favoriteItem menu then remove his id from favoriteItem menu
    else {
      removeFromFavorites(data);
      toast(
        <Success_Toast
          message={"The Product Has Been Deleted From favorites"}
        />,
      );
    }
  };

  // Update Local Storage When favoriteItems Has Change
  useEffect(() => {
    UpdateFavoriteStorage(favoriteItems);
    // Update ids of favorite data every changes happen of the favoriteItems
    const getIdsOfData = () => {
      const data_id = favoriteItems.map((data) => data.id);
      setFavoriteItemsId(data_id);
    };
    getIdsOfData();

    // Update isHasFevoritesProducts
    if (favoriteItems.length > 0) setIsHasFevoritesProducts(true);
  }, [favoriteItems]);

  const value = {
    favoriteItems,
    favoriteItemsId,
    handleFavoriteItems,
    isHasFevoritesProducts,
  };

  return (
    <>
      <favoriteContext.Provider value={value}>
        {children}
      </favoriteContext.Provider>
    </>
  );
};

export default FavoriteProvider;

export const useFavoriteContext = () => {
  return useContext(favoriteContext);
};
