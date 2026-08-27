import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import DropDownList from "../DropDownList";

const statusList = [
  { id: null, name: "All Status" },
  {
    id: "pending",
    name: "Pendnig",
  },
  {
    id: "processing",
    name: "Processing",
  },
  {
    id: "delivered",
    name: "Delivered",
  },
  {
    id: "cancelled",
    name: "Cancelled",
  },
];

const paymentMethods = [
  { id: null, name: "All Payment Methods" },
  {
    id: "cash_on_delivery",
    name: "Cash On Delivery",
  },
  {
    id: "visa",
    name: "Visa",
  },
  {
    id: "credit_card",
    name: "Credit Card",
  },
];

const OrderTableHead = ({
  setFilterOptions,
  filterOptions,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="p-2.5 w-full flex flex-col md:flex-row md:items-center md:justify-between gap-2.5">
      {/* Search Order Input */}
      <div className="border border-border p-2 rounded-sm flex-start gap-3 md:w-80">
        <FaMagnifyingGlass />
        <input
          type="text"
          placeholder="Search Order..."
          className="grow outline-none text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex-start gap-2.5 ">
        {/* Status Dropdown */}
        <DropDownList
          list={statusList}
          currentSelect={
            filterOptions.status ? filterOptions.status : "All Status"
          }
          listStyle={"w-30"}
          opionsStyle={"w-full!"}
          optionFun={(item) =>
            setFilterOptions((prev) => ({ ...prev, status: item.id }))
          }
        />

        {/* Payment Methods Dropdown */}
        <DropDownList
          list={paymentMethods}
          currentSelect={
            filterOptions.payment
              ? filterOptions.payment.split("_").join(" ")
              : "All Payment Methods"
          }
          listStyle={"w-50"}
          opionsStyle={"w-full!"}
          optionFun={(item) =>
            setFilterOptions((prev) => ({ ...prev, payment: item.id }))
          }
        />
      </div>
    </div>
  );
};

export default OrderTableHead;
