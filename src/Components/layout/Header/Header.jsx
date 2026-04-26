import { useEffect, useRef, useState } from "react";
import CountriesAndLanguagesProvider from "../../../Context/CountriesAndLaguagesContext";
import HeaderBottomProvider from "../../../Context/HeaderBottomContext";
import HeaderBottom from "../header-bottom/HeaderBottom";
import HeaderMiddle from "../header-middle/HeaderMiddle";
import HeaderTop from "../header-top/HeaderTop";
import "./Header.css";

const Header = ({ setIsSearchOverlayOpen, isSticky }) => {
  return (
    <>
      <header className={isSticky ? "stickyHeader" : ""}>
        <HeaderTop />
        {/* cover the HeaderMiddel By CountriesAndLanguagesProvider context  */}
        {/* <CountriesAndLanguagesProvider>
        <HeaderMiddle />
      </CountriesAndLanguagesProvider> */}
        {/* cover the HeaderBottom By HeaderBottomProvider context  */}
        <HeaderBottomProvider>
          <HeaderBottom setIsSearchOverlayOpen={setIsSearchOverlayOpen} />
        </HeaderBottomProvider>
      </header>
    </>
  );
};

export default Header;
