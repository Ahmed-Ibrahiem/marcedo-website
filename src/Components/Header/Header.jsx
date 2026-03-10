import CountriesAndLanguagesProvider from "../../Context/CountriesAndLaguagesContext";
import HeaderBottomProvider from "../../Context/HeaderBottomContext";
import HeaderBottom from "../Header Bottom/HeaderBottom";
import HeaderMiddle from "../Header Middle/HeaderMiddle";
import HeaderTop from "../Header Top/HeaderTop";

const Header = () => {
  return (
    <>
      <HeaderTop />
      {/* cover the HeaderMiddel By CountriesAndLanguagesProvider context  */}
      <CountriesAndLanguagesProvider>
        <HeaderMiddle />
      </CountriesAndLanguagesProvider>
      {/* cover the HeaderBottom By HeaderBottomProvider context  */}
      <HeaderBottomProvider>
        <HeaderBottom />
      </HeaderBottomProvider>
    </>
  );
};

export default Header;
