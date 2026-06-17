import React from "react";

const LowStockProducts = () => {
  const mokeData = [
    {
      id: 1,
      name: "AirPods Pro (2nd Gen)",
      stock: 5,
      image: "/assets/products image/Airpods.png",
    },
    {
      id: 2,
      name: "iSmart 24V Fast Charger",
      stock: 7,
      image: "/assets/products image/smart charger.png",
    },
    {
      id: 3,
      name: "Apple Watch Series 8",
      stock: 8,
      image: "/assets/products image/smart watch.png",
    },
  ];
  return (
    <div className="bg-white rounded-lg max-h-57.5 border border-gray-100 p-3 grow flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5 ">
        <h2 className="text-base font-semibold text-gray-800">
          Low Stock Products
        </h2>
        <button className="view_all text-xs text-orange font-bold">
          View All (10)
        </button>
      </div>
      <div className="products flex-start-col w-full  ">
        {mokeData.map((pro) => {
          return (
            <div
              key={pro.id}
              className="flex-start gap-5 border-t border-border py-2.5 w-full"
            >
              <div className="img-box w-10 h-10 rounded-sm flex-center overflow-hidden bg-gray-light">
                <img src={pro.image} className="max-w-[85%] " alt="" loading="lazy"/>
              </div>
              <div className="text-xs">
                <h1 className="font-bold">{pro.name}</h1>
                <p className="text-gray">
                  Stock:{" "}
                  <span className="text-orange font-bold">{pro.stock}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LowStockProducts;
