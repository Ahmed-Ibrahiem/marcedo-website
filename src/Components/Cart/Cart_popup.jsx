import { Link } from "react-router-dom";
import { useCartContext } from "../../Context/CartMenuContext";
import ItemOfCart from "./item-of-cart/ItemOfCart";
import styles from "./Cart_popup.module.css";
import { FaXmark } from "react-icons/fa6";

const Cart_popup = () => {
  const { isOpenCart, cartItemsData, setIsOpenCart, SubtotalItemsPrice } =
    useCartContext();

  const closeCartItems = () => {
    setIsOpenCart((prev) => (prev ? false : true));
  };

  return (
    <div
      key={"cart-overlay"}
      onClick={(e) => {
        if (e.target == e.currentTarget) closeCartItems();
      }}
      className={`fixed not-last: hidden w-full h-full top-0 left-0 bg-black/60 z-30 justify-end cursor-crosshair overflow-hidden
        ${isOpenCart ? "show_cart_animate flex!" : "hide_cart_animate "}`}
    >
      <div className="w-100 bg-white flex-start-col gap-5 p-5 cursor-auto">
        {/* Start Cart Header */}
        <div className="flex-between gap-5 pb-5 border-b border-border w-full">
          <h1 className="text-xl text-orange font-semibold">
            Count <span>{Object.keys(cartItemsData).length}</span>
          </h1>
          <button
            onClick={closeCartItems}
            className="flex-center border-2 border-border p-1 text-xl text-gray hover:text-black-lite hover:border-black-lite"
          >
            <FaXmark />
          </button>
        </div>

        {/* Start Cart Body */}
        <div className="pb-5 border-b border-border grow w-full">
          <div className="w-full flex flex-col gap-5 max-h-116.5 overflow-y-auto">
            {Object.values(cartItemsData).map((item_data, index) => {
              return <ItemOfCart key={index} item_data={item_data} />;
            })}
          </div>
        </div>

        {/* Start Cart Footer  */}
        <div className="flex-start-col gap-3.5 w-full">
          <h3 className="text-lg font-semibold text-black-lite">
            Subtitle: {SubtotalItemsPrice}$
          </h3>
          <div className="flex-start gap-5 ">
            <button className="py-2 px-5 bg-transparent hover:bg-orange! hover:text-white! font-semibold text-orange rounded-sm border-orange border-2">
              View Cart
            </button>
            <Link
              to={"/checkout"}
              onClick={closeCartItems}
              className="bg-orange py-2 px-5 text-white! hover:bg-transparent hover:text-orange! rounded-sm font-semibold border-orange border-2"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart_popup;
