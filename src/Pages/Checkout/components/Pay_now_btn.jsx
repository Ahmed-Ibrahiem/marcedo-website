import { use_checkout_context } from "../../../Context/CheckoutProvider";

const Pay_now_btn = () => {
  const {
    payment_form: {
      formState: { isValid, isSubmitting },
    },
  } = use_checkout_context();

  return (
    <button
      type="submit"
      disabled={!isValid || isSubmitting}
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
      {isSubmitting ? "loading.." : " Pay Now"}
    </button>
  );
};

export default Pay_now_btn;
