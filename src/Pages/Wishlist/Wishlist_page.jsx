import { useFavoriteContext } from "../../Context/favoriteMenuContext";
import { useLayoutEffect } from "react";
import Our_banner from "../../Components/ui/our-banner/Our_banner";
import ProductCard from "../../Components/product/product-item/ProductCard";
import FavoriteItem from "./FavoriteItem";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Wishlist_page = () => {
  const { favoriteItems } = useFavoriteContext();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="wishlist">
      <div className="container">
        <Our_banner page_data={{ title: "Wishlist" }} />

        {favoriteItems.length > 0 && (
          <div className="w-full">
            <div className="w-full py-20 flex-start-col gap-5">
              {favoriteItems.map((item) => {
                return <FavoriteItem key={item.id} productData={item} />;
              })}
            </div>
          </div>
        )}
        {favoriteItems.length <= 0 && (
          <div className="py-20 flex-center-col gap-5">
            <div className="w-30 h-30 text-5xl bg-orange-lite text-orange/60 rounded-full flex-center">
              <FaRegHeart />
            </div>
            <h1 className="text-2xl font-semibold">Your Wishlist Is Empty</h1>
            <p className="text-sm text-gray">
              Looks like you haven't added anything in your wishlist yet.
            </p>
            <Link
              to={"/shop"}
              className="px-7.5 py-3.5 rounded-sm bg-orange-lite font-semibold hover:bg-orange! hover:text-white! "
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist_page;
