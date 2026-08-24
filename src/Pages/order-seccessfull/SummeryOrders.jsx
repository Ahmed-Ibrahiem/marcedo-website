import React from "react";

const SummeryOrders = ({ order }) => {
  return (
    <div className={`${summeryStyle}`}>
      {/* OrderId */}
      <div className={`${boxStyle} max-md:border-none`}>
        <h3 className={`${h1Style}`}>Order Id</h3>
        <p className={`${pStyle}`}>{order.id}</p>
      </div>

      {/* Paymnet Method */}
      <div className={`${boxStyle} border-t-2 sm:border-t-0 md:border-r-2! `}>
        <h3 className={`${h1Style}`}>Payment Method</h3>
        <p className={`${pStyle}`}>{order.payment.method}</p>
      </div>

      {/* Total Paid */}
      <div className={`${boxStyle}`}>
        <h3 className={`${h1Style}`}>Total Paid</h3>
        <p className={`${pStyle}`}>{order.pricing.total}</p>
      </div>
      {/* Status */}
      <div className={`${boxStyle} md:border-none!`}>
        <h3 className={`${h1Style}`}>Status</h3>
        <p className={`${pStyle}`}>{order.status}</p>
      </div>
    </div>
  );
};

const summeryStyle = `
w-full p-2.5 rounded-sm bg-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5
`;

const boxStyle = `
flex-center-col p-2.5 gap-1.5 border-t-2  md:border-t-0! md:border-r-2 border-gray-200 p-1.5
`;

const h1Style = `
text-sm font-semibold

`;

const pStyle = `
text-sm  capitalize line-clamp-1! max-w-full text-ellipsis
`;

export default SummeryOrders;
