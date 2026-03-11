import { createContext, useContext, useEffect, useState } from "react";
import { UpdateCartItemsStorage } from "../services/UpdateLocalStorage";
import { toast } from "react-toastify";
import Success_Toast from "../Components/ui/confirm-message/Success_Toast";
const CartContext = createContext();

const CartMenuProvider = ({ children }) => {
  // Set initialvalue to favoriteItems
  let initialValue = [];
  //  If storage favorites in local storage is already exist set the favoriteItems value is storage data
  try {
    initialValue = JSON.parse(localStorage.CartItemsStorage) || [];
  } catch (err) {
    console.log(err);
  }
  // If storage favorites in local storage is not exist or empty then set the favoriteItems value is []

  const [cartItemsData, setCartItemsData] = useState(initialValue);
  const [cartItemsId, setCartItemsId] = useState([]);
  // Adjust the cartBtn Prograss
  const [isHasProducts, setIsHasProducts] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [SubtotalItemsPrice, setSubtotalItemsPrice] = useState(0);

  // Create function to add the new product id to cartItems
  const addToCart = (data) => {
    setCartItemsData([...cartItemsData, data]);
  };

  // Create function to remove the product id has already exist from cartItems
  const removeFromCart = (data) => {
    setCartItemsData((prev) =>
      prev.filter((item_data) => +item_data.id !== +data.id),
    );
  };

  // Create function to handle all cartItems prograss
  const handleCatItemsPrograss = (data) => {
    if (cartItemsId.includes(+data.id)) {
      removeFromCart(data);
      toast(
        <Success_Toast message={"The Product Has Been Deleted From Cart"} />,
      );
    } else {
      addToCart(data);
      toast(<Success_Toast message={"The Product Has Been Added To Cart"} />);
    }
  };

  // Get the Product Data By Id
  const find_data_from_cart = (id) => {
    const final_data = cartItemsData.find((data) => data.id == id);
    return final_data;
  };

  // Increase product quantity
  const icreaseOrReduceProQuantity = (prograss, id) => {
    setCartItemsData((prev) => {
      return prev.map((data) => {
        if (+data.id == +id) {
          if (prograss == "plus" && data.quantity < data.available_quantity) {
            return { ...data, quantity: data.quantity + 1 };
          } else if (prograss == "minus" && data.quantity >= 2) {
            return { ...data, quantity: data.quantity - 1 };
          }
        }
        return data;
      });
    });
  };

  // Clear All Items From Card
  const clearCartItems = () => {
    setCartItemsData([]);
    setCartItemsId([]);
  };

  // Update Local Storage When cartItems Has Change
  useEffect(() => {
    // Update the cartItems Storage in Local Storage
    UpdateCartItemsStorage(cartItemsData);

    // If cartItems has some products then active the cartBtn state
    if (cartItemsData.length > 0) setIsHasProducts(true);
    else setIsHasProducts(false);

    // Update the ids of data every changes happen of cartItemsData
    const getIdsOfData = () => {
      const data_id = cartItemsData.map((data) => +data.id);
      setCartItemsId(data_id);
    };
    getIdsOfData();

    // update subtotal price in cartItems
    setSubtotalItemsPrice(
      cartItemsData.reduce(
        (acc, item) => acc + +item.price * +item.quantity,
        0,
      ),
    );
  }, [cartItemsData]);

  const value = {
    cartItemsId,
    handleCatItemsPrograss,
    isHasProducts,
    isOpenCart,
    setIsOpenCart,
    cartItemsData,
    icreaseOrReduceProQuantity,
    removeFromCart,
    SubtotalItemsPrice,
    find_data_from_cart,
    setCartItemsData,
    clearCartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartMenuProvider;

export const useCartContext = () => {
  return useContext(CartContext);
};
