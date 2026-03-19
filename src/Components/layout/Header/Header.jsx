import { useEffect, useRef } from "react";
import CountriesAndLanguagesProvider from "../../../Context/CountriesAndLaguagesContext";
import HeaderBottomProvider from "../../../Context/HeaderBottomContext";
import HeaderBottom from "../header-bottom/HeaderBottom";
import HeaderMiddle from "../header-middle/HeaderMiddle";
import HeaderTop from "../header-top/HeaderTop";
import "./Header.css";

const Header = () => {
  const headerRef = useRef(null);
  useEffect(() => {
    if (!headerRef.current) return;
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        headerRef.current.classList.add("stickyHeader");
      } else {
        headerRef.current.classList.remove("stickyHeader");
      }
    });
  }, []);

  return (
    <>
      <div id="supporter"></div>
      <header ref={headerRef}>
        <HeaderTop />
        {/* cover the HeaderMiddel By CountriesAndLanguagesProvider context  */}
        {/* <CountriesAndLanguagesProvider>
        <HeaderMiddle />
      </CountriesAndLanguagesProvider> */}
        {/* cover the HeaderBottom By HeaderBottomProvider context  */}
        <HeaderBottomProvider>
          <HeaderBottom />
        </HeaderBottomProvider>
      </header>
    </>
  );
};

export default Header;
