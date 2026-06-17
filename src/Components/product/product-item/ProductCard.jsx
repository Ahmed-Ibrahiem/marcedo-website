import React, { useEffect, useRef, useState, memo } from "react";
import { FaRegHeart, FaStar, FaCartPlus, FaEye } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useFavoriteContext } from "../../../Context/favoriteMenuContext";
import { useCartContext } from "../../../Context/CartMenuContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuickViewPopupContext } from "../../../Context/QuickViewPopupsProvider";
import DropDownList from "../../../Pages/Admin/components/DropDownList";
import { FaXmark } from "react-icons/fa6";
import { getProductVariants } from "../../../services/productDetailsServices";
import DropList from "../../ui/DropList";
import useOutside_click from "../../../Hooks/Outside_click";
import useProductVariants from "../../../Hooks/useProductVariants";

const ProductCard = ({ product, cardHeight }) => {
  const { handleFavoriteItems, favoriteItems } = useFavoriteContext();
  const { addItem } = useCartContext();
  const [imageLoaded, setImageLoaded] = useState(false);
  const { setIsQuickViewOpen, setProductData } = useQuickViewPopupContext();
  const [proVariants, setProVariants] = useState(null);
  const [isOptionsShow, setIsOptionsShow] = useState(false);
  const varaintRef = useRef(null);

  const {
    selectedOptions,
    setSeletedOptions,
    getDefaultOptions,
    getSelectedVariants,
  } = useProductVariants({ proVariants });

  const handleQuickViewClick = () => {
    setProductData(product);
    setIsQuickViewOpen(true);
  };

  useEffect(() => {
    const getVariants = async () => {
      const variants = await getProductVariants(product.id);
      if (variants) setProVariants(variants);
    };
    getVariants();
  }, [product]);

  useEffect(() => {
    getDefaultOptions();
  }, [proVariants]);

  const addToCart = () => {
    if (proVariants) {
      const variants = getSelectedVariants();
      const data = {
        ...product,
        variants,
      };

      addItem(data);
      setIsOptionsShow(false);
    }
  };

  useOutside_click(varaintRef, () => setIsOptionsShow(false));

  return (
    <div ref={varaintRef} className="product-card h-fit w-full relative ">
      {/* Card top */}
      <div className="relative">
        <div className={cardTopStyle}>
          {/* Image Container */}
          <Link
            to={`/product_detials/${product.slug}`}
            className={`flex-center relative bg-gray-light pt-[124%] rounded-md ${cardHeight || ""}`}
            href=""
          >
            {!imageLoaded && (
              <div
                style={{ height: "80%", width: "80%" }}
                className="absolute inset-0 m-auto"
              >
                <Skeleton height="100%" width="100%" />
              </div>
            )}
            <img
              className={proImageStyle}
              alt={`The Image Of Product ${product.id}`}
              style={{ opacity: imageLoaded ? 1 : 0 }}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              src={product.thumbnail}
            />
          </Link>

          {/* Cart btn */}
          <button
            type="button"
            onClick={() => {
              if (proVariants) {
                setIsOptionsShow(true);
              } else {
                addItem(product); // add and remove from cartItems menu
              }
            }}
            className={`${cartBtnStyle} group/btn`}
          >
            <div className="w-full h-full rounded-full relative z-5 bg-black-lite hover:bg-orange flex-center  ">
              <IoCart />
              <span className={spanStyle}>Quick Add</span>
            </div>
          </button>

          {/* Side Btns */}
          <div className="flex-center-col gap-3  absolute top-0 right-0 p-2.5">
            {/* Wishlist btn */}
            <div className={btnContainerStyle}>
              <button
                onClick={() => {
                  handleFavoriteItems(product);
                }} // add to favorite menu
                className={`${btnStyle} ${favoriteItems.find((pro) => pro.id === product.id) ? "bg-orange! text-white!" : ""}`}
              >
                <FaRegHeart />
              </button>
              <span className={spanStyle}>
                {favoriteItems.find((pro) => pro.id === product.id)
                  ? "Remove Wislist"
                  : "Add to wishlist"}
              </span>
            </div>

            {/* Quick View btn */}
            <div onClick={handleQuickViewClick} className={btnContainerStyle}>
              <button className={btnStyle}>
                <FaEye />
              </button>
              <span className={spanStyle}>Quick view</span>
            </div>
          </div>
        </div>

        {/* Variants Part */}
        {proVariants && (
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${variantContainerStyle} ${isOptionsShow ? "opacity-100 visible" : "opacity-0 invisible"}`}
          >
            <div className="flex-between gap-5 mb-2.5">
              <h4 className="uppercase font-bold ">Select Options</h4>
              <button onClick={() => setIsOptionsShow(false)}>
                <FaXmark />
              </button>
            </div>
            {/* Options */}
            <div className="flex-start-col gap-2.5 w-full">
              {selectedOptions &&
                proVariants.options.map((opt) => {
                  return opt.key === "color" ? (
                    <DropList
                      key={opt.key}
                      options={opt.values.map((value) => value.label)}
                      currentSelect={selectedOptions[opt.key]}
                      listName={"Color"}
                      optionFun={(option) =>
                        setSeletedOptions({ ...selectedOptions, color: option })
                      }
                    />
                  ) : (
                    <DropList
                      key={opt.key}
                      options={opt.values}
                      currentSelect={selectedOptions[opt.key]}
                      listName={opt.key}
                      optionFun={(option) =>
                        setSeletedOptions({
                          ...selectedOptions,
                          [opt.key]: option,
                        })
                      }
                    />
                  );
                })}
            </div>
            {/* Add Cart Btn */}
            <button
              onClick={() => {
                console.log("yes");
                addToCart();
              }}
              className="w-full bg-orange-lite hover:bg-orange hover:text-white p-2.5 text-sm font-bold mt-2.5"
            >
              add to cart
            </button>
          </div>
        )}
      </div>

      {/* Cart bottom */}
      <div className="w-full flex-start-col gap-2.5 mt-5">
        <div className="flex-start gap-1 text-gray/45">
          {Array(5)
            .fill(0)
            .map((_, index) => {
              return (
                <FaStar
                  key={index}
                  className={`${index + 1 <= product.rating_average ? "text-amber-400!" : ""}`}
                />
              );
            })}
        </div>
        <Link>
          {" "}
          <h2 className="text-sm hover:text-orange line-clamp-2 leading-6">
            {product.name}
          </h2>
        </Link>
        <p className="text-sm font-semibold">${product.current_price}</p>
      </div>
    </div>
  );
};

const cardTopStyle = `
product-top w-full overflow-hidden relative group/top
`;

const proImageStyle = `
absolute inset-0 m-auto max-w-[65%] group-hover/top:max-w-[75%] object-contain h-[90%]
`;

const cartBtnStyle = `
cart-btn rounded-full bg-black-lite! text-2xl flex-center text-white hover:bg-orange! outline-[7.5px]!
outline-white! outline-solid! w-12.5 xs:w-10 h-12.5 xs:h-10 lg:w-12.5 lg:h-12.5 absolute right-0 bottom-0 z-10 add-cart-btn lg:translate-x-[50px_50px]
group-hover/top:translate-x-[0_0] duration-500! before:-top-[27px] before:-right-[20px] 
after:-right-[-37px] xs:after:-right-[-27.5px] lg:after:-right-[-37px]
after:-bottom-[20px] 
`;

const btnContainerStyle = `
flex-start gap-4 relative group/btn overflow-hidden hover:overflow-visible lg:-translate-y-10 lg:opacity-0
group-hover/top:translate-y-0! group-hover/top:opacity-100! duration-500!
`;

const btnStyle = `
w-11.5 xs:w-10 lg:w-11.5 h-11.5 xs:h-10 lg:h-11.5 rounded-full bg-white shadow-sm  flex-center hover:bg-orange! hover:text-white! duration-500!
`;

const spanStyle = `
absolute right-[calc(100%+10px)]! block! -translate-x-5 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100
text-center bg-orange! text-white w-25 rounded-sm h-fit p-1.5 text-xs before:absolute before:bg-orange before:rotate-45
before:-right-1 before:top-[10px] before:w-2.5 before:h-2.5 z-10 duration-500!
`;

const variantContainerStyle = `
variants w-full min-h-50 bg-white p-2.5 absolute bottom-0 left-0 rounded-[6px_6px_0_0] text-xs z-20
`;
export default React.memo(ProductCard);
