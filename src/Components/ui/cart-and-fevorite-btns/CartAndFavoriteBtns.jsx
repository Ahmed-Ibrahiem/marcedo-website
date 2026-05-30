import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../../Context/CartMenuContext";
import { useFavoriteContext } from "../../../Context/favoriteMenuContext";
import { FaCartShopping, FaHeart } from "react-icons/fa6";

const CartAndFavoriteBtns = () => {
  const { setIsOpenCart, cartItemsData } = useCartContext();
  const { favoriteItems } = useFavoriteContext();
  return (
    <>
      <Link
        to={"/wishlist"}
        className={`relative ${
          favoriteItems.length > 0 ? "text-orange!" : "text-gray-300!"
        }`}
      >
        <div
          className={`${countStyle} ${favoriteItems.length > 0 ? "text-black bg-orange-lite" : "text-gray bg-gray-light"}`}
        >
          {favoriteItems.length}
        </div>
        <FaHeart className="text-2xl" />
      </Link>
      <button
        onClick={() => {
          // Open the cartItems menu
          setIsOpenCart((prev) => (prev ? false : true));
        }}
        className={`relative ${
          Object.keys(cartItemsData).length > 0 ? "text-orange!" : "text-gray-300"
        }`}
      >
        <div
          className={`${countStyle} ${Object.keys(cartItemsData).length > 0 ? "text-black bg-orange-lite" : "text-gray bg-gray-light"}`}
        >
          {Object.keys(cartItemsData).length}
        </div>
        <FaCartShopping className="text-2xl "  />
      </button>
    </>
  );
};

const countStyle = `
absolute w-3.5 h-3.5 text-[10px] -top-1.5 -right-1.5 flex-center rounded-full shadow-[0_0_2px_var(--color-gray)]
`;

export default React.memo(CartAndFavoriteBtns);
