import {
  FaDollarSign,
  FaCube,
  FaRegUser,
  FaArrowUpLong,
} from "react-icons/fa6";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { HiOutlineCube } from "react-icons/hi";
import LineChart from "../../../Components/ui/LineChart";
import { useState } from "react";
import DashboardHead from "./DashboardHead";
import { FaArrowUp } from "react-icons/fa";

const StatsCards = ({ cards, cardsStyle, style, cardStyle, timePeriod }) => {
  return (
    <>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 w-full fade-in-animate ${style || ""}`}
      >
        {cards.map((data, index) => {
          return (
            <div
              className={`flex-start-col gap-2.5 p-4 relative rounded-md ${cardStyle || ""}`}
              key={index}
              style={{ background: `${cardsStyle[index]?.color}1A` }}
            >
              {/* card info */}
              <div className="top flex items-center gap-2.5">
                <div
                  className={`w-10.5 h-10.5 rounded-full flex-center text-lg text-white`}
                  style={{ background: cardsStyle[index]?.color }}
                >
                  {cardsStyle[index]?.icon}
                </div>
                <div className="flex-start-col">
                  <h1 className="text-xs text-gray ">{data.title}</h1>
                  <p className="font-bold text-lg text-danger">{data.value}</p>
                </div>
              </div>
              {/* avarage */}
              <div className="flex items-end gap-1.5 text-xs text-gray">
                <span className="text-green font-bold">
                  <FaArrowUpLong /> {data.change}
                </span>
                <p>vs last {timePeriod.key}</p>
              </div>

              <div className="absolute bottom-2.5 right-2.5 w-[25%]! xl:w-[30%]! max-h-[70%] overflow-hidden">
                <LineChart color={cardsStyle[index]?.color} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default StatsCards;
