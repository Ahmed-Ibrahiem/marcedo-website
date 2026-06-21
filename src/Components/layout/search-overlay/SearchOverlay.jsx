import { FaMagnifyingGlass, FaSellcast, FaXmark } from "react-icons/fa6";
import React, { memo, useEffect, useRef, useState } from "react";
import { getProductsByName } from "../../../services/ProductsServices";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SearchOverlay = ({ isSearchOverlayOpen, setIsSearchOverlayOpen }) => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isSearchOverlayOpen) searchInputRef.current.focus();
    else searchInputRef.current.blur();
  }, [isSearchOverlayOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!debounceQuery) return;
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const products = await getProductsByName(debounceQuery);
        setResult(products);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, [debounceQuery]);

  return (
    <div
      className={` w-full h-full fixed duration-700! ease-out bg-black/70 z-50 flex justify-center p-2.5 py-20 items-start sm:items-center ${
        isSearchOverlayOpen ? "top-0 left-0 " : "-top-full delay-700!"
      }`}
    >
      <div className="relative max-w-full">
        {/* Contnet */}
        <div
          className={`flex items-end max-w-full overflow-hidden!  relative ${isSearchOverlayOpen ? "search-overlay-anim" : "search-overlay-anim-close"}`}
        >
          {/* Close Overlay Btn */}
          <button
            className={`w-13 h-13 min-w-13 min-h-13 rounded-full bg-orange text-white flex-center absolute inset-0 mx-auto hover:text-black hover:bg-orange-lite`}
            onClick={() => {
              setQuery("");
              setDebounceQuery("");
              setIsSearchOverlayOpen(false);
            }}
          >
            <FaXmark size={28} />
          </button>
          {/* Search Container */}
          <div
            className={`flex-between gap-3.5 rounded-sm bg-white relative w-full `}
          >
            {/* Search Input */}
            <input
              ref={searchInputRef}
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              type="text"
              className="p-3.5 outline-none grow "
              placeholder="Enter Your Product Name"
            />
            {/* Search Btn */}
            <button className="flex-center mr-1.5 text-sm bg-orange w-10 h-10 rounded-sm text-white">
              <FaMagnifyingGlass />
            </button>
          </div>
          {/* Result Show */}
        </div>

        {debounceQuery && (
          <div className="w-full flex-start-col max-h-41.5 overflow-y-auto rounded-sm p-2.5 absolute top-[calc(100%+10px)] left-0 bg-white ">
            {result.length > 0 &&
              !isLoading &&
              result.map((data) => {
                return (
                  <Link
                    key={data.id}
                    onClick={() => {
                      setQuery("");
                      setDebounceQuery("");
                      setIsSearchOverlayOpen(false);
                    }}
                    to={`/product_detials/${data.slug}`}
                    className="w-full! hover:bg-orange p-1.5 rounded-sm hover:text-white! text-sm flex-between gap-5"
                  >
                    <div className="flex-start gap-3.5">
                      <div className="w-10 h-10 rounded-sm bg-gray-200 flex-center ">
                        <img
                          src={data.thumbnail}
                          loading="lazy"
                          className="max-w-[90%] max-h-[90%]"
                          alt=""
                        />
                      </div>
                      <p className=" max-w-[80%] line-clamp-1">{data.name}</p>
                    </div>
                    <span>${data.current_price}</span>
                  </Link>
                );
              })}

            {isLoading && (
              <div className="w-full flex-start-col gap-2.5">
                <div className="flex-between w-full">
                  <div className="flex-start gap-2.5">
                    <Skeleton width={35} height={35} />
                    <Skeleton width={150} height={25} />
                  </div>
                  <Skeleton width={60} height={25} />
                </div>
                <div className="flex-between w-full">
                  <div className="flex-start gap-2.5">
                    <Skeleton width={35} height={35} />
                    <Skeleton width={150} height={25} />
                  </div>
                  <Skeleton width={60} height={25} />
                </div>
                <div className="flex-between w-full">
                  <div className="flex-start gap-2.5">
                    <Skeleton width={35} height={35} />
                    <Skeleton width={150} height={25} />
                  </div>
                  <Skeleton width={60} height={25} />
                </div>
              </div>
            )}

            {!isLoading && result.length <= 0 && (
              <div className="w-full text-center">
                <p>----- No Result (enter correct name)-----</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(SearchOverlay);
