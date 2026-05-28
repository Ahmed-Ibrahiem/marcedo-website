import { Link } from "react-router-dom";
import React, { useState , memo } from "react";

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

const NavbarMenu = ({ active_class, menu, setMenu }) => {
  return (
    <ul className="flex-start gap-5 hidden! lg:flex!">
      {nav_bar_data.map((data, index) => {
        return (
          <Link
            to={data.url}
            key={index}
            className={menu == data.title ? "text-orange! font-bold" : ""}
            onClick={() => setMenu(data.title)}
          >
            {data.title}
          </Link>
        );
      })}
    </ul>
  );
};

export default React.memo(NavbarMenu);
