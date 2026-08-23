import "./Checkout.css";
import Checkout_form from "./components/Checkout_form";
import Checkout_header from "./components/Checkout_header";
import Payment_type from "./components/Payment_type";
import Pay_now_btn from "./components/Pay_now_btn";
import User_items_view from "./components/User_items_view";
import { use_checkout_context } from "../../Context/CheckoutProvider";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../Context/CartMenuContext";
import { useEffect } from "react";

const Checkout_page = () => {
  const { payment_form, onSubmit } = use_checkout_context();
  const { handleSubmit } = payment_form;
  const navigate = useNavigate();
  const { cartItemsData } = useCartContext();

  useEffect(() => {
    if (!Object.keys(cartItemsData).length) {
      navigate("/");
    }
  }, [navigate , cartItemsData]);

  if (Object.keys(cartItemsData).length) {
    return (
      <>
        <div className="checkout_area">
          <Checkout_header />
          <div className={`checkout_content`}>
            <main className="payment_part">
              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="content"
              >
                <Checkout_form />
                <Payment_type />
                <Pay_now_btn />
              </form>
            </main>
            <section className="products_view">
              <User_items_view />
            </section>
          </div>
          {/* <DevTool control={control} /> */}
        </div>
      </>
    );
  }

  return null;
};

export default Checkout_page;
