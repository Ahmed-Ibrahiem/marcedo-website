import { useContext, createContext, useState } from "react";
import ARB_flag from "../assets/egypt.png";
const countriesAndLanguagesContext = createContext();

const CountriesAndLanguagesProvider = ({ children }) => {
  const default_language = {
    language_flag: ARB_flag,
    language_name: "ARB",
  };
  const [currentCountry, setCurrentCountry] = useState("EGP");
  const [currentLanguage, setCurrentLanguage] = useState(default_language);

  const handleSetCurrentCountry = (country) => {
    setCurrentCountry(country);
  };

  const handleSetCurrentLanguage = (language_name, language_flag) => {
    setCurrentLanguage({ language_flag, language_name });
  };

  const value = {
    currentCountry,
    currentLanguage,
    handleSetCurrentCountry,
    handleSetCurrentLanguage,
  };
  return (
    <countriesAndLanguagesContext.Provider value={value}>
      {children}
    </countriesAndLanguagesContext.Provider>
  );
};

export default CountriesAndLanguagesProvider;

export const useCountriesAndLanguagesContext = () => {
  return useContext(countriesAndLanguagesContext);
};
