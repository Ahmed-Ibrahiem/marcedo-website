import React, { useState, memo, useRef } from "react";
import { FaAngleDown } from "react-icons/fa6";
import useOutside_click from "../../../Hooks/Outside_click";

const DropDownList = ({
  list,
  currentSelect,
  optionFun,
  listType,
  listStyle,
  children,
}) => {
  const items = listType
    ? [
        {
          name: `All ${listType}`,
          id: `All ${listType}`.toLowerCase().split(" ").join("-"),
        },
        ...list,
      ]
    : list;
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useOutside_click(menuRef, () => setIsOpen(false));

  return (
    <div
      className={`drop-down-list min-w-25 gap-5! border border-border grow! relative ${listStyle || ""}`}
      onClick={() => setIsOpen((prev) => !prev)}
      ref={menuRef}
    >
      <p>{currentSelect}</p>
      <FaAngleDown className={`${isOpen ? "-rotate-90!" : ""}`} />
      {isOpen && (
        <div className="options cursor-auto! h-25 max-h-25 overflow-y-auto fade-in-animate z-10 ">
          {children}
          <div className="flex-start-col absolute inset-0 p-1.5 cursor-pointer w-[70%]">
            {items.map((item) => {
              return (
                <span
                  className=" text-xs! w-full"
                  onClick={() => {
                    if (optionFun) optionFun({ name: item.name, id: item.id });
                  }}
                  key={item.id}
                >
                  {item.name}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(DropDownList);
