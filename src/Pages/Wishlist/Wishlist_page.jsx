import style from "./Wishlist.module.css";
import { useFavoriteContext } from "../../Context/favoriteMenuContext";
import ProductItem from "../../Components/Product item/ProductItem";
import { useLayoutEffect } from "react";
import Our_banner from "../../Components/Our Banner/Our_banner";

const Wishlist_page = () => {
  const { favoriteItems } = useFavoriteContext();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="wishlist">
      <div className="container">
        <Our_banner page_data={{ title: "Wishlist" }} />

        <div className={style.products_container}>
          <div className={style.products_grid}>
            {favoriteItems.map((pro) => {
              return (
                <div key={pro.id}>
                  <ProductItem product_data={pro} />
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
