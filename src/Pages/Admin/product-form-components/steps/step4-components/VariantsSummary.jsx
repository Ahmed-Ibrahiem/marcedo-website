import React from "react";
import { IoLayersOutline, IoPricetagOutline } from "react-icons/io5";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaPercent } from "react-icons/fa";

const VariantsSummary = ({ variants, containerStyle }) => {
  const totalStock = variants.reduce((acc, item) => acc + item.stock, 0);
  const priceRange = {
    min: Math.min(...variants.map((v) => v.price)),
    max: Math.max(...variants.map((v) => v.price)),
  };

  const discountRange = {
    min: Math.min(...variants.map((v) => v.discount_percentage)),
    max: Math.max(...variants.map((v) => v.discount_percentage)),
  };

  const summaryData = [
    {
      value: variants.length,
      title: "Variants Count",
      icon: <HiOutlineSquares2X2 size={25} />,
      color: "#1285fe",
    },
    {
      value: totalStock,
      title: "Total Stock",
      icon: <IoLayersOutline size={25} />,
      color: "#8c47d5",
    },
    {
      value:
        priceRange.max === priceRange.min
          ? `$${priceRange.max}`
          : `$${priceRange.min} - $${priceRange.max}`,
      title: "Final Price Range",
      icon: <IoPricetagOutline size={25} />,
      color: "#08721b",
    },
    {
      value:
        discountRange.max === discountRange.min
          ? `${discountRange.max}%`
          : `${discountRange.min}% - ${discountRange.max}%`,
      title: "Discount Range",
      icon: <FaPercent />,
      color: "#fda80b",
    },
  ];

  return (
    <div
      className={`w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-white rounded-sm shadow-sm p-5 ${containerStyle || ""}`}
    >
      {summaryData.map((data, index) => {
        return (
          <div
            key={data.title}
            className={`card w-full flex-start gap-4 text-sm sm:border-r border-border
              ${index === summaryData.length - 3 ? "max-lg:border-r-0! " : ""}
             ${index === summaryData.length - 1 ? "border-r-0! " : ""}`}
          >
            <div
              className="icon-box w-14 h-14 rounded-full  flex-center text-xl"
              style={{ background: `${data.color}20`, color: data.color }}
            >
              {data.icon}
            </div>
            {/* info */}
            <div className="flex-start-col">
              <h4 className="text-gray text-sm ">{data.title}</h4>
              <p>
                <strong className="text-lg">{data.value}</strong>{" "}
                {data.title === "Total Stock"
                  ? "Pieces"
                  : data.title === "Variants Count"
                    ? "Variants"
                    : ""}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VariantsSummary;
