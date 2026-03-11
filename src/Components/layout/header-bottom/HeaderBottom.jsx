import { assets } from "../../../assets/assets";
import "./HeaderBottom.css";
import { useHeaderBottomContext } from "../../../Context/HeaderBottomContext";
import ResNavMenu from "../responsive-navbar-menu/ResNavMenu";
import { useState } from "react";
import CartAndFavoriteBtns from "../../ui/cart-and-fevorite-btns/CartAndFavoriteBtns";
import { useSearchContext } from "../../../Context/SearchContext";
import Logo from "../../ui/Logo/Logo";
import Auth_menu_btn from "../../ui/auth-menu-btn/Auth_menu_btn";
import NavbarMenu from "../navbar-menu/NavbarMenu";
import Categoties_menu from "../header-menus/Categoties_menu";

// Bottom section of the header — contains the logo, search bar, nav menu, and action buttons
const HeaderBottom = () => {
  // Get search category state and controls from context
  const {
    current_category,
    search_content,
    categories_menu,
    setCategories_menu,
  } = useHeaderBottomContext();

  // Controls whether the search overlay is open
  const { setIsSearchOverlayOpen } = useSearchContext();

  // Controls whether the responsive (mobile) nav menu is open
  const [isresNavMenuActive, setIsresNavMenuActive] = useState(false);

  return (
    <div className="header_bottom">
      <div className="container">
        {/* Site logo */}
        <Logo />

        {/* Desktop navigation menu */}
        <NavbarMenu menu_style={"nav_menu"} active_class={"active"} />

        {/* Search bar with category filter */}
        <div className="search_part">
          <Categoties_menu
            current_category={current_category}
            categories_menu={categories_menu}
            setCategories_menu={setCategories_menu}
            assets={assets}
          />
          {/* Clicking the input opens the search overlay instead of typing directly */}
          <input
            onClick={() => setIsSearchOverlayOpen((prev) => !prev)}
            type="text"
            placeholder="Search Anything"
            value={search_content}
            readOnly
          />
          <button
            className="search_btn"
            onClick={() => setIsSearchOverlayOpen((prev) => !prev)}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
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
          onClick={() => {
            isresNavMenuActive
              ? setIsresNavMenuActive(false)
              : setIsresNavMenuActive(true);
          }}
          className="nav_menu_icon_btn"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* Responsive nav menu for mobile screens */}
        <ResNavMenu isresNavMenuActive={isresNavMenuActive} />
      </div>
    </div>
  );
};

export default HeaderBottom;
