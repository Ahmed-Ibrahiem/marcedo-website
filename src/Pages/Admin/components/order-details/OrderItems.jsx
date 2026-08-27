import SectionWrapper from "./SectionWrapper";
import { BsCart3 } from "react-icons/bs";

const OrderItems = ({ items, totalPrice }) => {
  return (
    <SectionWrapper
      icon={<BsCart3 />}
      title={`Items (${items.length})`}
      sectionStyle={"h-full"}
    >
      <div className="w-full max-w-full overflow-x-auto">
        <div className="w-full flex-start-col min-w-150">
          <ul className="grid grid-cols-6 w-full gap-1.5 text-sm font-semibold p-1.5 bg-gray-100 border-y border-border">
            <li className="col-span-3">Product</li>
            <li className="text-center">Price</li>
            <li className="text-center">Qty</li>
            <li className="text-center">Total</li>
          </ul>
          <div className="w-full flex-start-col max-h-20 overflow-auto ">
            {items.map((item, index) => (
              <ul
                key={index}
                className={`grid grid-cols-6 w-full gap-1.5 text-sm py-2.5 border-b border-border ${index + 1 === items.length ? "border-0!" : ""}`}
              >
                <li className="col-span-3">
                  <div className="flex-start items-start! gap-1.5">
                    <div className="min-w-15 max-w-15 max-h-15 w-15 h-15 min-h-15 rounded-sm bg-gray-100 flex-center">
                      <img
                        src={item.thumbnail}
                        className="max-w-[80%] max-h-[80%]"
                        alt=""
                      />
                    </div>
                    <div className="flex-start-col items-start! gap-0.5 text-xs">
                      <p className="font-semibold line-clamp-1">{item.name}</p>
                      {item.attributes && (
                        <p className="text-gray">
                          {Object.values(item.attributes).join(" - ")}
                        </p>
                      )}
                      <p className="text-gray">SKU: {item.sku}</p>
                    </div>
                  </div>
                </li>
                <li className="text-center flex-center font-semibold">
                  {item.price} {item.currency}
                </li>
                <li className="text-center flex-center font-semibold">
                  {item.quantity}
                </li>
                <li className="text-center flex-center font-semibold">
                  {totalPrice} EGP
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default OrderItems;
