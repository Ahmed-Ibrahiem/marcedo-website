import React from "react";

const NewCustomers = () => {
  const mokeData = [
    {
      id: 1,
      name: "Ahmed Tarek",
      date: "May 19, 2024",
      totalOrders: 2,
      avatar: "/assets/users/user 4.png",
    },
    {
      id: 2,
      name: "Menna Elsayed",
      date: "May 19, 2024",
      totalOrders: 1,
      avatar: "/assets/users/user 15.png",
    },
    {
      id: 3,
      name: "Khaled Ibrahim",
      date: "May 18, 2024",
      totalOrders: 3,
      avatar: "/assets/users/user 3.png",
    },
  ];

  return (
    <div className="bg-white rounded-lg max-h-57.5 border border-gray-100  grow flex flex-col overflow-hidden max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-2.5">
        <h2 className="text-base font-semibold text-gray-800">New Customers</h2>
        <button className="view_all text-xs text-orange font-bold">
          View All (10)
        </button>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full">
          <thead className="bg-gray-light font-bold text-xs ">
            <tr>
              <th className="text-start p-1.5 px-2.5">Customer</th>
              <th className="text-start p-1.5 px-2.5">Date</th>
              <th className="text-center p-1.5 px-2.5">Total Orders</th>
            </tr>
          </thead>
          <tbody>
            {mokeData.map((user) => {
              return (
                <tr key={user.id} className="border-t border-border text-xs">
                  <td className="px-2.5 py-1.5 flex items-center gap-5 font-bold">
                    <div className="w-7 h-7 bg-gray-light flex-center rounded-full overflow-hidden">
                      <img src={user.avatar} className="max-h-full" alt="" loading="lazy" />
                    </div>
                    <p className="line-clamp-1">{user.name}</p>
                  </td>

                  <td className="px-2.5 py-1.5 font-bold">
                    <p className="line-clamp-1">{user.date}</p>
                  </td>
                  <td className="px-2.5 py-1.5 text-center">
                    <p className="line-clamp-1">{user.totalOrders}</p>
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

export default NewCustomers;
