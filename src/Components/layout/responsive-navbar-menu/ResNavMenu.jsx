import Auth_menu_btn from "../../ui/auth-menu-btn/Auth_menu_btn";
import CartAndFavoriteBtns from "../../ui/cart-and-fevorite-btns/CartAndFavoriteBtns";
import NavbarMenu from "../navbar-menu/NavbarMenu";
import styles from "./ResNavMenu.module.css";

const ResNavMenu = ({ isresNavMenuActive }) => {
  return (
    <div
      className={`${styles.res_nav_menu} ${
        isresNavMenuActive ? styles.show : ""
      }`}
    >
      <div className={styles.nav_header}>
        <div className={styles.product_manage_btns}>
          <CartAndFavoriteBtns />
        </div>
        <Auth_menu_btn />
      </div>
      <div className={styles.nav_body}>
        <NavbarMenu active_class={styles.active} />
      </div>
    </div>
  );
};

export default ResNavMenu;
