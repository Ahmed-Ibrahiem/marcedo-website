import React, { createContext, useContext, useState } from "react";

// Create a context for managing products grid state
const products_grid_contenxt = createContext();

// Provider component that wraps the application to provide products grid context
const Products_grid_provider = ({ children }) => {
  // State for controlling sidebar visibility
  const [is_sidebar_open, set_is_sidebar_open] = useState(false);

  // State for tracking the current sort option selected by user
  const [current_sort_type, set_current_sort_type] = useState("Best Selling");

  // State for tracking how many columns to display in the grid
  const [current_display, set_current_display] = useState(2);

  // State for controlling the visibility of the quick view modal/popup
  const [is_quick_view_open, set_is_quick_view_open] = useState(false);

  // State for storing the product data to be displayed in quick view
  const [quick_view_data, set_quick_view_data] = useState("");

  // Function to update quick view data and open the quick view popup
  const update_quick_view_data = (data) => {
    set_quick_view_data(data);
    set_is_quick_view_open(true);
  };

  // Function to close the quick view popup
  const close_quick_view_popup = () => {
    set_is_quick_view_open(false);
  };

  // Object containing all state and functions to be shared across components
  const value = {
    is_sidebar_open,
    set_is_sidebar_open,
    current_sort_type,
    set_current_sort_type,
    current_display,
    set_current_display,
    is_quick_view_open,
    set_is_quick_view_open,
    close_quick_view_popup,
    update_quick_view_data,
    quick_view_data,
  };

  // Provide the context value to all child components
  return (
    <products_grid_contenxt.Provider value={value}>
      {children}
    </products_grid_contenxt.Provider>
  );
};

// Custom hook to access the products grid context from any component
export const use_products_grid_context = () => {
  return useContext(products_grid_contenxt);
};

export default Products_grid_provider;
