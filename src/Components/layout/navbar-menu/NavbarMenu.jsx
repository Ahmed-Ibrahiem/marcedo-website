import { Link, useLoaderData, useLocation } from "react-router-dom";
import React, { useState, memo } from "react";

const nav_bar_data = [
  {
    title: "Home",
    url: ["/home" , "/product_detials"],
  },
  {
    title: "Shop",
    url: ["/shop", "/categories"],
  },
  {
    title: "Contact",
    url: ["/contact-us"],
  },
  {
    title: "About",
    url: ["/about-us"],
  },
];

const NavbarMenu = () => {
  const location = useLocation();

  const isActive = (paths) =>
    paths.some((path) => location.pathname.startsWith(path));

  return (
    <ul className="flex-start gap-5 hidden! lg:flex!">
      {nav_bar_data.map((data, index) => {
        return (
          <Link
            to={data.url[0]}
            key={index}
            className={isActive(data.url) ? "text-orange! font-bold" : ""}
          >
            {data.title}
          </Link>
        );
      })}
    </ul>
  );
};

export default React.memo(NavbarMenu);
