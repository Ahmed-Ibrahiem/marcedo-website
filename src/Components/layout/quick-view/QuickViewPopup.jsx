import React, { useEffect, useReducer, useState } from "react";
import { useQuickViewPopupContext } from "../../../Context/QuickViewPopupsProvider";
import { brands, categories, products } from "../../../services/MokeData";
import CreateStarsOfRating from "../../product/create-stars-of-rating/CreateStarsOfRating";
import { FaMinus, FaPlus, FaXmark } from "react-icons/fa6";
import { useCartContext } from "../../../Context/CartMenuContext";
import {
  getProductBrands,
  getProductCategories,
  getProductVariants,
} from "../../../services/productDetailsServices";
import ProductVariants from "../../../Pages/product-details/components/ProductVariants";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const initialInfo = {
  proCategories: undefined,
  proBrands: undefined,
  proVariants: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_CATEGS":
      return { ...state, proCategories: action.payload };
    case "UPDATE_BRANDS":
      return { ...state, proBrands: action.payload };
    case "UPDATE_VARIANTS":
      return { ...state, proVariants: action.payload };
    case "RESET_VALUES":
      return initialInfo;
    default:
      return state;
  }
};
const QuickViewPopup = () => {
  const { cartItemsData } = useCartContext();
  const { isQuickViewOpen, setIsQuickViewOpen, productData } =
    useQuickViewPopupContext();
  const [countSelected, setCountSelected] = useState(1);
  const [selectedOptions, setSeletedOptions] = useState(null);
  const [proInfo, dispatchProInfo] = useReducer(reducer, initialInfo);
  const { addItem } = useCartContext();

  // Create function to get default option when the component render
  const getDefaultOptions = () => {
    let options = {};

    proInfo.proVariants.options.forEach((op) => {
      options = { ...options, [op.key]: op.values[0] };
      if (op.key === "color")
        options = { ...options, [op.key]: op.values[0].label };
    });

    setSeletedOptions(options);
  };

  // Create function to get the selected variants by check the matching with options selected
  const getSelectedVariants = () => {
    if (!selectedOptions || !proVariants.variants) return;

    const varaint = proVariants.variants.find((varia) => {
      return Object.entries(varia.attributes).every(
        ([key, value]) => selectedOptions[key] === value,
      );
    });

    return varaint || null;
  };

  // Create function to handle the add the item to cart operation
  const addToCart = () => {
    const variant = getSelectedVariants();
    if (!variant) return;

    const data = { ...productData, variants: variant };
    addItem(data, countSelected);
  };

  // When the product data change reset the brand , categories and variants state
  useEffect(() => {
    if (!productData) return;

    getProductCategories(productData.category_ids).then((data) => {
      if (data) {
        const categs = data.map((cat) => cat.name);
        dispatchProInfo({ type: "UPDATE_CATEGS", payload: categs });
      }
    });

    getProductBrands(productData.brand_id).then((data) => {
      dispatchProInfo({ type: "UPDATE_BRANDS", payload: data ?? null });
    });

    getProductVariants(productData.id).then((data) => {
      dispatchProInfo({ type: "UPDATE_VARIANTS", payload: data ?? null });
    });
  }, [productData]);

  // when the variants change get the default options
  useEffect(() => {
    if (proInfo.proVariants) getDefaultOptions();
  }, [proInfo.proVariants]);

  return (
    <>
      {isQuickViewOpen && (
        <div
          className="quick-view-overlay w-full h-screen fixed top-0 left-0 flex-center bg-black/40 z-200 text-sm cursor-crosshair"
          onClick={(e) => {
            if (e.currentTarget === e.target) setIsQuickViewOpen(false);
          }}
        >
          <div className={`${containerStyle}`}>
            {/* image */}
            <div className="img-box w-full min-h-75 rounded-sm overflow-hidden flex-center bg-gray-200 ">
              <img
                src={productData.thumbnail}
                alt=""
                className="max-w-[80%] max-h-[90%]"
              />
            </div>
            {/* Product Info */}
            <div className="flex-start-col gap-5">
              <div className="flex-between gap-5">
                <h1 className="text-lg font-bold text-black-lite">
                  {productData.name}
                </h1>
                {/* Exit btn */}
                <button
                  onClick={() => {
                    setIsQuickViewOpen(false);
                    // Reset the all state to undefind
                    dispatchProInfo({ type: "RESET_VALUES" });
                  }}
                  className={`${exitBtnStyle}`}
                >
                  <FaXmark />
                </button>
              </div>
              {/* Rating */}
              <div className="flex-start gap-1.5">
                <CreateStarsOfRating
                  rating_value={productData.rating_average}
                />
                <p>({productData.rating_average})</p>
              </div>
              {/* Price */}
              <span className="text-xl font-bold text-black-lite">
                ${productData.current_price}
              </span>
              {/* categories */}
              {proInfo.proCategories === undefined && (
                <div className="flex-start gap-6.5">
                  <Skeleton width={80} height={20} />
                  <Skeleton width={100} height={20} />
                </div>
              )}
              {proInfo.proCategories && (
                <div className="flex-start flex-wrap gap-2.5 fade-in">
                  <span className="font-semibold min-w-25">Categories: </span>
                  <p className="capitalize text-gray">
                    {proInfo.proCategories.join(", ")}
                  </p>
                </div>
              )}
              {/* Brands */}
              {proInfo.proBrands === undefined && (
                <div className="flex-start gap-6.5">
                  <Skeleton width={80} height={20} />
                  <Skeleton width={100} height={20} />
                </div>
              )}
              {proInfo.proBrands && (
                <div className="flex-start flex-wrap gap-2.5 fade-in">
                  <span className="font-semibold min-w-25">Brand: </span>
                  <p className="text-gray">{proInfo.proBrands.name}</p>
                </div>
              )}
              {/* Variants */}
              {proInfo.proVariants === undefined && (
                <>
                  <div className="flex-start-col gap-2.5">
                    <Skeleton width={80} height={20} />
                    <div className="flex-start gap-6.5">
                      <Skeleton width={40} height={30} />
                    </div>
                  </div>
                  <div className="flex-start-col gap-2.5">
                    <Skeleton width={80} height={20} />
                    <div className="flex-start gap-2.5">
                      <Skeleton circle width={30} height={30} />
                      <Skeleton width={80} height={20} />
                    </div>
                  </div>
                </>
              )}
              {proInfo.proVariants && (
                <ProductVariants
                  productVariants={proInfo.proVariants}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSeletedOptions}
                />
              )}
              {/* Quantity */}
              <div className="w-full flex-start-col gap-3.5 text-xs!">
                <div className="top flex-start gap-3.5 w-full">
                  {/* Quantity Action */}
                  <div className="flex-between gap-5 w-25 border border-border rounded-sm px-2.5 py-3">
                    <button
                      className={`text-gray hover:text-orange `}
                      onClick={() => {
                        if (countSelected > 1)
                          setCountSelected((prev) => prev - 1);
                      }}
                    >
                      <FaMinus />
                    </button>
                    <p>{countSelected}</p>
                    <button
                      className={`text-gray hover:text-orange `}
                      onClick={() => {
                        if (countSelected < 15)
                          setCountSelected((prev) => prev + 1);
                      }}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  {/* Add To Cart */}
                  <button
                    onClick={() => {
                      addToCart();
                      setIsQuickViewOpen(false);
                      dispatchProInfo({ type: "RESET_VALUES" });
                    }}
                    className="grow bg-gray-200 p-3 font-semibold rounded-sm hover:text-white hover:bg-black-lite uppercase "
                  >
                    Add To Cart
                  </button>
                </div>
                {/* Buy it now */}
                <button className="w-full font-semibold p-3 border border-border hover:border-black hover:text-white hover:bg-black-lite shadow-sm rounded-sm uppercase">
                  Buy It Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const containerStyle = `
quick-view-container max-w-[90%] w-xl lg:w-4xl h-[85%] bg-white rounded-sm p-5 border border-border shadow-sm
grid md:grid-cols-2 gap-5 relative cursor-auto overflow-y-auto
`;

const exitBtnStyle = `
w-10 h-10 flex-center rounded-full border border-border hover:border-black hover:bg-black hover:text-white
absolute top-5 right-5
`;

export default QuickViewPopup;
