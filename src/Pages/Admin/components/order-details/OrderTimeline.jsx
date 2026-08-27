import { formateTimestampToDateAndTime } from "../../../../Utils/Format_date";
import SectionWrapper from "./SectionWrapper";
import { FaCheck, FaRegClock, FaXmark } from "react-icons/fa6";

const OrderTimeline = ({ order }) => {
  const timeLine = order.timeline;

  const status = [
    "pending",
    "processing",
    "shipping",
    "delivered",
    "cancelled",
  ];

  return (
    <SectionWrapper
      icon={<FaRegClock />}
      title={"Order Timeline"}
      sectionStyle={"grow"}
    >
      <ul className="text-sm w-full flex-start-col gap-2">
        {status.map((st) => {
          const statusTimeline = timeLine?.[st];
          const statusDate = statusTimeline
            ? formateTimestampToDateAndTime(statusTimeline)
            : null;
          return (
            <li key={st} className="flex-between gap-5 w-full">
              <div className="flex-start gap-2.5">
                <div
                  className={`w-5 h-5 flex-center rounded-sm
                    ${
                      statusTimeline
                        ? "text-white! bg-orange"
                        : "text-gray bg-gray-100"
                    }`}
                >
                  {statusTimeline ? <FaCheck /> : <FaXmark />}
                </div>
                <p
                  className={`capitalize ${statusTimeline ? "text-orange font-semibold" : "text-gray"}`}
                >
                  {st}
                </p>
              </div>
              {statusTimeline ? (
                <div className="flex flex-col text-end text-xs">
                  <p>{statusDate.date}</p>
                  <p className="text-gray">{statusDate.time}</p>
                </div>
              ) : (
                <p>-</p>
              )}
            </li>
          );
        })}
      </ul>
    </SectionWrapper>
  );
};

export default OrderTimeline;
