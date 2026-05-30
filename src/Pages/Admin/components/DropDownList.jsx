import React, { useState, memo } from "react";
import { FaAngleDown } from "react-icons/fa6";

const DropDownList = ({ list, currentSelect, optionFun, listType }) => {
  const items = listType
    ? [{ name: `All ${listType}`, id: list.length }, ...list]
    : list;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="drop-down-list min-w-25 gap-3! border border-border grow!"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <p>{currentSelect}</p>
      <FaAngleDown />
      {isOpen && (
        <div className="options max-h-24 overflow-y-auto fade-in-animate">
          {items.map((item) => {
            return (
              <span
                className=" text-xs!"
                onClick={() =>
                  optionFun({
                    title: item.name,
                    type: item.name.toLowerCase().split(" ").join("-"),
                  })
                }
                key={item.id}
              >
                {item.name}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default React.memo(DropDownList);
