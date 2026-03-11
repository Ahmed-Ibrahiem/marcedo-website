import CountriesAndLanguagesProvider from "../../Context/CountriesAndLaguagesContext";
import HeaderBottomProvider from "../../Context/HeaderBottomContext";
import HeaderBottom from "../header-bottom/HeaderBottom";
import HeaderMiddle from "../header-middle/HeaderMiddle";
import HeaderTop from "../header-top/HeaderTop";

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
