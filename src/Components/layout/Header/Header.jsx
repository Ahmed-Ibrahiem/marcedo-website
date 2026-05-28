import { useEffect, useRef, useState } from "react";
import "./Header.css";
import { assets } from "../../../assets/assets";
import ResNavMenu from "../responsive-navbar-menu/ResNavMenu";
import CartAndFavoriteBtns from "../../ui/cart-and-fevorite-btns/CartAndFavoriteBtns";
import Logo from "../../ui/Logo/Logo";
import Auth_menu_btn from "../../ui/auth-menu-btn/Auth_menu_btn";
import NavbarMenu from "../navbar-menu/NavbarMenu";
import Categoties_menu from "../header-menus/Categoties_menu";
import { motion } from "framer-motion";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";

const Header = ({ setIsSearchOverlayOpen, isSticky }) => {
  // Controls whether the responsive (mobile) nav menu is open
  const [isResNavActive, setIsResNavActive] = useState(false);
  const [search_content, setSearch_content] = useState("");
  const [menu, setMenu] = useState("Home");

  return (
    <>
      <header className={isSticky ? "stickyHeader" : ""}>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, ease: "easeOut" }}
          className="header_bottom"
        >
          <div className="container">
            {/* Site logo */}
            <Logo />

            {/* Desktop navigation menu */}
            <NavbarMenu menu={menu} setMenu={setMenu} />

            {/* Search bar with category filter */}
            <div className="search_part">
              <Categoties_menu />
              {/* Clicking the input opens the search overlay instead of typing directly */}
              <input
                onClick={() => setIsSearchOverlayOpen((prev) => !prev)}
                type="text"
                placeholder="Search Anything"
                value={search_content}
                readOnly
              />
              <button
                className="search_btn flex-center"
                onClick={() => setIsSearchOverlayOpen((prev) => !prev)}
              >
                <FaMagnifyingGlass />
              </button>
            </div>

            {/* Right side — delivery location, auth button, cart and wishlist */}
            <div className="right_part">
              <div className="deliver">
                <i className="fa-solid fa-location-dot"></i>
                <p>
                  Deliver to <span>Egypt</span>
                </p>
              </div>
              <Auth_menu_btn />
              <CartAndFavoriteBtns />
            </div>

            {/* Hamburger button — toggles the responsive nav menu on mobile */}
            <button
              onClick={() => setIsResNavActive((prev) => !prev)}
              className="nav_menu_icon_btn"
            >
              {isResNavActive ? <FaXmark /> : <FaBars />}
            </button>

            {/* Responsive nav menu for mobile screens */}
            <ResNavMenu
              menu={menu}
              setMenu={setMenu}
              isresNavMenuActive={isResNavActive}
            />
          </div>
        </motion.div>
      </header>
    </>
  );
};

export default Header;
