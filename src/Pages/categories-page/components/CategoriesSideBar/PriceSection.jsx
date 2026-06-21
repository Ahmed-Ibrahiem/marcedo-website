import React, { memo, useEffect, useRef, useState } from "react";
import { FaAngleUp } from "react-icons/fa6";

const PriceSection = ({ min, max, setActiveFilters }) => {
  const [is_menu_open, set_is_menu_open] = useState(false);
  const [min_price, set_min_price] = useState(0);
  const [max_price, set_max_price] = useState(max);
  const [progress_info, set_progress_width] = useState({ left: 0, width: 100 });
  const progress_ref = useRef(null);

  const update_progress_UI = () => {
    const left = Math.ceil((min_price / max) * 100);
    const diff = max_price - min_price;
    const width = Math.round((diff / max) * 100);
    set_progress_width((prev) => ({ ...prev, left, width }));
  };

  useEffect(() => {
    update_progress_UI();
    if (!progress_ref.current) return;
    if (+min_price > +max_price) {
      progress_ref.current.style.width = "0%";
    }

    setActiveFilters((prev) => ({
      ...prev,
      price: {
        min: min_price,
        max: max_price,
      },
    }));
  }, [min_price, max_price]);

  return (
    <div className="flex flex-col w-full relative border-b border-border flex-wrap">
      {/* Title */}
      <div
        className="flex items-center justify-between w-full cursor-pointer"
        onClick={() => set_is_menu_open(!is_menu_open)}
      >
        <h2 className="text-2xl font-normal">Price</h2>
        <FaAngleUp
          className="transition-all duration-[0.6s]"
          style={{ rotate: is_menu_open ? "180deg" : "0deg" }}
        />
      </div>

      {/* Collapsible content */}
      <div
        className="w-full flex flex-col overflow-hidden transition-all duration-[0.6s] my-5"
        style={{ maxHeight: is_menu_open ? "250px" : "0px" }}
      >
        <div className="py-5">
          {/* Range slider track */}
          <div className="relative w-full h-1 bg-gray-light">
            {/* Progress fill */}
            <span
              ref={progress_ref}
              className="h-full rounded-[10px] inline-block absolute top-0 bg-orange"
              style={{
                width: `${progress_info.width}%`,
                left: `${progress_info.left}%`,
                transition: "none",
              }}
            />

            {/* Min range input */}
            <input
              type="range"
              value={min_price}
              max={max}
              onChange={(e) => set_min_price(+e.target.value)}
              className={minRangeStyle}
            />

            {/* Max range input */}
            <input
              type="range"
              value={max_price}
              max={max}
              onChange={(e) => set_max_price(+e.target.value)}
              className={maxRangeStyle}
            />
          </div>

          {/* Price inputs */}
          <div className="w-full mt-5 flex items-center justify-between text-gray text-sm gap-5">
            {/* Min field */}
            <div className="rounded-sm border border-gray-light flex-center gap-2.5 relative overflow-hidden">
              <span className="absolute top-1/2 -translate-y-1/2 left-2.5">
                $
              </span>
              <input
                type="number"
                value={min_price}
                onChange={(e) => set_min_price(+e.target.value)}
                className="max-w-full py-3.75 px-6.25 border-none outline-none text-gray"
              />
            </div>

            <i className="fa-solid fa-angle-right" />

            {/* Max field */}
            <div className="rounded-[5px] border border-gray-light flex-center gap-2.5 relative overflow-hidden">
              <span className="absolute top-1/2 -translate-y-1/2 left-2.5">
                $
              </span>
              <input
                type="number"
                value={max_price}
                onChange={(e) => {
                  set_max_price(+e.target.value);
                  if (+e.target.value > max) set_max_price(max);
                }}
                className="max-w-full py-3.75 px-6.25 border-none outline-none text-gray"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const maxRangeStyle = `
absolute w-full h-1.5 top-0 left-0
appearance-none bg-transparent pointer-events-none
[&::-webkit-slider-thumb]:appearance-none
[&::-webkit-slider-thumb]:bg-[#ecf8ff]
[&::-webkit-slider-thumb]:border-2
[&::-webkit-slider-thumb]:border-[#8dd9fc]
[&::-webkit-slider-thumb]:w-3.5
[&::-webkit-slider-thumb]:h-3.5
[&::-webkit-slider-thumb]:rounded-full
[&::-webkit-slider-thumb]:cursor-pointer
[&::-webkit-slider-thumb]:pointer-events-auto
`;

const minRangeStyle = `
absolute w-full h-1.5 top-0 left-0
appearance-none bg-transparent pointer-events-none
[&::-webkit-slider-thumb]:appearance-none
[&::-webkit-slider-thumb]:bg-[#ecf8ff]
[&::-webkit-slider-thumb]:border-2
[&::-webkit-slider-thumb]:border-[#8dd9fc]
[&::-webkit-slider-thumb]:w-3.5
[&::-webkit-slider-thumb]:h-3.5
[&::-webkit-slider-thumb]:rounded-full
[&::-webkit-slider-thumb]:pointer-events-auto
[&::-webkit-slider-thumb]:cursor-pointer
`;
export default React.memo(PriceSection);
