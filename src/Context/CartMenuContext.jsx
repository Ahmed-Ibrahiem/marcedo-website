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
  const addItem = (data) => {
    setCartItemsData([...cartItemsData, data]);
  };

  // Create function to remove the product id has already exist from cartItems
  const removeItem = (data) => {
    setCartItemsData((prev) =>
      prev.filter((item_data) => +item_data.id !== +data.id),
    );
  };

  // Create function to handle all cartItems prograss
  const toggleItem = (data) => {
    if (cartItemsId.includes(+data.id)) {
      removeItem(data);
      toast(
        <Success_Toast message={"The Product Has Been Deleted From Cart"} />,
      );
    } else {
      addItem(data);
      toast(<Success_Toast message={"The Product Has Been Added To Cart"} />);
    }
  };

  // Get the Product Data By Id
  const findItem = (id) => {
    const final_data = cartItemsData.find((data) => data.id == id);
    return final_data;
  };

  /*
  updateProductQuantity function
  [1] find item data
  [2] if item is not exist then: return
  [3] else item is exist then:
    [3.1] if type is "plus" && quantity < available_quantity: increase quantity
    [3.2] if type is "minus" && quantity >= 2: decrease quantity
  [4] update the cartItems
*/
  const updateProductQuantity = (type, id) => {
    // [1] find item data
    const item = cartItemsData.find((data) => +data.id === +id);

    // [2] if item is not exist then: return "don't do nothing"
    if (!item) return;
    // [3] else item is exist then:
    let updateItem = null;
    // if type is "plus" && quantity < available_quantity: increase quantity
    if (type === "plus" && item.quantity < item.available_quantity) {
      // increase quintity number.
      updateItem = { ...item, quantity: item.quantity + 1 };
    }
    // [3.2] if type is "minus" && quantity >= 2: decrease quantity
    else if (type === "minus" && item.quantity >= 2) {
      // decrease quintity number.
      updateItem = { ...item, quantity: item.quantity - 1 };
    }
    // [4] update the cartItem
    if (!updateItem) return;
    const newCart = cartItemsData.map((data) =>
      data.id === item.id ? updateItem : data,
    );
    setCartItemsData(newCart);
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
    toggleItem,
    isHasProducts,
    isOpenCart,
    setIsOpenCart,
    cartItemsData,
    updateProductQuantity,
    removeItem,
    SubtotalItemsPrice,
    findItem,
    setCartItemsData,
    clearCartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartMenuProvider;

export const useCartContext = () => {
  return useContext(CartContext);
};
