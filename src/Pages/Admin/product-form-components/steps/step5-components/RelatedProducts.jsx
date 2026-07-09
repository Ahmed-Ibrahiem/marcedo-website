import React, { useEffect, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { getProductsByCategories } from "../../../../../services/ProductsServices";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Success_Toast from "../../../../../Components/ui/confirm-message/Success_Toast";

const RelatedProducts = () => {
  const [products, setProducts] = useState([]);
  const { getValues, setValue, control } = useFormContext();
  const categoriesId = getValues("category_ids");

  const [searchWord, setSearchWord] = useState("");

  const suggestedProducts = useMemo(() => {
    if (!searchWord.trim()) return products;
    const word = searchWord.trim().toLowerCase();
    return products.filter((pro) => pro.name.toLowerCase().includes(word));
  }, [products, searchWord]);

  // Get Products By Category Id
  useEffect(() => {
    const getProducts = async () => {
      try {
        let finalProducts = [];
        let deepestCategory =
          categoriesId.find((cat) => cat.level === 3) ||
          categoriesId.find((cat) => cat.level === 2);
        if (deepestCategory === undefined)
          deepestCategory = categoriesId.find((cat) => cat.level === 1);

        const products = await getProductsByCategories(deepestCategory.id);
        if (products.length >= 4) {
          finalProducts = products;
        } else if (products.length < 4 && deepestCategory.level > 1) {
          const levelUp = categoriesId.find(
            (cat) => cat.level === deepestCategory.level - 1,
          );
          const levelUpProducts = await getProductsByCategories(levelUp.id);
          finalProducts = levelUpProducts;
        }

        setProducts(finalProducts);
      } catch (errors) {}
    };
    getProducts();
  }, [categoriesId]);

  return (
    <div className="w-full max-w-full bg-white rounded-sm shadow-sm p-2.5">
      <h1 className="font-bold mb-2.5">Related Products</h1>
      <div className="w-full flex-start-col gap-5">
        <div className="input-form-style relative flex-start gap-5 w-full">
          <input
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            type="text"
            className="outline-one border-none grow focus:outline-none"
            placeholder="Search for products by name "
          />
          <FaMagnifyingGlass />
        </div>
        <Controller
          control={control}
          name="related_ids"
          render={({ field }) => {
            return (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 min-h-45 w-full gap-3 ">
                  {suggestedProducts.length > 0 &&
                    suggestedProducts.slice(0, 8).map((pro) => (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={pro.id}
                        className="flex-between gap-2.5 h-fit border border-border p-2.5 rounded-sm min-w-40!  shrink-0"
                      >
                        <div className="flex-start gap-2.5">
                          <div className="w-14 min-w-14 h-14 min-h-14 rounded-sm bg-gray-100 flex-center">
                            <img
                              src={pro.thumbnail}
                              loading="lazy"
                              className="max-h-[80%] max-w-[80%]"
                            />
                          </div>
                          <div className="flex-start-col text-xs gap-1.5 ">
                            <h3 className="font-bold line-clamp-1">
                              {pro.name}
                            </h3>
                            <p>{pro.current_price}$</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (field.value.length >= 4) {
                              toast(
                                <Success_Toast
                                  message={
                                    "The maximum number of related products is 4"
                                  }
                                />,
                              );
                              return;
                            }
                            if (!field.value.find((p) => p.id === pro.id)) {
                              field.onChange([...field.value, pro]);
                            } else {
                              toast(
                                <Success_Toast
                                  message={"This Product has been added"}
                                />,
                              );
                            }
                          }}
                          className="hover:bg-black text-lg hover:text-white w-6 h-6 rounded-sm flex-center border border-border"
                        >
                          +
                        </button>
                      </motion.div>
                    ))}
                  {suggestedProducts.length === 0 &&
                    Array(8)
                      .fill(0)
                      .map((_, index) => {
                        return <SkeletonLoading key={index} />;
                      })}
                </div>

                <div className="flex-start-col gap-2.5 w-full">
                  <h2 className="font-bold">Selected Products</h2>
                  {field.value.length > 0 && (
                    <div className="grid grid-cols-4 gap-5 w-full">
                      {field.value.map((pro) => {
                        return (
                          <div
                            key={pro.id}
                            className="p-2.5 rounded-sm border border-border flex-between gap-5"
                          >
                            <div className="flex-start gap-2.5">
                              <div className="w-14 min-w-14 h-14 min-h-14 rounded-sm bg-gray-100 flex-center">
                                <img
                                  src={pro.thumbnail}
                                  loading="lazy"
                                  className="max-h-[80%] max-w-[80%]"
                                />
                              </div>
                              <h2 className="line-clamp-1 font-bold">
                                {pro.name}
                              </h2>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                field.onChange([
                                  ...field.value.filter((p) => p.id !== pro.id),
                                ])
                              }
                              className="hover:bg-black text-sm hover:text-white w-6 h-6 rounded-sm flex-center border border-border"
                            >
                              <FaXmark />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {field.value.length === 0 && (
                    <div className="w-full text-center text-gray">
                      --- No Related Products Yet ---
                    </div>
                  )}
                </div>
              </>
            );
          }}
        />
      </div>
    </div>
  );
};

const SkeletonLoading = () => {
  return (
    <div className="flex-between p-2.5 gap-2.5 max-w-full border border-border rounded-sm ">
      <div className="flex-start gap-2.5">
        <Skeleton width={56} height={56} />
        <div className="flex-start-col gap-2.5">
          <Skeleton className="w-12! md:w-15!" height={14} />
          <Skeleton className="w-10! md:w-10!" height={14} />
        </div>
      </div>
      <Skeleton width={30} height={30} />
    </div>
  );
};

export default RelatedProducts;
