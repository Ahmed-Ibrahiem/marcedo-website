import React from "react";
import { FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

const formatOrderDate = (timestamp) => {
  if (!timestamp) {
    return {
      date: "",
      time: "",
    };
  }

  const date = new Date(timestamp.seconds * 1000);

  return {
    date: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(date),

    time: new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date),
  };
};

const OrderTableRow = ({ order }) => {
  const orderDate = formatOrderDate(order.created_at);

  return (
    <tr key={order.id} className="text-xs border-b border-border">
      {/* id */}
      <td className="px-2.5 py-1.5 w-50 2xl:w-70">
        <p className="line-clamp-1 text-orange font-semibold text-sm!">
          #{order.id}
        </p>
      </td>
      {/* customer */}
      <td className="w-50 2xl:w-70">
        <div className="w-full flex-start-col gap-1 py-1.5 ">
          <p className="font-semibold line-clamp-1">{order.user.name}</p>
          <p className="text-gray line-clamp-1">
            {order.user.user_email ?? order.user.guest_email}
          </p>
        </div>
      </td>
      {/* date */}
      <td>
        <div className="w-full flex-start-col gap-1 py-1.5 text-gray">
          <p>{orderDate.date}</p>
          <p>{orderDate.time}</p>
        </div>
      </td>
      {/* total */}
      <td className="font-semibold">{order.pricing.total} EGP</td>
      {/* payment */}
      <td className="font-semibold capitalize">
        {order.payment.method.split("_").join(" ")}
      </td>
      {/* status */}
      <td>
        <div
          className={`px-2.5 py-1.5 text-center rounded-full capitalize w-fit font-semibold
            ${
              order.status === "pending"
                ? "text-orange-500 bg-orange-100"
                : order.status === "processing"
                  ? "text-blue-500 bg-blue-100"
                  : order.status === "delivered"
                    ? "text-green-500 bg-green-100"
                    : "text-red-500 bg-red-100"
            }`}
        >
          {order.status}
        </div>
      </td>
      {/* action */}
      <td className="pr-7.5">
        <div className="w-full flex justify-end">
          <Link
            to={`/order-details/${order.id}`}
            className="w-8 h-8 block rounded-sm border border-border flex-center shadow-sm text-lg text-gray! hover:text-black!"
          >
            <FaRegEye />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default OrderTableRow;
