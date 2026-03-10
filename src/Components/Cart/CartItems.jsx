import { Link } from "react-router-dom";
import { useCartContext } from "../../Context/CartMenuContext";
import ItemOfCart from "../Item Of Cart/ItemOfCart";
import styles from "./CartItems.module.css";

const CartItems = () => {
  const { isOpenCart, cartItemsData, setIsOpenCart, SubtotalItemsPrice } =
    useCartContext();

  const closeCartItems = () => {
    setIsOpenCart((prev) => (prev ? false : true));
  };

  return (
    <div
      onClick={(e) => {
        // close cartItems menu
        if (e.target == e.currentTarget) closeCartItems();
      }}
      className={`${styles.cart_items_contaner} ${
        // If user click on cartItems btn open the cart menu
        isOpenCart ? styles.show_menu : styles.menu_hide
      }`}
    >
      <div className={styles.cart_items}>
        <div className={styles.cart_items_header}>
          <h1>
            Count <span>{cartItemsData.length}</span>
          </h1>
          <button onClick={closeCartItems} className={styles.exit_btn}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className={styles.cart_items_body}>
          <div className={styles.items}>
            {cartItemsData.map((item_data, index) => {
              return (
                <ItemOfCart
                  key={index}
                  item_data={item_data}
                  item_style={styles}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.cart_items_footer}>
          <h3>Subtitle: {SubtotalItemsPrice}$</h3>
          <div>
            <button>View Cart</button>
            <Link
              to={"/checkout"}
              onClick={closeCartItems}
              className={styles.checkout_btn}
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
