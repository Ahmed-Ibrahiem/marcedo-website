import styles from "./ProductItem.module.css";
import { useFavoriteContext } from "../../Context/favoriteMenuContext";
import { useCartContext } from "../../Context/CartMenuContext";
import CreateStarsOfRating from "../create-stars-of-rating/CreateStarsOfRating";
import { Link } from "react-router-dom";

const ProductItem = ({ product_data }) => {
  const { favoriteItemsId, handleFavoriteItems } = useFavoriteContext();
  const { cartItemsId, handleCatItemsPrograss, isClickable } = useCartContext();

  return (
    <div className={`product ${styles.product}`} data-id={product_data.id}>
      <div className={`shap ${styles.shap} `}>
        <div className={styles.product_header}>
          <div className={styles.installment}>
            <span>{product_data.installment} % Installment</span>
          </div>
          <button
            onClick={() => {
              handleFavoriteItems(product_data);
             
            }} // add to favorite menu
            className={` favorite_btn ${styles.favorite} ${
              // set the state of favorite btn depend on the favoriteItems content
              favoriteItemsId.includes(product_data.id) ? styles.active : ""
            }`}
          >
            <i className="fa-regular fa-heart"></i>
          </button>
        </div>
        <div className={` product_image ${styles.product_image}`}>
          <div className={styles.img_box}>
            <img
              alt={`The Image Of Product ${product_data.id}`}
              loading="lazy"
              src={product_data.image}
            />
          </div>
          <Link
            to={`/product_detials/${product_data.id}`}
            className={styles.view_details}
          >
            <button>
              <i className="fa-solid fa-eye"></i>
            </button>
          </Link>
        </div>
        <div className={styles.product_details}>
          <div className={styles.offers}>
            <span>{product_data.offers}% OFF</span>
          </div>
          <div className={styles.product_title}>
            <p>{product_data.title}</p>
          </div>
          <div className={styles.stars_box}>
            <CreateStarsOfRating rating_value={product_data.rating_value} />
            <span>({product_data.rating_value})</span>
          </div>
          <div className={styles.price}>
            <div className={styles.current_price}>
              <span className={styles.currencey}>EGP</span>
              <span className={styles.sall}>{product_data.price}</span>
            </div>
            <p className={styles.old_price}>
              Was: <span>EGP {product_data.old_price}</span>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.support}></div>
      <button
        disabled={isClickable}
        onClick={() => {
          handleCatItemsPrograss(product_data); // // add and remove from cartItems menu
        }}
        className={`${styles.add_to_cart} ${
          // After adding product to cartItems , change the style of cart button
          cartItemsId.includes(product_data.id) ? styles.added_to_cart : ""
        }`}
      >
        {cartItemsId.includes(product_data.id) ? (
          <i className="fa-solid fa-cart-plus"></i>
        ) : (
          <i className="fa-solid fa-cart-shopping"></i>
        )}
      </button>
    </div>
  );
};

export default ProductItem;
