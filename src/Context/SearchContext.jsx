import { createContext, useContext, useState } from "react";

const searchContext = createContext();

const SearchProvider = ({ children }) => {
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

  const value = {
    isSearchOverlayOpen,
    setIsSearchOverlayOpen,
  };

  return (
    <searchContext.Provider value={value}>{children}</searchContext.Provider>
  );
};

export const useSearchContext = () => {
  return useContext(searchContext);
};

export default SearchProvider;
