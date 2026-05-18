import React from "react";

const RecentOrder = () => {
  const mokeData = [
    {
      id: "#ORD-245",
      customer: "Ahmed Mohamed",
      date: "May 19, 2024",
      total: 2599,
      status: "Delivered",
    },
    {
      id: "#ORD-244",
      customer: "Sara Ali",
      date: "May 19, 2024",
      total: 5299,
      status: "Processing",
    },
    {
      id: "#ORD-243",
      customer: "Mohamed Ashraf",
      date: "May 18, 2024",
      total: 36599,
      status: "Cancelled",
    },
  ];

  const statusStyle = (status) => {
    return (
      <span
        className={` font-bold text-center py-1.5 px-2.5 w-fit rounded-full 
            ${status === "Pending" && "text-pending bg-pending/20"}
            ${status === "Processing" && "text-processing bg-processing/20"}
            ${status === "Delivered" && "text-delivered bg-delivered/20"}
            ${status === "Cancelled" && "text-Cancelled bg-Cancelled/20"}
        `}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg max-h-57.5 border border-gray-100  grow flex flex-col overflow-hidden max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-2.5">
        <h2 className="text-base font-semibold text-gray-800">
          Recent Products
        </h2>
        <button className="view_all text-xs text-orange font-bold">
          View All (10)
        </button>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full">
          <thead className="bg-gray-light font-bold text-xs ">
            <td className="p-1.5 px-2.5">Order</td>
            <td className="p-1.5 px-2.5">Customer</td>
            <td className="p-1.5 px-2.5">Date</td>
            <td className="p-1.5 px-2.5">Total</td>
            <td className="p-1.5 px-2.5">Status</td>
          </thead>
          <tbody>
            {mokeData.map((pro) => {
              return (
                <tr key={pro.id} className="border-t border-border text-[10px]">
                  <td className="px-2.5 py-1.5"><p className="line-clamp-1">{pro.id}</p></td>
                  <td className="px-2.5 py-1.5"><p className="line-clamp-1">{pro.customer}</p></td>
                  <td className="px-2.5 py-1.5"><p className="line-clamp-1">{pro.date}</p></td>
                  <td className="px-2.5 py-1.5"><p className="line-clamp-1">{pro.total}</p></td>
                  <td className="px-2.5 flex items-center py-1.5">
                    {statusStyle(pro.status)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrder;
