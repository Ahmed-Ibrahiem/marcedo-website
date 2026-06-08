import React, { useState, memo, useMemo, useRef, useEffect } from "react";
import { FaAngleDown, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import useOutside_click from "../../../Hooks/Outside_click";
import { getProductsWithPaginations } from "../../../services/ProductsDashboardServices";

const TableControlsBtns = ({ filterProducts, setDisplayProducts }) => {
  const dorpDownListRef = useRef(null);
  const [dropDown, setDropDown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsNumber, setRowsNumber] = useState(5);

  const paginationData = useMemo(() => {
    if (!filterProducts) return [1];
    const packagesNumber = Math.ceil(filterProducts.length / rowsNumber);

    if (packagesNumber <= 5)
      return [
        ...Array(packagesNumber)
          .fill(0)
          .map((_, index) => index + 1),
      ];
    if (packagesNumber > 5) {
      if (currentPage > 3 && currentPage <= packagesNumber - 3)
        return ["dot", currentPage - 1, currentPage, currentPage + 1, "dot"];
      if (currentPage > 3 && currentPage > packagesNumber - 3)
        return [
          1,
          "dot",
          packagesNumber - 2,
          packagesNumber - 1,
          packagesNumber,
        ];
      if (currentPage <= 3) return [1, 2, 3, "dot", packagesNumber];
    }
  }, [currentPage, filterProducts, rowsNumber]);

  useEffect(() => {
    if (!filterProducts) return;
    const end = currentPage * rowsNumber;
    const start = end - rowsNumber;
    const products = [...filterProducts.slice(start, end)];

    setDisplayProducts(products);
  }, [currentPage, rowsNumber, filterProducts]);

  useOutside_click(dorpDownListRef, () => setDropDown(false));

  return (
    <>
      <div
        className="px-2.5 my-5 xl:my-2 flex-between flex-wrap  gap-5
         w-full text-sm relative"
      >
        {/* Rows Number Per Views */}
        <div className="flex-start gap-2.5">
          <p>Rows Per View</p>
          <div
            ref={dorpDownListRef}
            className="flex-center gap-1.5 border border-border rounded-sm p-1.5 w-16.5 relative cursor-pointer"
            onClick={() => setDropDown((prev) => !prev)}
          >
            <span>{rowsNumber}</span>
            <FaAngleDown />
            {dropDown && (
              <div
                className="absolute left-0 bottom-full flex-center-col cursor-pointer
           bg-white p-1.5 rounded-sm w-full border border-border shadow-[0_0_3px_var(--color-gray-50)]"
              >
                {[5, 10, 20, 50].map((number) => {
                  return (
                    <span
                      key={number}
                      className="hover:bg-orange p-1 hover:text-white rounded-sm w-full text-center"
                      onClick={() => {
                        setRowsNumber(number);
                        setCurrentPage(1);
                      }}
                    >
                      {number}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Pagination Controls Btns */}
        <div className="pagination-btns flex-center gap-2.5 ">
          <button
            type="button"
            className={`${btnStyle} ${currentPage <= 1 ? "text-gray! bg-gray-50 cursor-auto!" : ""}`}
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage((prev) => prev - 1);
              }
            }}
          >
            <FaAngleLeft />
          </button>

          {paginationData?.map((btn, index) => {
            if (btn === "dot")
              return (
                <button key={index} className={btnStyle}>
                  <span>...</span>
                </button>
              );

            return (
              <button
                onClick={() => setCurrentPage(btn)}
                key={index}
                className={`${btnStyle} ${currentPage === btn ? "border-orange text-white bg-orange" : ""}`}
              >
                <span>{btn}</span>
              </button>
            );
          })}

          <button
            type="button"
            className={`${btnStyle} ${currentPage >= Math.ceil(filterProducts.length / rowsNumber) ? "text-gray! bg-gray-50 cursor-auto!" : ""}`}
            onClick={() => {
              if (currentPage < Math.ceil(filterProducts.length / rowsNumber)) {
                setCurrentPage((prev) => prev + 1);
              }
            }}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </>
  );
};

const btnStyle = `
w-7.5 h-7.5 rounded-sm border border-border flex-center text-black-lite
`;
export default React.memo(TableControlsBtns);
