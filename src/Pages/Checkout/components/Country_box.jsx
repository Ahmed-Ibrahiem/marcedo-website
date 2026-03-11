import { useState } from "react";
import style from "../Css/Country_box.module.css";
import { use_checkout_context } from "../../../Context/CheckoutProvider";
import Form_errors_message from "../../../Components/ui/Errors/Form_errors_message";

const Country_box = () => {
  // Track whether the country dropdown menu is open or closed
  const [is_menu_open, set_is_menu_open] = useState(false);

  // Get the payment form instance from checkout context
  const { payment_form } = use_checkout_context();

  // Destructure setValue (to update field), watch (to read field value), and errors
  const {
    setValue,
    watch,
    formState: { errors },
  } = payment_form;

  // Handler — sets the selected country in the form and triggers validation
  const handle_select_country = (country) => {
    setValue("address_info.country", country, {
      shouldDirty: true, // Mark field as modified
      shouldValidate: true, // Run validation immediately after setting value
    });
  };

  return (
    <>
      {/* Country dropdown container — toggles menu open/close on click */}
      <div
        className={`box ${style.country_region_box}`}
        onClick={() => set_is_menu_open(!is_menu_open)}
      >
        <span>Country/Region</span>

        {/* Display the currently selected country, or a placeholder if none selected */}
        <p className="current_option">
          {watch("address_info.country") || "select country..."}
        </p>

        {/* Arrow icon — indicates dropdown behavior */}
        <i className="fa-solid fa-angle-right"></i>

        {/* Dropdown options — visible only when is_menu_open is true */}
        <div
          className={`${style.options} ${is_menu_open ? style.open_menu : ""}`}
        >
          <span onClick={() => handle_select_country("Egypt")}>Egypt</span>
          <span onClick={() => handle_select_country("United States")}>
            United States
          </span>
        </div>
      </div>

      {/* Show validation error if no country is selected */}
      {errors.address_info?.country && (
        <Form_errors_message message={errors.address_info?.country.message} />
      )}
    </>
  );
};

export default Country_box;
