import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { createContext, useContext } from "react";

// Create context for collections data
const collections_context = createContext([]);

// Provider component responsible for fetching and providing collections data
const Shop_provider = ({ children }) => {
  // State to store all collections data
  const [all_collections, set_all_collections] = useState([]);

  // Ref used to prevent multiple API calls (simulate componentDidMount behavior)
  const is_render_done = useRef(false);

  // Fetch collections data once when the component mounts
  useEffect(() => {
    // Prevent re-running the effect on re-renders
    if (is_render_done.current) return;

    is_render_done.current = true;

    // Async function to fetch data from API
    const get_data = async () => {
      const req = await axios.get("/collections.json");

      // Check if request is successful
      if (req.status == 200) {
        const { data } = req;

        // Update state with fetched data
        set_all_collections(data);
      }
    };

    // Call the async function
    get_data();
  }, []);

  // Value provided to all consuming components
  const value = {
    all_collections, // Collections data
  };

  return (
    <collections_context.Provider value={value}>
      {children}
    </collections_context.Provider>
  );
};

// Custom hook to access collections context بسهولة
export const use_shop_context = () => {
  return useContext(collections_context);
};

export default Shop_provider;
