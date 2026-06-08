import React, { useState, memo, useRef } from "react";
import { FaAngleDown } from "react-icons/fa6";
import useOutside_click from "../../../Hooks/Outside_click";

const DropDownList = ({ list, currentSelect, optionFun, listType }) => {
  const items = listType
    ? [{ name: `All ${listType}`, id: list.length + 1 }, ...list]
    : list;
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useOutside_click(menuRef, () => setIsOpen(false));

  return (
    <div
      className="drop-down-list min-w-25 gap-5! border border-border grow! relative "
      onClick={() => setIsOpen((prev) => !prev)}
      ref={menuRef}
    >
      <p>{currentSelect}</p>
      <FaAngleDown className={`${isOpen ? "-rotate-90!" : ""}`} />
      {isOpen && (
        <div className="options max-h-24 overflow-y-auto fade-in-animate z-10">
          {items.map((item) => {
            return (
              <span
                className=" text-xs!"
                onClick={() =>
                  optionFun({
                    title: item.name,
                    type:
                      item.type || item.name.toLowerCase().split(" ").join("-"),
                    id: item.id,
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
