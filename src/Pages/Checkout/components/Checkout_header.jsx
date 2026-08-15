import style from "../Css/Checkout_header.module.css";
import Logo from "../../../Components/ui/Logo/Logo";
import { useCartContext } from "../../../Context/CartMenuContext";
import { FaBagShopping } from "react-icons/fa6";

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
          <FaBagShopping />
        </button>
      </div>
    </header>
  );
};

export default Checkout_header;
