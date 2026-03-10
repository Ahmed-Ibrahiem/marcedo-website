import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

const Dress_context = createContext();

const DressProvider = ({ children }) => {
  const initialize_value = {
    brand: "All",
    type: "A-Line",
    material: "Cotton",
    occasion: "Casual",
    price_range: 50,
  };

  const filter_reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_FILTER":
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  };

  const [filter_options, dispatch_filter_options] = useReducer(
    filter_reducer,
    initialize_value,
  );

  const [all_dresses_data, set_all_dresses_data] = useState([]);
  const [filter_dresses_data, set_filter_dresses_data] = useState([]);
  const [data_will_dispaly, set_data_will_dispaly] = useState([]);
  const [current_package_num, set_current_package_num] = useState(1);
  const [number_of_packages, set_number_of_packages] = useState(1);
  const max_price = useRef(10000);
  const [price_range, set_price_range] = useState(0);

  useEffect(() => {
    const the_current_price = Math.ceil(
      max_price.current * (filter_options.price_range / 100),
    );
    set_price_range(the_current_price);
  }, [filter_options.price_range]);

  useEffect(() => {
    try {
      const get_data = async () => {
        const req = await fetch("/dress pro.json");
        if (req.status === 200) {
          const res = await req.json();
          set_all_dresses_data(res);
        }
      };
      get_data();
    } catch (err) {}
  }, []);

  const filter_data_proccess = (arr = []) => {
    if (!arr) return;

    const valid_data = [];

    arr.forEach((data) => {
      if (
        data.occasion == filter_options.occasion &&
        data.type == filter_options.type &&
        data.material == filter_options.material &&
        data.price <= price_range
      ) {
        valid_data.push(data);
      }
    });

    // Verfiy whather the brand and the price of product is what you want or not
    if (filter_options.brand == "All") {
      return valid_data;
    } else {
      return valid_data.filter((data) => data.brand == filter_options.brand);
    }
  };

  useEffect(() => {
    const data = filter_data_proccess(all_dresses_data);
    set_filter_dresses_data(data);
  }, [all_dresses_data, filter_options, price_range]);

  useEffect(() => {
    const the_number = Math.ceil(filter_dresses_data.length / 6);
    set_number_of_packages(the_number);
    set_current_package_num(1);
  }, [filter_dresses_data]);

  const select_current_package = () => {
    const all_data = [...filter_dresses_data];
    const end = current_package_num * 6;
    const start = end - 6;

    const the_data = all_data.slice(start, end);
    set_data_will_dispaly(the_data);
  };

  useEffect(() => {
    select_current_package();
  }, [current_package_num, filter_dresses_data]);

  const value = {
    filter_options,
    dispatch_filter_options,
    data_will_dispaly,
    current_package_num,
    number_of_packages,
    set_current_package_num,
    price_range,
    max_price,
  };

  return (
    <Dress_context.Provider value={value}>{children}</Dress_context.Provider>
  );
};

export const use_dress_context = () => {
  return useContext(Dress_context);
};

export default DressProvider;
