import axios, { all } from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { data } from "react-router-dom";

// Initialize the context for categories
const categories_context = createContext();

const Categories_provider = ({ children }) => {
  // State to track the currently selected collection/category
  const [current_collection, set_current_collection] = useState(null);

  // State to store the full list of products fetched from the server
  const [all_products, set_all_products] = useState([]);

  // Mock data for available colors in the system
  const dome_color = [
    { id: 1, name: "Camel", countity: 2, code: "#C19A6B" },
    { id: 2, name: "Terracotta", countity: 5, code: "#E2725B" },
    { id: 3, name: "Mustard Yellow", countity: 7, code: "#FFDB58" },
    { id: 4, name: "Sage Green", countity: 4, code: "#8A9A5B" },
    { id: 5, name: "Beige / Sand", countity: 1, code: "#F5F5DC" },
  ];

  // States to hold dynamically extracted filter options based on products
  const [colors_id, set_colors_id] = useState([]);
  const [available_color, set_available_color] = useState([]);
  const [available_size, set_available_size] = useState([]);
  const [available_brands, set_available_brands] = useState([]);
  const [stock_nums, set_stock_nums] = useState({ in_stock: 0, out_stock: 0 });

  /**
   * Effect: Fetch products whenever the current_collection changes.
   * Filters the API response based on the collection's slug.
   */
  useEffect(() => {
    if (!current_collection) return;

    const get_data = async () => {
      try {
        const req = await axios.get("/all_products.json");

        if (req.status === 200) {
          let data = req.data;
          // Filter products that belong to the current collection
          let products = data.filter((item) =>
            item.category.includes(current_collection.slug),
          );
          set_all_products(products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    get_data();
  }, [current_collection]);

  const get_products_info = (arr) => {
    let all_colors = [];
    let all_size = [];
    let all_brands = [];
    let stocks = { in_stock: [], out_stock: [] };

    arr.forEach((element) => {
      if (!element.size || !element.colors) return;

      // Collect unique color IDs
      element.colors.forEach((color) => {
        if (!all_colors.includes(color.id)) all_colors.push(color.id);
      });

      // Collect unique sizes
      element.size.forEach((sz) => {
        if (!all_size.includes(sz)) all_size.push(sz);
      });

      // Collect unique stocks numbers
      if (element.stock == "in-stock") {
        stocks = { ...stocks, in_stock: [...stocks.in_stock, element] };
      } else {
        stocks = { ...stocks, out_stock: [...stocks.out_stock, element] };
      }

      // Collect unique brands
      if (element.brand && !all_brands.includes(element.brand)) {
        all_brands.push(element.brand);
      }
    });

    set_colors_id(all_colors);
    set_available_size(all_size);
    set_available_brands(all_brands);
    set_stock_nums(stocks);
  };

  // Get Products Info in first time after fetch data
  useEffect(() => {
    if (!all_products.length) return;
    get_products_info(all_products);
  }, [all_products]);

  /**
   * Effect: Map the extracted color IDs to the actual color objects (name, hex code).
   */
  useEffect(() => {
    const colors_data = dome_color.filter((color) =>
      colors_id.includes(color.id),
    );
    set_available_color(colors_data);
  }, [colors_id]);

  /* --- Filter Logic Section --- */

  // Default state for filters
  const initial_filter = {
    availability: [],
    price: {
      highest_price: 8000,
      min: 0,
      max: 8000,
    },
    colors: [],
    size: [],
    brands: [],
  };

  /**
   * Reducer function to handle complex filter state updates.
   */
  const reducer_filter = (state, action) => {
    const updates = {
      TOGGLE_AVAILIBILITY: "availability",
      UPDATE_PRICE: "price",
      UPDATE_COLORS: "colors",
      UPDATE_SIZE: "size",
      UPDATE_BRANDS: "brands",
    };

    if (updates[action.type]) {
      return { ...state, [updates[action.type]]: action.payload };
    }
    return state;
  };

  /**
   * Helper function to toggle values in filter arrays (e.g., adding/removing a size).
   */
  const update_filter_options = (update_info, validation) => {
    const current_options = [...filter_options[validation]];
    let result;

    if (current_options.includes(update_info.value)) {
      // Remove if already selected
      result = current_options.filter((op) => op !== update_info.value);
    } else {
      // Add if not selected
      result = [...current_options, update_info.value];
    }
    dispatch_filter({ type: update_info.type, payload: result });
  };

  const [filter_options, dispatch_filter] = useReducer(
    reducer_filter,
    initial_filter,
  );

  const [filter_products, set_filter_products] = useState([]);

  /**
   * Effect: Sync local filter state with the current_collection's default filters
   * when the collection changes.
   */
  useEffect(() => {
    if (!current_collection || !current_collection.filters) return;

    const action_map = {
      availability: "TOGGLE_AVAILIBILITY",
      price: "UPDATE_PRICE",
      colors: "UPDATE_COLORS",
      size: "UPDATE_SIZE",
      brands: "UPDATE_BRANDS",
    };

    for (const key in current_collection.filters) {
      if (action_map[key]) {
        dispatch_filter({
          type: action_map[key],
          payload: current_collection.filters[key],
        });
      }
    }
  }, [current_collection]);

  /* Start Filter Products */

  // Get All Products That Match With The User's Colors Choice
  const get_products_matching_color = () => {
    if (filter_options.colors.length == 0)
      return all_products.map((pro) => pro.id);

    return all_products
      .filter((pro) =>
        pro.colors.some((color) => filter_options.colors.includes(color.id)),
      )
      .map((pro) => pro.id);
  };

  // Get All Products That Match With The User's Size Choice
  const get_products_matching_sizes = () => {
    let the_data = [];
    if (filter_options.size.length == 0)
      return all_products.map((pro) => pro.id);

    the_data = all_products.filter((prodcut) => {
      return prodcut.size.some((pro_size) =>
        filter_options.size.includes(pro_size),
      );
    });

    return the_data.map((data) => data.id);
  };

  // Get All Products That Match With The User's Brands Choice
  const get_products_matching_brands = () => {
    if (filter_options.brands.length == 0)
      return all_products.map((pro) => pro.id);

    return all_products
      .filter((product) => {
        return filter_options.brands.some((brand) => {
          return brand.toLowerCase() == product.brand.toLowerCase();
        });
      })
      .map((pro) => pro.id);
  };

  // Get All Products That Match With The User's Price Range
  const get_products_in_price_range = () => {
    if (filter_options.price.min > filter_options.price.max) return [];

    return all_products
      .filter(
        (pro) =>
          pro.price <= filter_options.price.max &&
          pro.price >= filter_options.price.min,
      )
      .map((pro) => pro.id);
  };

  // Get All Products That Match With The User's Price Range
  const get_products_matching_stock = () => {
    if (filter_options.availability.length == 0)
      return all_products.map((pro) => pro.id);

    return all_products
      .filter((product) => {
        return filter_options.availability.includes(product.stock);
      })
      .map((pro) => pro.id);
  };

  const get_filter_products = () => {
    const group1 = [...get_products_matching_color()];
    const group2 = [...get_products_matching_sizes()];
    const group3 = [...get_products_matching_brands()];
    const group4 = [...get_products_in_price_range()];
    const group5 = [...get_products_matching_stock()];

    let final_data = [];
    if (current_collection.slug == "dresses") {
      final_data = group4.filter(
        (pro) =>
          group1.includes(pro) &&
          group2.includes(pro) &&
          group3.includes(pro) &&
          group5.includes(pro),
      );
    } else {
      final_data = group4.filter((pro) => group3.includes(pro));
    }

    return final_data;
  };

  /* Start Sort Products */
  const [sort_option, set_sort_option] = useState("Price, low to high");

  const sort_products = (arr) => {
    let data = [...arr];

    if (sort_option === "Alphabetically, A-Z") {
      data.sort((a, b) => a.title.localeCompare(b.title, "ar"));
    } else if (sort_option === "Alphabetically, Z-A") {
      data.sort((a, b) => b.title.localeCompare(a.title, "ar"));
    } else if (sort_option === "Best Selling") {
      data.sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0));
    } else if (sort_option === "Price, low to high") {
      data.sort((a, b) => a.price - b.price);
    } else if (sort_option === "Price, high to low") {
      data.sort((a, b) => b.price - a.price);
    } else if (sort_option === "Date, new to old") {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort_option === "Date, old to new") {
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return data;
  };
  useEffect(() => {
    if (all_products.length == 0) return;
    const filter_ids = get_filter_products();
    const filter_data = all_products.filter((pro) =>
      filter_ids.includes(pro.id),
    );
    set_filter_products(sort_products(filter_data));
  }, [filter_options, all_products]);

  useEffect(() => {
    if (all_products.length <= 0) return;
    set_filter_products(sort_products(filter_products));
  }, [sort_option]);

  // Context value object to be consumed by components
  const value = {
    filter_options,
    dispatch_filter,
    colors_id,
    available_brands,
    available_size,
    update_filter_options,
    current_collection,
    set_current_collection,
    stock_nums,
    filter_products,
    set_sort_option,
  };

  return (
    <categories_context.Provider value={value}>
      {children}
    </categories_context.Provider>
  );
};

// Custom hook for easy access to the categories context
export const use_categories_context = () => {
  return useContext(categories_context);
};

export default Categories_provider;
