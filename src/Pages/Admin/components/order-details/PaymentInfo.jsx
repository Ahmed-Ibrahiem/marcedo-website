import SectionWrapper from "./SectionWrapper";
import { FaRegCreditCard } from "react-icons/fa6";

const PaymentInfo = ({ payment }) => {
  return (
    <SectionWrapper icon={<FaRegCreditCard />} title={"Payment Information"}>
      <div className="flex-between w-full gap-5 text-sm">
        <p className="text-gray">Method</p>
        <span className="capitalize font-semibold">
          {payment.method.split("_").join(" ")}
        </span>
      </div>
      <div className="flex-between w-full gap-5 text-sm">
        <p className="text-gray">Payment Status</p>
        <span
          className={`font-semibold p-1.5 rounded-sm  ${payment.method === "credit_card" ? "bg-green-100 text-green-500" : "bg-orange-100 text-orange"}`}
        >
          {payment.method === "credit_card" ? "Paid" : "Pending"}
        </span>
      </div>
      <div className="flex-between w-full gap-5 text-sm">
        <p className="text-gray">Paid</p>
        <span className="capitalize font-semibold">
          {payment.method === "credit_card" ? payment.paid : "--"}
        </span>
      </div>
    </SectionWrapper>
  );
};

export default PaymentInfo;
