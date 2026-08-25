import React, { useEffect, useState } from "react";
import OrderTableHead from "./OrderTableHead";
import OrdersGrid from "./OrdersGrid";
import TableControlsBtns from "../../products-components/TableControlsBtns";
import { assets } from "../../../../assets/assets";
import { FaFilter } from "react-icons/fa6";

const filterFunction = (orders, filterOptions) => {
  if (!filterOptions.status && !filterOptions.payment) return orders;

  let filterOrders = orders.filter((order) => {
    if (filterOptions.status) {
      if (filterOptions.status !== order.status) return false;
    }

    if (filterOptions.payment) {
      if (order.payment.method === filterOptions.payment) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  });

  return filterOrders;
};


const OrdersTable = ({ orders }) => {
  const [displayOrders, setDisplayOrders] = useState([]);
  const [filterOrders, setFilterOrders] = useState(orders);
  const defaultOptions = {
    status: null,
    payment: null,
  };
  const [filterOptions, setFilterOptions] = useState(defaultOptions);

  useEffect(() => {
    setFilterOrders(filterFunction(orders, filterOptions));
  }, [orders, filterOptions]);

  useEffect(() => {
  setDisplayOrders(filterOrders);
}, [filterOrders]);
  return (
    <div className="w-full bg-white rounded-sm shadow-sm flex-start-col grow!">
      <OrderTableHead
        setFilterOptions={setFilterOptions}
        filterOptions={filterOptions}
      />
      {displayOrders.length > 0 ? (
        <OrdersGrid orders={displayOrders} />
      ) : (
        <div className="grow w-full flex-center-col gap-2">
          <img
            src={assets.emptyBox}
            className="max-w-50 max-h-50 object-contain"
            alt="empty orders"
          />
          <div className="text-center mb-2.5">
            <h1 className="font-bold">Not Orders Found</h1>
            <p className="text-sm text-gray">
              There ara no orders matching with your current filters.
            </p>
          </div>
          <button
            onClick={() => setFilterOptions(defaultOptions)}
            className="px-2.5 py-1.5 rounded-sm border border-border text-sm flex-center gap-1.5 hover:shadow-sm"
          >
            <FaFilter />
            <span>Clear Filter</span>
          </button>
        </div>
      )}
      <div className="w-full mt-auto">
        <TableControlsBtns
          filterProducts={filterOrders}
          setDisplayProducts={setDisplayOrders}
        />
      </div>
    </div>
  );
};

export default OrdersTable;
