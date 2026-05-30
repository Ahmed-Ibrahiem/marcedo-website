import React from "react";

const TopSellingProducts = () => {
  const mokeData = [
    {
      id: 1,
      name: "Apple iPhone 15 (128GB)",
      sold: 120,
      revenue: 4391880,
      image: "/assets/products image/iphone 14.png",
    },
    {
      id: 2,
      name: "Apple Watch Series 8",
      sold: 85,
      revenue: 934915,
      image: "/assets/products image/lap top.png",
    },
    {
      id: 3,
      name: "AirPods Pro (2nd Gen)",
      sold: 64,
      revenue: 339136,
      image: "/assets/products image/perfume 2.png",
    },
  ];

  return (
    <div className="bg-white rounded-lg max-h-57.5 border border-gray-100  grow flex flex-col  overflow-hidden max-w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-2.5">
        <h2 className="text-base font-semibold text-gray-800">
          Top Selling Products
        </h2>
        <button className="view_all text-xs text-orange font-bold">
          View All (10)
        </button>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="md:min-w-fit w-full">
          <thead className="bg-gray-light font-bold text-xs ">
            <tr>
              <th className="p-1.5 text-start px-2.5">Product</th>
              <th className="p-1.5 text-start px-2.5">Sold</th>
              <th className="p-1.5 text-start px-2.5">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {mokeData.map((pro) => {
              return (
                <tr key={pro.id} className="border-t border-border text-xs">
                  <td className="px-2.5 py-1.5 flex items-center gap-5 font-bold">
                    <div className="w-7 h-7 bg-gray-light rounded-xs flex-center">
                      <img src={pro.image} className="max-h-[90%]" alt="" />
                    </div>
                    <p className="line-clamp-1">{pro.name}</p>
                  </td>

                  <td className="px-2.5 py-1.5 font-bold">{pro.sold}</td>
                  <td className="px-2.5 py-1.5">
                    <p className="line-clamp-1">EGP {pro.revenue}</p>
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

export default TopSellingProducts;
