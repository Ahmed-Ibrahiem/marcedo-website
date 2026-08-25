import React from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCube } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

const AdminSidebar = ({ currentPage }) => {
  const { product_id } = useParams();
  const navInfo = [
    {
      title: "dashboard",
      url: ["/admin"],
      icon: <IoMdHome className="text-xl" />,
    },
    {
      title: "products",
      url: [
        "/admin/products",
        `/admin/products/add_new_product${product_id ? `/${product_id}` : ""}`.trim(),
      ],
      icon: <HiOutlineCube className="text-xl" />,
    },
    {
      title: "orders",
      url: ["/admin/orders"],
      icon: <MdOutlineShoppingCart className="text-xl" />,
    },
    // {
    //   title: "customers",
    //   url: ["/admin/customers"],
    //   icon: <FaRegUser className="text-xl" />,
    // },
  ];
  return (
    <aside
      className={`bg-white h-fit lg:h-full  px-5! py-2.5! flex-between xl:flex-col xl:justify-start! sm:gap-2.5 overflow-hidden  `}
    >
      {navInfo.map((btn, index) => {
        return (
          <NavLink
            key={index}
            to={btn.url[0]}
            className={`flex-start gap-2.5 py-1.5! px-2.5! rounded-[5px] hover:bg-orange-lite lg:w-full
               ${btn.url.includes(currentPage) ? "bg-orange hover:bg-orange! text-white!" : ""}`}
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
