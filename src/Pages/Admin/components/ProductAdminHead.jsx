import { MdOutlineFileDownload } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { BiExport } from "react-icons/bi";
import React, { memo } from "react";

const ProductAdminHead = () => {
  return (
    <div className="head flex-between gap-7 w-full flex-wrap fade-in-animate">
      <h1 className="font-bold text-black-lite text-lg ">Products</h1>
      <div className="product-actions w-full sm:w-fit flex-start gap-5">
        {/* Download btn */}
        <button className={`${btnStyleOne}`}>
          <MdOutlineFileDownload size={20} />
          <span>Download</span>
        </button>
        {/* Export btn */}
        <button className={`${btnStyleOne}`}>
          <BiExport size={20} />
          <span>Export</span>
        </button>
        {/* Add New Product */}
        <button className={`${btnStyleTwo} `}>
          <FaPlus />
          <span>Add Product</span>
        </button>
      </div>
    </div>
  );
};

const btnStyleOne = `
px-3 py-2 border border-border rounded-sm flex-center gap-1.5 bg-white text-xs font-semibold
hover:scale-[1.05] shadow-sm hover:shadow-md grow sm:grow-0
`;

const btnStyleTwo = `
${btnStyleOne} border-orange! bg-orange! text-white! hover:shadow-[0_0_10px_10px_var(--color-orange-lite)]!
`;

export default React.memo(ProductAdminHead);
