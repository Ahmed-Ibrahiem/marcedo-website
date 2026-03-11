import React, { createContext, useContext, useEffect, useState } from "react";

const Notification_context = createContext();
const Notification_provider = ({ children }) => {
  const [there_is_message, set_there_is_message] = useState(false);
  const [all_message, set_all_message] = useState([]);

  const add_message = (message) => {
    set_all_message((prev) => [...prev, message]);
  };

  useEffect(() => {
    if (all_message.length <= 0) return;

    set_there_is_message(true);
    const timer = setTimeout(() => {
      set_all_message([]);
      set_there_is_message(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [all_message]);

  const value = { there_is_message, add_message, all_message };

  return (
    <Notification_context.Provider value={value}>
      {children}
    </Notification_context.Provider>
  );
};

export const use_notification_context = () => {
  return useContext(Notification_context);
};

export default Notification_provider;
