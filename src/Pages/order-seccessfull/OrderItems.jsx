import React from "react";

const OrderItems = ({ items }) => {
  return (
    <div className=" border border-border rounded-sm p-2.5 flex-start-col gap-5 w-full">
      <h1 className="font-semibold">Items ({items.length})</h1>
      <div className="grid grid-cols-1 w-full gap-2.5">
        {items.map((item, index) => {
          return (
            <div key={index} className="flex-start gap-3.5 w-full">
              <div className="img-box min-w-15 min-h-15 w-18 h-18 md:min-w-20 md:min-h-20 md:w-20 md:h-20 flex-center bg-gray-200 rounded-sm relative">
                <img
                  src={item.thumbnail}
                  className="max-w-[80%] max-h-[80%]"
                  alt={item.name}
                />
                <div className="min-w-5 min-h-5 text-sm bg-black rounded-sm text-white flex-center absolute -top-1.5 -right-1.5">
                  {item.quantity}
                </div>
              </div>
              <div className="flex-start-col justify-start! h-full gap-1.5 relative grow ">
                <h3 className="text-xs text-start font-semibold line-clamp-1 max-w-full">
                  {item.name}
                </h3>
                {item.attributes && (
                  <p className="text-gray text-xs text-start">
                    {Object.values(item.attributes).join(" - ")}
                  </p>
                )}
                <p className="text-xs">
                  Price:{" "}
                  <span className="text-orange text-sm font-semibold">
                    {item.price}
                  </span>{" "}
                  {item.currency}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderItems;
