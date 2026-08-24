import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaCheck, FaClock, FaLocationDot, FaStore } from "react-icons/fa6";
import { useCartContext } from "../../Context/CartMenuContext";
import { getOrderById } from "../../services/orderServices";
import SummeryOrders from "./SummeryOrders";
import OrderItems from "./OrderItems";

// Page displayed after a successful order placement
const Order_successfull = () => {
  const navigate = useNavigate();
  const { clearCartItems } = useCartContext();
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");

  // Stores the last order data retrieved from localStorage
  const [order, setOrder] = useState(null);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    // first clear cart
    clearCartItems();

    if (!orderId) {
      navigate("/");
    }

    const getOrder = async () => {
      try {
        const order = await getOrderById(orderId);

        setOrder(order);
      } catch (error) {
        console.error("Order Successfull Errors:", error);
      }
    };

    getOrder();
  }, []);

  // Render nothing while order data is loading
  // if (!order) return null;

  if (order)
    return (
      <div className="success_container min-h-[80vh] flex-center bg-[#f6f6f6] p-5 md:px-10 md:py-5 mt-10">
        <div className="success_card bg-white w-full max-w-4xl rounded-sm p-5 md:p-10 text-center shadow-sm invoice-section">
          {/* Success checkmark icon */}
          <div className="success_icon w-17.5 h-17.5 m-[0_auto_15px] bg-green-500 text-white text-3xl rounded-full flex-center">
            <FaCheck />
          </div>

          <h1 className="text-2xl text-black">Order Confirmed</h1>
          <p className="text-sm text-gray">
            Your order has been placed successfully.
          </p>

          <div className="flex-start-col gap-5 my-5 ">
            {/* Order Summery */}
            <SummeryOrders order={order} />

            <div className="flex-start-col w-full gap-5 ">
              {/* Order Items */}
              <OrderItems items={order.items} />
              {/* Delivery */}
              <div className="border border-border rounded-sm p-2.5 flex-start-col gap-2.5 text-sm w-full">
                <h2 className="font-semibold">Delivery</h2>
                {order.delivery.type === "ship" ? (
                  <div className="flex-start items-start! gap-2.5">
                    <FaLocationDot className="text-orange text-lg" />
                    <div>
                      <p className="text-dark font-semibold">
                        {order.delivery.address.firstName}{" "}
                        {order.delivery.address.lastName}
                      </p>
                      <p className="text-gray">
                        {order.delivery.address.address}
                      </p>
                      <p className="text-gray">
                        {order.delivery.address.city},{" "}
                        {order.delivery.address.country}
                      </p>
                    </div>
                  </div>
                ) : (
                  <ul className="flex-start-col gap-2.5">
                    <li className="flex-start gap-1.5">
                      <FaStore className="text-orange" />{" "}
                      <p>Pick Up From Store</p>
                    </li>
                    <li className="flex-start gap-1.5">
                      <FaLocationDot className="text-orange" />{" "}
                      <p>123 Main St, Cairo, Egypt Working</p>
                    </li>
                    <li className="flex-start gap-1.5">
                      <FaClock className="text-orange" />{" "}
                      <p>hours: 9AM - 9PM</p>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Action buttons — continue shopping or print the invoice */}
          <div className="success_actions flex-center flex-wrap mb-5 gap-3.5 ">
            <button
              className="primary_btn py-2.5 px-5 rounded-sm cursor-pointer font-semibold text-sm text-white bg-orange"
              onClick={() => navigate("/shop")}
            >
              Continue Shopping
            </button>

            <button
              className="secondary_btn py-2.5 px-5 line-clamp-1  rounded-sm cursor-pointer font-semibold text-sm text-black bg-gray-light"
              onClick={() => window.print()}
            >
              Print Invoice
            </button>
          </div>
        </div>
      </div>
    );
};

export default Order_successfull;
