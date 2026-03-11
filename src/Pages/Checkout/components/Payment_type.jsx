import style from "../Css/Payment_type.module.css";
import Credit_card_form from "./Credit_card_form";
import image from "../../../assets/credit_card.svg";
import { use_checkout_context } from "../../../Context/CheckoutProvider";
import { useWatch } from "react-hook-form";

const Payment_type = () => {
  // Get the payment form instance from checkout context
  const { payment_form } = use_checkout_context();

  // Destructure register and setValue from the form
  const { register, setValue } = payment_form;

  // Watch the payment_type field in real-time to reflect the active selection in the UI
  const payment_type = useWatch({
    name: "payment_type",
    control: payment_form.control,
  });

  // Handler — updates the payment_type field and triggers validation immediately
  const update_payment_type = (value) => {
    setValue("payment_type", value, {
      shouldValidate: true, // Run validation after update
      shouldDirty: true, // Mark field as modified
    });
  };

  return (
    <div className={style.payment_type}>
      {/* Section header */}
      <div className={style.title}>
        <h2>Payment</h2>
        <p>All transactions are secure and encrypted.</p>
      </div>

      <div className={style.payment_options}>
        {/* Credit Card option — highlights when selected */}
        <section
          onClick={() => update_payment_type("credit_card")}
          className={`${style.credit_card} ${payment_type == "credit_card" ? style.active : ""}`}
        >
          <input
            type="radio"
            name="payment_type"
            id="credit_card"
            value="credit_card"
            {...register("payment_type")}
          />
          <label htmlFor="credit_card">Credit card</label>
          <img src={image} className={style.payment_image} />
        </section>

        {/* Credit card form — only visible when credit_card option is selected */}
        <section
          className={`${style.credit_card_form} ${payment_type == "credit_card" ? style.show_credit_form : ""}`}
        >
          <Credit_card_form />
        </section>

        {/* Cash on Delivery option — highlights when selected */}
        <section
          onClick={() => update_payment_type("cash_on_delivery")}
          className={`${style.cash_on_delivery} ${payment_type == "cash_on_delivery" ? style.active : ""}`}
        >
          <input
            type="radio"
            name="payment_type"
            id="cash_on_delivery"
            value="cash_on_delivery"
            {...register("payment_type")}
          />
          <label htmlFor="cash_on_delivery">Cash on Delivery (COD)</label>
        </section>

        {/* Visa option — highlights when selected */}
        <section
          onClick={() => update_payment_type("visa")}
          className={`${style.visa} ${payment_type == "visa" ? style.active : ""}`}
        >
          <input
            type="radio"
            name="payment_type"
            id="visa"
            value="visa"
            {...register("payment_type")}
          />
          <label htmlFor="visa">Visa</label>
        </section>
      </div>
    </div>
  );
};

export default Payment_type;
