import React, { useState } from "react";
import { FaAngleUp } from "react-icons/fa6";

const DynamicOptionsSection = ({ option }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <div
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="w-full flex-between gap-2.5 cursor-pointer"
      >
        <h1 className="capitalize text-2xl ">{option.key}</h1>
        <FaAngleUp className={isMenuOpen ? "rotate-180" : ""} />
      </div>
      <ul
        className={`flex-start-col gap-2.5 my-5 overflow-y-hidden`}
        style={{ maxHeight: isMenuOpen ? "320px" : "0" }}
      >
        {option.key === "color" ? (
          <ColorOptions option={option} />
        ) : (
          <AntherOptions option={option} />
        )}
      </ul>
    </div>
  );
};

const ColorOptions = ({ option }) => {
  return (
    <>
      {option.values.map((value, index) => {
        return (
          <li key={index} className="flex-start gap-2.5 cursor-pointer ">
            <input
              type="checkbox"
              style={{ "--bg-color": value.hex }}
              className="color_options w-6.5! h-6.5! "
              id={value.label}
            />
            <label className="grow" htmlFor={value.label}>
              {value.label}
            </label>
          </li>
        );
      })}
    </>
  );
};

const AntherOptions = ({ option }) => {
  return (
    <>
      {option.values.map((value, index) => {
        return (
          <li key={index} className="flex-start gap-2.5">
            <input type="checkbox" className="checkbox" id={value} />
            <label className="text-sm grow cursor-pointer" htmlFor={value}>
              {value}
            </label>
          </li>
        );
      })}
    </>
  );
};

export default DynamicOptionsSection;
