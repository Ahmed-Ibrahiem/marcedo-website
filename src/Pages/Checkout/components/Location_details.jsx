import Form_errors_message from "../../../Components/ui/Errors/Form_errors_message";
import { use_checkout_context } from "../../../Context/CheckoutProvider";
import style from "../Css/Address_box.module.css";

const Location_details = () => {
  // Get the payment form instance from checkout context
  const { payment_form } = use_checkout_context();

  // Destructure register and errors from the form
  const {
    register,
    formState: { errors },
  } = payment_form;

  return (
    <div className={style.more_info}>
      {/* City input field */}
      <div className={`${style.city_box}`}>
        <input
          className="box"
          type="text"
          placeholder="City"
          {...register("address_info.city")}
        />
        {/* Show error message if city field is invalid */}
        {errors.address_info?.city && (
          <Form_errors_message message={errors.address_info?.city.message} />
        )}
      </div>

      {/* State input field */}
      <div className={`${style.state_box}`}>
        <input
          className="box"
          type="text"
          placeholder="State"
          {...register("address_info.state")}
        />
        {/* Show error message if state field is invalid */}
        {errors.address_info?.state && (
          <Form_errors_message message={errors.address_info?.state.message} />
        )}
      </div>

      {/* Zip Code input field — registered as a number value */}
      <div className={`${style.zip_code_box}`}>
        <input
          className="box"
          type="number"
          placeholder="Zip code"
          {...register("address_info.zip_code", { valueAsNumber: true })} // Parse input as number instead of string
        />
        {/* Show error message if zip code field is invalid */}
        {errors.address_info?.zip_code && (
          <Form_errors_message
            message={errors.address_info?.zip_code.message}
          />
        )}
      </div>
    </div>
  );
};

export default Location_details;
