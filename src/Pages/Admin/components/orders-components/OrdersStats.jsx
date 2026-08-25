import React, { useEffect, useReducer } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaBagShopping, FaClock, FaXmark } from "react-icons/fa6";
import { IoCubeOutline } from "react-icons/io5";


const initialStats = {
  pending: 0,
  processing: 0,
  delivered: 0,
  cancelled: 0,
};
const reducerFunction = (state, action) => {
  switch (action.type) {
    case "UPDATE_PENDING":
      return { ...state, pending: action.payload };
    case "UPDATE_PROCESSING":
      return { ...state, processing: action.payload };
    case "UPDATE_DELIVERED":
      return { ...state, delivered: action.payload };
    case "UPDATE_CANCELLED":
      return { ...state, cancelled: action.payload };
    case "UPDATE_STATS":
      return { ...action.payload };
  }

  return state;
};

const OrdersStats = ({ orders }) => {
  const [stats, dispatchStats] = useReducer(reducerFunction, initialStats);

  useEffect(() => {
    if (orders.length === 0) return;

    const pendingOrders = orders.filter((order) => order.status === "pending");
    const processingOrders = orders.filter(
      (order) => order.status === "processing",
    );
    const deliveredOrders = orders.filter(
      (order) => order.status === "deliverd",
    );
    const cancelledOrders = orders.filter(
      (order) => order.status === "cancelled",
    );

    dispatchStats({
      type: "UPDATE_STATS",
      payload: {
        pending: pendingOrders.length,
        processing: processingOrders.length,
        delivered: deliveredOrders.length,
        cancelled: cancelledOrders.length,
      },
    });
  }, [orders]);

  return (
    <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
      {/* Total Orders */}
      <div className={`${containerStyle}`}>
        <div className={`${boxStyle}`}>
          <h2 className={titleStyle}>Total Orders</h2>
          <p className={valueStyle}>{orders.length}</p>
        </div>
        <div className={`${iconBox} text-blue-500 bg-blue-100`}>
          <FaBagShopping />
        </div>
      </div>

      {/* Pending Orders */}
      <div className={`${containerStyle}`}>
        <div className={`${boxStyle}`}>
          <h2 className={titleStyle}>Pending</h2>
          <p className={valueStyle}>{stats.pending}</p>
        </div>
        <div className={`${iconBox} text-orange-500 bg-orange-100`}>
          <FaClock />
        </div>
      </div>

      {/* Processing Orders */}
      <div className={`${containerStyle}`}>
        <div className={`${boxStyle}`}>
          <h2 className={titleStyle}>Processing</h2>
          <p className={valueStyle}>{stats.processing}</p>
        </div>
        <div className={`${iconBox} text-blue-500 bg-blue-100`}>
          <IoCubeOutline />
        </div>
      </div>

      {/* Delivered Orders */}
      <div className={`${containerStyle}`}>
        <div className={`${boxStyle}`}>
          <h2 className={titleStyle}>Delivered</h2>
          <p className={valueStyle}>{stats.delivered}</p>
        </div>
        <div className={`${iconBox} text-green-500 bg-green-100`}>
          <FaRegCheckCircle />
        </div>
      </div>

      {/* Cancelled Orders */}
      <div className={`${containerStyle}`}>
        <div className={`${boxStyle}`}>
          <h2 className={titleStyle}>Cancelled</h2>
          <p className={valueStyle}>{stats.cancelled}</p>
        </div>
        <div className={`${iconBox} text-red-500 bg-red-100`}>
          <FaXmark />
        </div>
      </div>
    </div>
  );
};

const containerStyle = `
    p-5 bg-white rounded-sm shadow-sm flex-between
`;

const boxStyle = `
flex-start-col gap-1.5
`;

const titleStyle = `
    text-sm text-dark
`;

const valueStyle = `
    font-semibold text-xl
`;

const iconBox = `
w-12 h-12 rounded-full flex-center text-xl
`;

export default React.memo(OrdersStats);
