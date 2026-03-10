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
import { UpdateCartItemsStorage } from "../server/UpdateLocalStorage";


// Create Product Details Context
const Product_details_context = createContext();

const Product_details_Provider = ({ children }) => {
  // Current product data
  const [data, set_data] = useState(null);

  // Access cart context
  const { cartItemsData, setCartItemsData, find_data_from_cart } =
    useCartContext();

  // All products data loaded from JSON
  const [all_products, set_all_products] = useState([]);

  const [is_pro_details_found, set_is_pro_details_found] = useState(true);

  // Selected options for this product
  const [color_choose, set_color_choose] = useState(null);
  const product_params = useParams();

  // Fetch products data when component mounts or product_id changes
  useEffect(() => {
    const get_products_data = async () => {
      // Fetch products from local JSON file
      const req = await fetch("/ProductData.json");
      if (req.status == 200) {
        const res = await req.json();

        // Add default quantity to each product
        const data = res.map((data) => ({ ...data, quantity: 1 }));

        // Save products into state
        set_all_products(data);
      }
    };

    get_products_data();
  }, [product_params]);

  // Find the current product based on product_id and store in state
  useEffect(() => {
    const product = all_products.find((p) => p.id == product_params.product_id);
    if (product) {
      set_data(product);
      set_is_pro_details_found(true);
    } else {
      set_is_pro_details_found(false);
    }
  }, [all_products, product_params.product_id]);

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
      storage: "",
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
      const cartItem = find_data_from_cart(product_params.product_id);
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
    set_all_products,
    color_choose,
    set_color_choose,
    handle_despatch_options,
    selected_options,
    is_in_a_cart,
    is_pro_details_found,
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
