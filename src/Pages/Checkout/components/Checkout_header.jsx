import style from "../Css/Checkout_header.module.css";
import Logo from "../../../Components/Logo/Logo";
import { useCartContext } from "../../../Context/CartMenuContext";

const Checkout_header = () => {
  const { setIsOpenCart } = useCartContext();
  return (
    <header className={style.checkbox_header}>
      <div className="container">
        <Logo />
        <button
          onClick={() => setIsOpenCart((prev) => !prev)}
          className={style.cart_btn}
        >
          <i className="fa-regular fa-bag-shopping"></i>
        </button>
      </div>
    </header>
  );
};

export default Checkout_header;
