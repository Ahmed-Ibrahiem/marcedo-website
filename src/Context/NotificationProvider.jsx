import React, { createContext, useContext, useEffect, useState } from "react";

// Create notification context
const Notification_context = createContext();

// Provider component to manage notifications globally
const Notification_provider = ({ children }) => {
  // Flag to indicate if there is any active message
  const [there_is_message, set_there_is_message] = useState(false);

  // Array to store all notifications/messages
  const [all_message, set_all_message] = useState([]);

  // Function to add a new message to the list
  const add_message = (message) => {
    set_all_message((prev) => [...prev, message]);
  };

  // Effect runs whenever messages change
  useEffect(() => {
    // If no messages exist, do nothing
    if (all_message.length <= 0) return;

    // Set flag to indicate that a message is present
    set_there_is_message(true);

    // Automatically clear messages after 5 seconds
    const timer = setTimeout(() => {
      set_all_message([]);
      set_there_is_message(false);
    }, 5000);

    // Cleanup timeout on re-render or unmount
    return () => clearTimeout(timer);
  }, [all_message]);

  // Values exposed to consuming components
  const value = {
    there_is_message, // boolean flag for UI
    add_message, // function to add messages
    all_message, // list of messages
  };

  return (
    <Notification_context.Provider value={value}>
      {children}
    </Notification_context.Provider>
  );
};

// Custom hook to use notification context بسهولة
export const use_notification_context = () => {
  return useContext(Notification_context);
};

export default Notification_provider;
