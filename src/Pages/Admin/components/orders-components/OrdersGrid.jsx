import OrderTableRow from "./OrderTableRow";

const OrdersGrid = ({ orders }) => {
  return (
    <div className="bg-white roudned-sm w-full max-w-full overflow-auto max-h-81 ">
      <table className="w-full min-w-220">
        <thead className="bg-gray-100 ">
          <tr className="">
            <th className="py-1.5 text-start text-sm px-2.5">Order Id</th>
            <th className="text-start text-sm">Customers</th>
            <th className="text-start text-sm">Date</th>
            <th className="text-start text-sm">Total</th>
            <th className="text-start text-sm">Payment</th>
            <th className="text-start text-sm">Status</th>
            <th className="text-end pr-7.5 text-sm">Actions</th>
          </tr>
        </thead>
        <tbody className="max-h-50 overflow-auto">
          {orders.map((order) => {
            return <OrderTableRow key={order.id} order={order} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersGrid;
