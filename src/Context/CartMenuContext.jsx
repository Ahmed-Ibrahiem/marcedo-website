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
    let totalPrice = 0;
    Object.values(cartItemsData).forEach((item) => {
      totalPrice += item.quantity * item.variants.price;
    });

    return totalPrice;
  }, [cartItemsData]);

  // Create Function to add the number of items
  const addItem = (data, count = 1) => {
    if (!data.variants) return toast.error("The Operation Dosn't Complate ");
    const variants_id = data.variants.id;

    setCartItemsData((prev) => {
      return {
        ...prev,
        [variants_id]: {
          ...data,
          quantity: prev[variants_id]
            ? prev[variants_id].quantity + count
            : count,
        },
      };
    });

    setIsOpenCart(true);
  };

  const decrementItemCount = (data) => {
    if (!data.variants) return toast.error("The Operation Dosn't Complate ");
    const variants_id = data.variants.id;

    if (cartItemsData[variants_id].quantity > 1)
      setCartItemsData((prev) => ({
        ...prev,
        [variants_id]: {
          ...data,
          quantity: prev[variants_id].quantity - 1,
        },
      }));
  };

  // Create function to remove the product id has already exist from cartItems
  const removeItem = (data) => {
    if (!data.variants) return toast.error("The Operation Dosn't Complate ");
    const variants_id = data.variants.id;
    setCartItemsData((prev) => {
      const { [variants_id]: removeItem, ...rest } = prev;
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
