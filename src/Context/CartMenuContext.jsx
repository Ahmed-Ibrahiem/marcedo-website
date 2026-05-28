import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { UpdateCartItemsStorage } from "../services/UpdateLocalStorage";
import { toast } from "react-toastify";
import Success_Toast from "../Components/ui/confirm-message/Success_Toast";
const CartContext = createContext();

const CartMenuProvider = ({ children }) => {
  // Set initialvalue to favoriteItems
  let initialValue = {};
  //  If storage favorites in local storage is already exist set the favoriteItems value is storage data
  try {
    initialValue = JSON.parse(localStorage.CartItemsStorage) || {};
  } catch (err) {
    console.log(err);
  }
  // If storage favorites in local storage is not exist or empty then set the favoriteItems value is []

  const [cartItemsData, setCartItemsData] = useState(initialValue);
  // Adjust the cartBtn Prograss
  const [isOpenCart, setIsOpenCart] = useState(false);
  const SubtotalItemsPrice = useMemo(() => {
    return Object.values(cartItemsData).reduce(
      (acc, item) => acc + +item.current_price * +item.quantity,
      0,
    );
  }, [cartItemsData]);

  // Create function to add the new product id to cartItems
  const addItem = (data) => {
    setCartItemsData((prev) => {
      return {
        ...prev,
        [data.id]: {
          ...data,
          quantity: prev[data.id] ? prev[data.id].quantity + 1 : 1,
        },
      };
    });

    setIsOpenCart(true);
  };

  const decrementItemCount = (data) => {
    if (cartItemsData[data.id].quantity > 1)
      setCartItemsData((prev) => ({
        ...prev,
        [data.id]: {
          ...data,
          quantity: prev[data.id].quantity - 1,
        },
      }));
  };

  // Create function to remove the product id has already exist from cartItems
  const removeItem = (data) => {
    setCartItemsData((prev) => {
      const { [data.id]: removeItem, ...rest } = prev;
      return rest;
    });
  };

  // Clear All Items From Card
  const clearCartItems = () => {
    setCartItemsData({});
  };

  // Update Local Storage When cartItems Has Change
  useEffect(() => {
    // Update the cartItems Storage in Local Storage
    UpdateCartItemsStorage(cartItemsData);
  }, [cartItemsData]);

  const value = {
    isOpenCart,
    setIsOpenCart,
    cartItemsData,
    removeItem,
    SubtotalItemsPrice,
    setCartItemsData,
    clearCartItems,
    addItem,
    decrementItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartMenuProvider;

export const useCartContext = () => {
  return useContext(CartContext);
};
