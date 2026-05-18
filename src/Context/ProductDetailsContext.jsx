import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { useCartContext } from "./CartMenuContext";
import { UpdateCartItemsStorage } from "../services/UpdateLocalStorage";
import { getProductDetails } from "../services/electronicsProductsServices";

// Create Product Details Context
const Product_details_context = createContext();

const Product_details_Provider = ({ children }) => {
  // Current product data
  const [data, set_data] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Access cart context
  const { cartItemsData, setCartItemsData, findItem } = useCartContext();

  // Selected options for this product
  const [color_choose, set_color_choose] = useState(null);
  const product_params = useParams();

  // Find the current product based on product_id and store in state
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const productDetails = await getProductDetails(
          product_params.product_id,
        );
        if (productDetails) {
          set_data(productDetails);
        }
      } catch {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [product_params.product_id]);

  // Check if this product is already in the cart
  const is_in_a_cart = () => {
    const all_id = cartItemsData.map((data) => +data.id);
    return all_id.includes(+product_params.product_id);
  };

  // Reducer for managing selected options (color & storage)
  const selected_options_reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_OPTIONS":
        return {
          color: action.payload.color,
          specification: action.payload.specification,
        };
      default:
        return state;
    }
  };

  // Ref to track if options have been initialized
  const isInitializedRef = useRef(false);

  // Reducer state for selected options (that is just for UI )
  const [selected_options, dispatch_selected_options] = useReducer(
    selected_options_reducer,
    {
      color: "",
      specification: "",
    },
  );

  // Helper to dispatch options updates
  const handle_despatch_options = (action_type, new_data) => {
    dispatch_selected_options({
      type: action_type,
      payload: new_data,
    });
  };

  // Initialize selected options when product data loads
  useEffect(() => {
    if (!data || isInitializedRef.current) return;

    if (is_in_a_cart()) {
      // If product is in cart, use cart values
      const cartItem = findItem(product_params.product_id);
      if (!cartItem) return;

      dispatch_selected_options({
        type: "UPDATE_OPTIONS",
        payload: {
          color: cartItem.color,
          specification: cartItem.specification,
        },
      });
    } else {
      // If not in cart, use default product options
      dispatch_selected_options({
        type: "UPDATE_OPTIONS",
        payload: {
          color: data.selected_options.color,
          specification: data.selected_options.specification,
        },
      });
    }

    isInitializedRef.current = true;
  }, [data]);

  // Update cart when selected options change
  useEffect(() => {
    if (!isInitializedRef.current) return;
    if (!is_in_a_cart()) return;

    const updatedCart = cartItemsData.map((item) =>
      +item.id === +product_params.product_id
        ? {
            ...item,
            color: selected_options.color,
            specification: selected_options.specification,
          }
        : item,
    );

    // Update context and local storage
    setCartItemsData(updatedCart);
    UpdateCartItemsStorage(updatedCart);
  }, [selected_options]);

  // Values provided by Product Details Context
  const value = {
    data,
    set_data,
    color_choose,
    set_color_choose,
    handle_despatch_options,
    selected_options,
    is_in_a_cart,
    loading,
    isError,
  };

  return (
    <Product_details_context.Provider value={value}>
      {children}
    </Product_details_context.Provider>
  );
};

// Custom hook to consume Product Details Context
export const use_product_detials_context = () => {
  return useContext(Product_details_context);
};

export default Product_details_Provider;
