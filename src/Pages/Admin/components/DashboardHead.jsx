import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const DashboardHead = ({
  dropDownOpen,
  setDropDownOpen,
  selectedPeriod,
  setPeriod,
}) => {
  const dates = [
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
    { key: "year", label: "This Year" },
  ];

  return (
    <div className="head flex flex-col gap-5 md:flex-row md:justify-between  ">
      <div className="left w-[50%] ">
        <h1 className="text-lg font-bold text-black">Dashboard</h1>
      </div>
      <div
        className="right drop-down-list min-w-32.5!"
        onClick={() => setDropDownOpen((prev) => !prev)}
      >
        <FaCalendarAlt />
        <p className="current_option">{selectedPeriod.label}</p>
        {dropDownOpen && (
          <div className="options fade-in-animate z-40">
            {dates.map((date, index) => {
              return (
                <span key={index} onClick={() => setPeriod(date)}>
                  {date.label}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHead;
