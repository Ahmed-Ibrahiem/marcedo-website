import React, { useEffect, useState } from "react";
import OrderTableHead from "./OrderTableHead";
import OrdersGrid from "./OrdersGrid";
import TableControlsBtns from "../../products-components/TableControlsBtns";
import { assets } from "../../../../assets/assets";
import { FaFilter } from "react-icons/fa6";

const filterFunction = (orders, filterOptions, searchQuery) => {
  return orders.filter((order) => {
    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchId = order.id.toLowerCase().includes(query);
      const matchCustomer = order.user?.name?.toLowerCase().includes(query);
      const matchEmail = (order.guest_email || order.user?.email)
        ?.toLowerCase()
        .includes(query);
      if (!matchId && !matchCustomer && !matchEmail) return false;
    }

    // Filter
    if (filterOptions.status && order.status !== filterOptions.status)
      return false;
    if (filterOptions.payment && order.payment.method !== filterOptions.payment)
      return false;

    return true;
  });
};

const OrdersTable = ({ orders }) => {
  const [displayOrders, setDisplayOrders] = useState([]);
  const [filterOrders, setFilterOrders] = useState(orders);
  const [searchQuery, setSearchQuery] = useState("");
  const defaultOptions = {
    status: null,
    payment: null,
  };
  const [filterOptions, setFilterOptions] = useState(defaultOptions);

  useEffect(() => {
    setFilterOrders(filterFunction(orders, filterOptions, searchQuery));
  }, [orders, filterOptions, searchQuery]);


  return (
    <div className="w-full bg-white rounded-sm shadow-sm flex-start-col grow!">
      <OrderTableHead
        setFilterOptions={setFilterOptions}
        filterOptions={filterOptions}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
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
