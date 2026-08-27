import React, { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { LuCheck, LuCopy, LuReceipt } from "react-icons/lu";
import { toast } from "react-toastify";
import Success_Toast from "../../../../Components/ui/confirm-message/Success_Toast";

const OrderSummery = ({ pricing, orderId, wantsEmailUpdates }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      toast(<Success_Toast message={"Order Id Was Successfully Copied!"} />);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copied Error: ", error);
    }
  };

  return (
    <SectionWrapper icon={<LuReceipt />} title={"Order Summery"}>
      <ul className="pb-2.5 border-b border-border flex-start-col gap-1.5 w-full text-sm">
        <li className="flex-between gap-5 w-full">
          <p className="text-gray">Subtotal</p>
          <span className="font-semibold">{pricing.subtotal} EGP</span>
        </li>
        <li className="flex-between gap-5 w-full">
          <p className="text-gray">Shipping</p>
          <span className="font-semibold">{pricing.shipping_cost} EGP</span>
        </li>
        <li className="flex-between gap-5 w-full">
          <p className="text-gray">Discount</p>
          <span className="text-orange font-semibold">
            {pricing.discount ? `-${pricing.discount}` : "0"} EGP
          </span>
        </li>
      </ul>
      <div className="pb-2.5 border-b border-border flex-between gap-1.5 w-full text-sm font-semibold">
        <p>Total</p>
        <span className="text-lg">{Math.round(+pricing.total)} EGP</span>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 w-full py-2.5 text-sm">
        <div className="flex-start-col gap-2.5 pr-2.5 border-b max-xs:pb-2.5 xs:border-b-0 xs:border-r border-border">
          <h3 className="text-gray">Order Id</h3>
          <div className="flex-start gap-2.5 font-semibold">
            <p className="line-clamp-1 break-all">#{orderId}</p>
            <button onClick={handleCopy}>
              {copied ? <LuCheck color="green" /> : <LuCopy />}
            </button>
          </div>
        
        </div>
        <div className="flex-start-col gap-2.5 max-xs:pt-2.5 xs:pl-2.5">
            <h3 className="text-gray">Wants Email Update</h3>
            <p className="font-semibold">{wantsEmailUpdates ? "Yes" : "No"}</p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default OrderSummery;
