import "./Checkout.css";
import Checkout_form from "./components/Checkout_form";
import Checkout_header from "./components/Checkout_header";
import Payment_type from "./components/Payment_type";
import Pay_now_btn from "./components/Pay_now_btn";
import User_items_view from "./components/User_items_view";
import { use_checkout_context } from "../../Context/Checkout_provider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartContext } from "../../Context/CartMenuContext";

const Checkout_page = () => {
  const { payment_form, onSubmit } = use_checkout_context();
  const { control, handleSubmit } = payment_form;
  const navigate = useNavigate();
  const [there_items, set_threre_items] = useState(false);
  const { cartItemsData } = useCartContext();

  useEffect(() => {
    if (cartItemsData == 0) {
      set_threre_items(false);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else set_threre_items(true);
  }, [navigate]);

  console.log(there_items);

  return (
    <>
      {there_items && (
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
      )}

      {!there_items && <h1>Loading...</h1>}
    </>
  );
};

export default Checkout_page;
