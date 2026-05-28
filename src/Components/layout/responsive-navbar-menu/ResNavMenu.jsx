import { Link } from "react-router-dom";
import Auth_menu_btn from "../../ui/auth-menu-btn/Auth_menu_btn";
import CartAndFavoriteBtns from "../../ui/cart-and-fevorite-btns/CartAndFavoriteBtns";
import React, { memo } from "react";

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

const ResNavMenu = ({ isresNavMenuActive, menu, setMenu }) => {
  return (
    <div
      className={`absolute top-[calc(100%+5px)] left-0 bg-white w-full flex-start-col gap-5 z-15 h-0 overflow-hidden lg:hidden! ${
        isresNavMenuActive ? "py-5 px-2.5 h-42.5 shadow-sm!" : ""
      }`}
    >
      <div className="w-full flex-between ">
        <div className="flex-start gap-5">
          <CartAndFavoriteBtns />
        </div>
        <Auth_menu_btn />
      </div>
      <ul className="flex-start-col max-h-25 overflow-auto w-full">
        {nav_bar_data.map((m, index) => {
          return (
            <li key={index} onClick={() => setMenu(m.title)} className="w-full">
              <Link
                className={`w-full! p-1 block hover:bg-orange-lite text-sm ${m.title === menu ? "text-orange! font-bold" : ""}`}
                to={m.url}
              >
                {m.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(ResNavMenu);
