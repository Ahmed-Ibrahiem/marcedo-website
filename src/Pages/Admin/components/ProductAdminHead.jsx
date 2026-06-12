import { MdOutlineFileDownload } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { BiExport } from "react-icons/bi";
import React, { memo } from "react";
import { Link } from "react-router-dom";

const ProductAdminHead = ({
  handleExportSelectedProducts,
  handleExportFilterProducts,
}) => {
  return (
    <div className="head flex-between gap-7 w-full flex-wrap fade-in-animate z-100">
      <h1 className="font-bold text-black-lite text-lg ">Products</h1>
      <div className="product-actions w-full sm:w-fit flex-wrap flex-start gap-5">
        {/* Download btn */}
        <div className="relative group">
          <span className={hintStyle}>Export All Products</span>
          <button
            className={`${btnStyleOne}`}
            onClick={() => handleExportFilterProducts()}
          >
            <MdOutlineFileDownload size={20} />
            <p>Download</p>
          </button>
        </div>
        {/* Export btn */}
        <div className="relative group">
          <span className={hintStyle}>Export Selected Products</span>
          <button
            onClick={() => handleExportSelectedProducts()}
            className={`${btnStyleOne} `}
          >
            <BiExport size={20} />
            <span>Export</span>
          </button>
        </div>
        {/* Add New Product */}
        <Link
          to={"/admin/products/add_new_product"}
          className={`${btnStyleTwo} `}
        >
          <FaPlus />
          <span>Add Product</span>
        </Link>
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

const hintStyle = `
absolute bg-white p-1.5 rounded-sm top-[calc(100%+7.5px)] left-[50%]
translate-x-[-50%] m-auto text-nowrap text-xs font-bold border border-gray-300
before:absolute before:translate-x-[-50%] before:left-[50%] before:w-2.5 before:h-2.5
before:bg-white before:-top-1! before:rotate-45 opacity-0 invisible group-hover:opacity-100 group-hover:visible 
`;
export default React.memo(ProductAdminHead);
