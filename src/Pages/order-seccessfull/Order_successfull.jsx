import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Order_success.css";

// Page displayed after a successful order placement
const Order_successfull = () => {
  const navigate = useNavigate();

  // Stores the last order data retrieved from localStorage
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("last_order");

    // Redirect to home if no order data found
    if (!stored) {
      navigate("/");
    } else {
      setOrder(JSON.parse(stored));
    }
  }, [navigate]);

  // Render nothing while order data is loading
  if (!order) return null;

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="success_container">
      <div className="success_card">
        {/* Success checkmark icon */}
        <div className="success_icon">
          <i className="fa-solid fa-check"></i>
        </div>

        <h1>Order Confirmed </h1>
        <p>Your order has been placed successfully.</p>

        {/* Order summary details */}
        <div className="order_info">
          <div>
            <span>Order ID</span>
            {/* Show only the first 8 characters of the order ID */}
            <strong>{order.id.slice(0, 8)}</strong>
          </div>

          <div>
            <span>Total Paid</span>
            <strong>{order.pricing.total} EGP</strong>
          </div>

          <div>
            <span>Payment Method</span>
            <strong>{order.payment.method}</strong>
          </div>

          <div>
            <span>Status</span>
            <strong className="pending">Pending</strong>
          </div>
        </div>

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
