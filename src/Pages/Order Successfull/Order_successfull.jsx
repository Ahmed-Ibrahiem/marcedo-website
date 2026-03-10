import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Order_success.css";

const Order_successfull = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("last_order");
    if (!stored) {
      navigate("/");
    } else {
      setOrder(JSON.parse(stored));
    }
  }, [navigate]);

  if (!order) return null;

  return (
    <div className="success_container">
      <div className="success_card">
        <div className="success_icon"><i className="fa-solid fa-check"></i></div>

        <h1>Order Confirmed </h1>
        <p>Your order has been placed successfully.</p>

        <div className="order_info">
          <div>
            <span>Order ID</span>
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

        <div className="success_actions">
          <button className="primary_btn" onClick={() => navigate("/")}>
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
