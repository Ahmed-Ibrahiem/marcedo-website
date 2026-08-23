import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Order_success.css";
import { FaCheck } from "react-icons/fa6";
import { useCartContext } from "../../Context/CartMenuContext";

// Page displayed after a successful order placement
const Order_successfull = () => {
  const navigate = useNavigate();
  const { clearCartItems } = useCartContext();

  // Stores the last order data retrieved from localStorage
  const [order, setOrder] = useState(null);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    // first clear cart
    clearCartItems();
  }, []);

  // Render nothing while order data is loading
  // if (!order) return null;

  return (
    <div className="success_container">
      <div className="success_card">
        {/* Success checkmark icon */}
        <div className="success_icon">
          <FaCheck />
        </div>

        <h1>Order Confirmed </h1>
        <p>Your order has been placed successfully.</p>

        {/* Action buttons — continue shopping or print the invoice */}
        <div className="success_actions">
          <button className="primary_btn" onClick={() => navigate("/shop")}>
            Continue Shopping
          </button>

          <button className="secondary_btn" onClick={() => window.print()}>
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order_successfull;
