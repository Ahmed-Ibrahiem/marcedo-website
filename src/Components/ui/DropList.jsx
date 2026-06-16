import React, { useRef, useState } from "react";
import useOutside_click from "../../Hooks/Outside_click";
import { FaAngleDown } from "react-icons/fa6";

const DropList = ({
  options,
  optionFun,
  currentSelect,
  listName,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useOutside_click(menuRef, () => setIsOpen(false));

  return (
    <>
      <div
        ref={menuRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="border border-border p-2.5 flex-start-col gap-1.5 w-full relative cursor-pointer"
      >
        {listName && <h3 className="font-semibold ">{listName}</h3>}
        <div className={contianerStyle}>
          <p>{currentSelect}</p>
          <FaAngleDown className={`${isOpen ? "-rotate-90!" : ""}`} />
          {isOpen && (
            <div className={optionsStyle}>
              {children}
              {options.map((option, index) => {
                return (
                  <span className={spanStyle} onClick={()=> optionFun(option)} key={index}>
                    {option}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const contianerStyle = `
flex-between p-0! shadow-none! min-w-25 gap-5! grow! w-full 
`;

const optionsStyle = `
absolute left-0 top-full p-1.5 flex-start-col max-h-24 overflow-y-auto fade-in-animate z-20 w-full
bg-white shadow-sm border border-border 
`;

const spanStyle = `
p-1.5 hover:bg-orange-lite w-full
`;

export default DropList;
