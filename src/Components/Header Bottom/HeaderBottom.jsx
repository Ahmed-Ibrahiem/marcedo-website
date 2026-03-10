import { assets } from "../../assets/assets";
import "./HeaderBottom.css";
import { useHeaderBottomContext } from "../../Context/HeaderBottomContext";
import ResNavMenu from "../Responsive Navbar Menu/ResNavMenu";
import { useState } from "react";
import CartAndFavoriteBtns from "../Cart and fevorite btns/CartAndFavoriteBtns";
import NavbarMenu from "../Navbar Menu/NavbarMenu";
import { useSearchContext } from "../../Context/SearchContext";
import Categoties_menu from "../Header Menues/Categoties_menu";
import Logo from "../Logo/Logo";
import Auth_menu_btn from "../Auth menu btn/Auth_menu_btn";

const HeaderBottom = () => {
  const {
    setMenu,
    current_category,
    search_content,
    categories_menu,
    setCategories_menu,
  } = useHeaderBottomContext();

  const { setIsSearchOverlayOpen } = useSearchContext();

  const [isresNavMenuActive, setIsresNavMenuActive] = useState(false);

  return (
    <div className="header_bottom">
      <div className="container">
        <Logo />
        <NavbarMenu menu_style={"nav_menu"} active_class={"active"} />
        <div className="search_part">
          <Categoties_menu
            current_category={current_category}
            categories_menu={categories_menu}
            setCategories_menu={setCategories_menu}
            assets={assets}
          />
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
        <button
          onClick={() => {
            // Open and close responsive nav menu
            isresNavMenuActive
              ? setIsresNavMenuActive(false)
              : setIsresNavMenuActive(true);
          }}
          className="nav_menu_icon_btn"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <ResNavMenu isresNavMenuActive={isresNavMenuActive} />
      </div>
    </div>
  );
};

export default HeaderBottom;
