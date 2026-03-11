import React from "react";
import { use_checkout_context } from "../../../Context/CheckoutProvider";

const Pay_now_btn = () => {
  const {
    payment_form: {
      formState: { isValid },
    },
  } = use_checkout_context();

  return (
    <button
      type="submit"
      disabled={!isValid}
      style={
        isValid
          ? { color: "var(--white-color)", background: "var(--blue-color)" }
          : {
              color: "var(--gray-color)",
              background: "#ccc",
              cursor: "not-allowed",
            }
      }
      className="pay_now"
    >
      Pay Now
    </button>
  );
};

export default Pay_now_btn;
