import Form_errors_message from "../../../Components/Errors/Form_errors_message";
import { use_checkout_context } from "../../../Context/Checkout_provider";
import style from "../Css/Delivery_box.module.css";

const Delivery_box = () => {
  // Destructure register and errors directly from the payment form in checkout context
  const {
    payment_form: {
      register,
      formState: { errors },
    },
  } = use_checkout_context();

  return (
    <div className={style.delivery_box}>
      {/* Section header */}
      <div className="title">
        <h2>Delivery</h2>
      </div>

      {/* Delivery type options — Ship or Pick Up */}
      <div className={style.options}>
        {/* Ship option — user receives order at their address */}
        <div className={`${style.ship} ${style.input_box}`}>
          <input
            type="radio"
            name="delivery"
            value={"ship"}
            id="ship"
            {...register("delivery_type")} // Register with react-hook-form
          />
          <label htmlFor="ship">Ship</label>
          <i className="fa-regular fa-truck"></i>
        </div>

        {/* Pick Up option — user collects order from a location */}
        <div className={`${style.input_box}`}>
          <input
            type="radio"
            name="delivery"
            value={"Pick-up"}
            id="Pick-up"
            {...register("delivery_type")} // Register with react-hook-form
          />
          <label htmlFor="Pick-up">Pick Up</label>
          <i className="fa-regular fa-home"></i>
        </div>
      </div>

      {/* Show validation error if no delivery type is selected */}
      {errors.delivery_type && (
        <Form_errors_message message={errors.delivery_type.message} />
      )}
    </div>
  );
};

export default Delivery_box;
