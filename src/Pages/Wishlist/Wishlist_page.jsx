import { useFavoriteContext } from "../../Context/favoriteMenuContext";
import { useLayoutEffect } from "react";
import Our_banner from "../../Components/ui/our-banner/Our_banner";
import ProductCard from "../../Components/product/product-item/ProductCard";
import FavoriteItem from "./FavoriteItem";

const Wishlist_page = () => {
  const { favoriteItems } = useFavoriteContext();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="wishlist">
      <div className="container">
        <Our_banner page_data={{ title: "Wishlist" }} />

        <div className="container">
          <div className="w-full">
            {favoriteItems.map((pro) => {
              return (
                <div key={pro.id}>
                  <FavoriteItem />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist_page;
