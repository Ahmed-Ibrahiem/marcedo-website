import { createContext, useContext, useEffect, useState } from "react";

const pagination_context = createContext();

const Pagination_provider = ({ children }) => {
  const [pagination_data, set_pagination_data] = useState([]);
  const [current_package_index, set_current_package_index] = useState(1);
  const [number_of_packages, set_number_of_packages] = useState(1);
  const [number_of_items_in_package, set_number_of_items_in_package] =
    useState(6);
  const [display_data, set_display_data] = useState([]);

  useEffect(() => {
    if (pagination_data.length == 0) return;
    let num_of_pack = Math.ceil(
      pagination_data.length / number_of_items_in_package,
    );
    set_number_of_packages(num_of_pack);
    set_current_package_index(1);
  }, [pagination_data , number_of_items_in_package]);

  useEffect(() => {
    let end = current_package_index * number_of_items_in_package;
    let start = end - number_of_items_in_package;
    let data = [...pagination_data].slice(start, end);
    set_display_data(data);
  }, [current_package_index, pagination_data, number_of_items_in_package]);

  const value = {
    set_pagination_data,
    current_package_index,
    set_current_package_index,
    number_of_packages,
    set_number_of_items_in_package,
    display_data,
  };
  return (
    <pagination_context.Provider value={value}>
      {children}
    </pagination_context.Provider>
  );
};

export const use_pagination_context = () => {
  return useContext(pagination_context);
};

export default Pagination_provider;
