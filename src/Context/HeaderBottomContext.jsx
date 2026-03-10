import { createContext, useContext, useEffect, useState } from "react";

const HeaderBottomContext = createContext();
const HeaderBottomProvider = ({ children }) => {
  const [menu, setMenu] = useState("Home");
  const [current_category, setCurrent_category] = useState("All Categories");
  const [search_content, setSearch_content] = useState("");
  const [categories_menu, setCategories_menu] = useState(false);
  const nav_bar_data = [
    {
      title: "Home",
      url: "/home",
    },
    {
      title: "Shop",
      url: "/shop",
    },
    {
      title: "Contact",
      url: "/contact-us",
    },
    {
      title: "About",
      url: "/about-us",
    },
  ];

  const value = {
    menu,
    setMenu,
    current_category,
    setCurrent_category,
    search_content,
    setSearch_content,
    categories_menu,
    setCategories_menu,
    nav_bar_data,
  };

  return (
    <HeaderBottomContext.Provider value={value}>
      {children}
    </HeaderBottomContext.Provider>
  );
};

export const useHeaderBottomContext = () => {
  return useContext(HeaderBottomContext);
};

export default HeaderBottomProvider;
