import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { formate_date } from "../../services/formatsDate";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { useFavoriteContext } from "../../Context/favoriteMenuContext";
import { useCartContext } from "../../Context/CartMenuContext";
import { useQuickViewPopupContext } from "../../Context/QuickViewPopupsProvider";

const FavoriteItem = ({ productData }) => {
  const { setIsQuickViewOpen, setProductData } = useQuickViewPopupContext();
  const { handleFavoriteItems } = useFavoriteContext();
  return (
    <div className={`${itemStyle}`}>
      {/* Item Right */}
      <div className="flex flex-col w-full xs:w-auto xs:flex-row  xs:items-center gap-5 relative ">
        {/* Trash Item */}
        <button
          onClick={() => handleFavoriteItems(productData)}
          className="p-2 w-fit absolute top-5 xs:top-0 left-5 xs:left-0 xs:relative rounded-full bg-gray-light text-gray flex-center hover:text-red-500!"
        >
          <IoTrashOutline size={20} />
        </button>
        {/* Item Image */}
        <div className="img-box flex-center h-50 xs:h-25 w-full xs:w-22.5 rounded-sm bg-gray-light/60">
          <img
            loading="lazy"
            src={productData.thumbnail}
            className="max-w-[80%] max-h-[80%]"
            alt=""
          />
        </div>
        {/* Item Info */}
        <div className="flex-start-col gap-2.5 text-sm">
          {/* Item name */}
          <Link
            to={`/product_detials/${productData.slug}`}
            className=" font-semibold hover:text-orange!"
          >
            {productData.name}
          </Link>
          {/* Item price */}
          <p className="font-semibold">${productData.current_price}</p>
          {/* Item Date */}
          <p className="text-gray flex-start gap-1.5">
            {" "}
            <MdOutlineCalendarMonth /> {formate_date(productData.created_at)}
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          setIsQuickViewOpen(true);
          setProductData(productData);
        }}
        className="px-7.5 py-3.5 font-semibold text-sm rounded-sm bg-orange-lite hover:bg-orange! hover:text-white"
      >
        Quick View
      </button>
    </div>
  );
};

const itemStyle = `
p-5 py-7.5 rounded-sm border border-border w-full duration-500! hover:shadow-[2px_5px_10px_var(--color-gray-light)]
flex-between gap-5 flex-wrap
`;

export default FavoriteItem;
