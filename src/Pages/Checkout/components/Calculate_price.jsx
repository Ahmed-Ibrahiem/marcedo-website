import { useEffect, useMemo, useState } from "react";
import { useCartContext } from "../../../Context/CartMenuContext";
import style from "../Css/Calculate_price.module.css";
import { use_checkout_context } from "../../../Context/Checkout_provider";
import { useWatch } from "react-hook-form";
import { address_15_shopping_cost, address_20_shopping_cost } from "../../../assets/assets";

const Calculate_price = () => {
  // Get cart items and subtotal price from cart context
  const { cartItemsData, SubtotalItemsPrice } = useCartContext();

  // Default shipping label shown before the user enters an address
  const defaultShopping = "enter your shopping address";

  // Local state to display the shipping cost label in the UI
  const [shopping, set_shopping] = useState(defaultShopping);

  // Get payment form, address suggestions, shopping_cost setter, total, and discount info from checkout context
  const { payment_form, suggestions, set_shopping_cost, total, discount_info } =
    use_checkout_context();

  // Watch the address field in real-time using react-hook-form
  const shopping_address = useWatch({
    name: "address_info.address",
    control: payment_form.control,
  });

  // Recalculate shipping cost and shopping_cost whenever the address changes
  useEffect(() => {
    if (shopping_address.trim() == "") {
      // Empty address — reset shipping display and remove shopping_cost
      set_shopping(defaultShopping);
      set_shopping_cost(0);
    } else if (
      // Address matches 15% shopping_cost zone OR is not in the suggestions list (unknown address)
      address_15_shopping_cost.includes(shopping_address.toLowerCase()) ||
      !suggestions.includes(shopping_address.toLowerCase())
    ) {
      set_shopping_cost(15);
      set_shopping("$15");
    } else if (address_20_shopping_cost.includes(shopping_address.toLowerCase())) {
      // Address matches 20% shopping_cost zone
      set_shopping_cost(20);
      set_shopping("$20");
    } else {
      // Address is valid and not in any shopping_cost zone — free shipping
      set_shopping("Free");
    }
  }, [shopping_address]);

  return (
    <div className={style.calculate_area}>
      {/* Show discount badge only if a valid discount code has been applied */}
      {discount_info && (
        <div className={style.discount}>
          <p>You have discount</p> <span>15%</span>
        </div>
      )}

      {/* Subtotal row — shows number of items and their combined price */}
      <div className="subtotal">
        <p>Subtotal . {cartItemsData.length} items</p>
        <span>${SubtotalItemsPrice}</span>
      </div>

      {/* Shipping row — dynamically shows cost based on address input */}
      <div className="shopping">
        <p>Shipping</p>
        <span>{shopping}</span>
      </div>

      {/* Total row — final price after applying shopping_cost and discount */}
      <div className={style.total}>
        <p>Total</p>
        <span>USD ${total}</span>
      </div>
    </div>
  );
};

export default Calculate_price;
