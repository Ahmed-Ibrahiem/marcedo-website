import Form_errors_message from "../../../Components/ui/Errors/Form_errors_message";
import { use_checkout_context } from "../../../Context/CheckoutProvider";
import style from "../Css/Contact_box.module.css";

const Contact_box = () => {
  // Get the payment form instance from checkout context
  const { payment_form } = use_checkout_context();

  // Destructure register (for connecting inputs to the form) and errors from form state
  const {
    register,
    formState: { errors },
  } = payment_form;

  return (
    <>
      <div className={`${style.contact_box}`}>
        {/* Section header with a "Sign in" link for existing users */}
        <div className="title">
          <h2>Contact</h2>
          <a href="##">Sign in</a>
        </div>

        {/* Contact input — accepts email or phone number
            Highlights with orange border if validation fails */}
        <input
          type="text"
          className="box"
          style={
            errors.contact_way ? { borderColor: "var(--orange-color)" } : {}
          }
          placeholder="Email or mobile phone number"
          {...register("contact_way")}
        />

        {/* Show validation error message if contact field is invalid */}
        {errors.contact_way && (
          <Form_errors_message message={errors.contact_way.message} />
        )}

        {/* Optional checkbox to subscribe to email offers */}
        <div className={style.email_offers}>
          <input type="checkbox" id="email_offers" {...register("email_me")} />
          <label htmlFor="email_offers">Email me with new offers</label>
        </div>
      </div>
    </>
  );
};

export default Contact_box;
