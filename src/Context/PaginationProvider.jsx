import { createContext, useContext, useEffect, useState } from "react";

// Create pagination context
const pagination_context = createContext();

// Pagination Provider component to manage pagination logic globally
const Pagination_provider = ({ children }) => {
  // Store the full dataset that needs pagination
  const [pagination_data, set_pagination_data] = useState([]);

  // Track the current page (package) index
  const [current_package_index, set_current_package_index] = useState(1);

  // Store total number of pages (packages)
  const [number_of_packages, set_number_of_packages] = useState(1);

  // Number of items to display per page
  const [number_of_items_in_package, set_number_of_items_in_package] =
    useState(6);

  // Data that will actually be displayed on the UI (current page)
  const [display_data, set_display_data] = useState([]);

  // Calculate total number of pages whenever data or items per page change
  useEffect(() => {
    // Prevent execution if no data exists
    if (pagination_data.length == 0) return;

    // Calculate total number of pages
    let num_of_pack = Math.ceil(
      pagination_data.length / number_of_items_in_package,
    );

    // Update total pages
    set_number_of_packages(num_of_pack);

    // Reset current page to the first page when data changes
    set_current_package_index(1);
  }, [pagination_data, number_of_items_in_package]);

  // Update the displayed data whenever page or pagination settings change
  useEffect(() => {
    // Calculate end index
    let end = current_package_index * number_of_items_in_package;

    // Calculate start index
    let start = end - number_of_items_in_package;

    // Extract only the data for the current page
    let data = [...pagination_data].slice(start, end);

    // Update displayed data
    set_display_data(data);
  }, [current_package_index, pagination_data, number_of_items_in_package]);

  // Context value that will be shared across components
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

// Custom hook to easily access pagination context
export const use_pagination_context = () => {
  return useContext(pagination_context);
};

export default Pagination_provider;
