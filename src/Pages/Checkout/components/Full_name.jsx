import Form_errors_message from "../../../Components/Errors/Form_errors_message";
import { use_checkout_context } from "../../../Context/Checkout_provider";
import style from "../Css/Address_box.module.css";

const Full_name = () => {
  // Destructure register and errors directly from the payment form in checkout context
  const {
    payment_form: {
      register,
      formState: { errors },
    },
  } = use_checkout_context();

  return (
    <div className={style.full_name}>
      {/* First Name field */}
      <div>
        <input
          type="text"
          className="box"
          placeholder="First Name"
          {...register("address_info.first_name")}
          // Highlight with orange border if first name validation fails
          style={
            errors.address_info?.first_name
              ? { borderColor: "var(--orange-color)" }
              : {}
          }
        />
        {/* Show error message if first name is invalid */}
        {errors.address_info?.first_name && (
          <Form_errors_message
            message={errors.address_info?.first_name?.message}
          />
        )}
      </div>

      {/* Last Name field */}
      <div>
        <input
          type="text"
          className="box"
          placeholder="Last Name"
          {...register("address_info.last_name")}
          // Highlight with orange border if last name validation fails
          style={
            errors.address_info?.last_name
              ? { borderColor: "var(--orange-color)" }
              : {}
          }
        />
        {/* Show error message if last name is invalid */}
        {errors.address_info?.last_name && (
          <Form_errors_message
            message={errors.address_info.last_name.message}
          />
        )}
      </div>
    </div>
  );
};

export default Full_name;
