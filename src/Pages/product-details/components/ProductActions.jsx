import React from "react";
import { FaHeart } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useProductDetailsContext } from "../../../Context/ProductDetailsProvider";
import { useFavoriteContext } from "../../../Context/favoriteMenuContext";
import { Link } from "react-router-dom";
import { useCartContext } from "../../../Context/CartMenuContext";

const ProductActions = ({ productData }) => {
  const {
    selectedOptions,
    setSelectedOptions,
    addProductToCart,
    selectedCount,
    setSelectedCount,
  } = useProductDetailsContext();

  const { handleFavoriteItems, favoriteItems } = useFavoriteContext();
  const { setIsOpenCart } = useCartContext();
  return (
    <div className="actions-btn flex flex-col w-full gap-2.5 text-sm!">
      <div className="flex flex-col sm:grid grid-cols-12 gap-2.5">
        <div className="flex-between p-3.5 gap-2.5 col-span-3 sm:col-span-2 text-gray lg:col-span-3 2xl:col-span-2 border border-border rounded-sm">
          <button
            className="hover:text-orange"
            onClick={() => setSelectedCount((prev) => prev + 1)}
          >
            <FiPlus />
          </button>
          <span className="text-black">{selectedCount}</span>
          <button
            className="hover:text-orange"
            onClick={() => {
              if (count >= 2) setSelectedCount((prev) => prev - 1);
            }}
          >
            <FiMinus />
          </button>
        </div>
        {/* add to cart btn */}
        <button
          onClick={() => addProductToCart()}
          className="add-to-cart p-3.5 grid-area col-span-7 sm:col-span-9 lg:col-span-7 2xl:col-span-9 bg-gray-200! rounded-sm hover:text-white hover:bg-black!"
        >
          <span className="uppercase font-bold text-xs!">add to bag</span>
        </button>
        {/* wislist btn */}
        <button
          onClick={() => handleFavoriteItems(productData)}
          className={`${wislistBtnStyle} ${favoriteItems.find((pro) => pro.id === productData.id) ? "text-white! bg-black! " : "bg-gray-200!"}`}
        >
          <FaHeart className="text-lg!" />
        </button>
      </div>
      {/* Buy btn */}
      <Link
        to={"/checkout"}
        onClick={() => setIsOpenCart(false)}
        className="p-4 shadow-[0_0_5px_var(--color-gray-300)] hover:text-white! hover:bg-black! flex-center rounded-sm"
      >
        <span className="uppercase text-xs! font-bold text-center">
          buy it now
        </span>
      </Link>
    </div>
  );
};

const wislistBtnStyle = `
add-to-wishlist p-3.5 place-items-center col-span-2 sm:col-span-1 lg:col-span-2 2xl:col-span-1 
hover:text-white hover:bg-black!  rounded-sm
`;

export default ProductActions;
