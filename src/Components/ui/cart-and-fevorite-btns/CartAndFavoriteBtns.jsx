import { Link } from "react-router-dom";
import { useCartContext } from "../../../Context/CartMenuContext";
import { useFavoriteContext } from "../../../Context/favoriteMenuContext";
import styles from "./CartAndFavoriteBtns.module.css";

const CartAndFavoriteBtns = () => {
  const { isHasProducts, setIsOpenCart, cartItemsData } = useCartContext();
  const { isHasFevoritesProducts, favoriteItems } = useFavoriteContext();
  return (
    <>
      <Link
        to={"/wishlist"}
        className={`${styles.fevoraite_icon_btn} ${
          isHasFevoritesProducts ? styles.has_products : ""
        }`}
      >
        <p>{favoriteItems.length}</p>
        <i className="fa-solid fa-heart"></i>
      </Link>
      <button
        onClick={() => {
          // Open the cartItems menu
          setIsOpenCart((prev) => (prev ? false : true));
        }}
        className={`${styles.cart_icon_btn} ${
          isHasProducts ? styles.has_products : ""
        }`}
      >
        <p>{cartItemsData.length}</p>
        <i className="fa-solid fa-bag-shopping"></i>
      </button>
    </>
  );
};

export default CartAndFavoriteBtns;
