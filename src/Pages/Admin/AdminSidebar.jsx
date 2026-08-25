import React from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCube } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

const AdminSidebar = () => {
  const navInfo = [
    {
      title: "dashboard",
      url: "/admin/dashboard",
      icon: <IoMdHome className="text-xl" />,
    },
    {
      title: "products",
      url: "/admin/products",
      icon: <HiOutlineCube className="text-xl" />,
    },
    {
      title: "orders",
      url: "/admin/orders",
      icon: <MdOutlineShoppingCart className="text-xl" />,
    },
    // {
    //   title: "customers",
    //   url: ["/admin/customers"],
    //   icon: <FaRegUser className="text-xl" />,
    // },
  ];

  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside
      className={`bg-white h-fit lg:h-full  px-5! py-2.5! flex-between xl:flex-col xl:justify-start! sm:gap-2.5 overflow-hidden  `}
    >
      {navInfo.map((btn, index) => {
        return (
          <NavLink
            key={index}
            to={btn.url}
            className={`flex-start gap-2.5 py-1.5! px-2.5! rounded-[5px] hover:bg-orange-lite lg:w-full
               ${isActive(btn.url) ? "bg-orange hover:bg-orange! text-white!" : ""}
               ${["/admin", "/admin/"].includes(location.pathname) && index === 0 ? "bg-orange hover:bg-orange! text-white!" : ""}
               `}
          >
            {btn.icon}
            <p className="capitalize hidden lg:block">{btn.title}</p>
          </NavLink>
        );
      })}
    </aside>
  );
};

export default AdminSidebar;
