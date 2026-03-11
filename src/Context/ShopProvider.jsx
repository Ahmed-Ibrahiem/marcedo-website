import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { createContext, useContext } from "react";

const collections_context = createContext([]);

const Shop_provider = ({ children }) => {
  const [all_collections, set_all_collections] = useState([]);
  const is_render_done = useRef(false);

  useEffect(() => {
    if (is_render_done.current) return;

    is_render_done.current = true;

    const get_data = async () => {
      const req = await axios.get("/collections.json");
      if (req.status == 200) {
        const data = await req.data;
        set_all_collections(data);
      }
    };

    get_data();
  }, []);

  const value = {
    all_collections,
  };

  return (
    <collections_context.Provider value={value}>
      {children}
    </collections_context.Provider>
  );
};

export const use_shop_context = () => {
  return useContext(collections_context);
};

export default Shop_provider;
