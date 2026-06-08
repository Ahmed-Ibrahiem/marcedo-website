import React from "react";
import { FaTrash } from "react-icons/fa";
import { MdPublish } from "react-icons/md";
import { TiExport } from "react-icons/ti";

const SelectedProductsContorls = ({ exportProductsToExcel }) => {
  return (
    <div className="flex-start gap-2.5 lg:absolute lg:left-[50%] lg:translate-x-[-50%] bottom-2.5 fade-in-animate">
      <div className="relative group">
        <p className={`${hintStyle} group-hover:opacity-100 `}>
          delete Products
        </p>
        <button className={actionBtnSytle}>
          <FaTrash />
        </button>
      </div>
      <div className="relative group">
        <p className={`${hintStyle} group-hover:opacity-100`}>
          Publish Products
        </p>
        <button className={actionBtnSytle}>
          <MdPublish size={20} />
        </button>
      </div>
    </div>
  );
};

const actionBtnSytle = `
w-8 h-8 rounded-sm flex-center bg-orange-lite text-black-lite 
hover:bg-orange hover:text-white 
`;

const hintStyle = `
absolute bg-gray-200 p-1.5 rounded-sm bottom-[calc(100%+7.5px)] left-[50%]
translate-x-[-50%] m-auto text-nowrap text-xs font-bold border border-gray-300
before:absolute before:translate-x-[-50%] before:left-[50%] before:w-2.5 before:h-2.5
before:bg-gray-200 before:-bottom-1! before:rotate-45 opacity-0 invisible group-hover:visible
`;

export default SelectedProductsContorls;
