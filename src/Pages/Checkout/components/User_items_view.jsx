import { useEffect, useState } from "react";
import { useCartContext } from "../../../Context/CartMenuContext";
import style from "../Css/User_items_view.module.css";
import Calculate_price from "./Calculate_price";
import Item from "./Item";
import { discount_codes } from "../../../assets/assets";
import Form_errors_message from "../../../Components/Errors/Form_errors_message";
import { use_checkout_context } from "../../../Context/Checkout_provider";

const User_items_view = () => {
  // Get cart items from cart context
  const { cartItemsData } = useCartContext();

  // Get discount info state and setter from checkout context
  const { discount_info, set_discount_info } = use_checkout_context();

  // Local state to track the discount code input value
  const [discount_code, set_dicount_code] = useState("");

  // Counter used to trigger the discount validation effect when "Apply" is clicked
  const [apply_count, set_apply_count] = useState(0);

  // Run whenever apply_count changes (i.e., when user clicks "Apply")
  useEffect(() => {
    // Search for a matching discount code in the predefined list
    const get_discount_info = discount_codes.find(
      (dis) => dis.code === discount_code,
    );

    // If no match found, do nothing (invalid code handling is done in the UI)
    if (!get_discount_info) return;

    // Valid code found — save discount info to checkout context
    set_discount_info(get_discount_info);
  }, [apply_count]);

  return (
    <div className={style.items_area}>
      {/* Render each cart item using the Item component */}
      <div className={style.items_grid}>
        {cartItemsData.map((data) => {
          return <Item key={data.id} data={data} />;
        })}
      </div>

      {/* Discount code input section */}
      <div className={`${style.discount_code}`}>
        <input
          disabled={discount_info} // Disable input if a valid discount is already applied
          type="text"
          placeholder="Discount code or gift card"
          onBlur={(e) => {
            // Update discount_code state when input loses focus
            set_dicount_code(e.target.value);
            // Reset apply count if the field is cleared (prevents stale error state)
            if (e.target.value.trim() == "") set_apply_count(0);
          }}
          onChange={(e) => {
            // If discount is already applied, lock the input to the applied code
            if (discount_info) set_dicount_code(discount_info.value);
            else set_dicount_code(e.target.value);
          }}
          // Show the applied discount code if one exists, otherwise show typed input
          value={discount_info ? discount_info.code : discount_code}
        />

        {/* Apply button — triggers discount validation via apply_count increment */}
        <button
          type="button"
          disabled={discount_info} // Disable if discount already applied
          className={`${style.apply} ${discount_info ? style.disabled : ""}`}
          onClick={() => set_apply_count((prev) => prev + 1)}
        >
          Apply
        </button>

        {/* Show error message if user clicked Apply but no valid code was found */}
        {!discount_info && apply_count > 0 && (
          <Form_errors_message message={"Invalid Code"} />
        )}
      </div>

      {/* Price summary component — receives discount info to calculate final price */}
      <Calculate_price discount_info={discount_info} />
    </div>
  );
};

export default User_items_view;
