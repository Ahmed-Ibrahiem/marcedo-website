import React, { useMemo, useRef, useState, memo } from "react";
import { FaAngleRight, FaCheck } from "react-icons/fa6";
import ErrorMessageFrom from "../../../../../Components/ui/ErrorMessageFrom";
import { Controller, useFormContext } from "react-hook-form";
import useOutside_click from "../../../../../Hooks/Outside_click";

const AddCategories = ({ setOpenCategoryPopup, allCategories }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [categoryWord, setCategoryWord] = useState("");
  const [openSuggested, setOpenSuggested] = useState(false);

  const categRef = useRef(null);

  const suggestedCategory = useMemo(() => {
    const word = categoryWord.trim().toLocaleLowerCase();
    if (!word) return [...allCategories];

    return allCategories.filter((categ) =>
      categ.name.trim().toLocaleLowerCase().includes(word),
    );
  }, [categoryWord, allCategories]);

  useOutside_click(categRef, () => setOpenSuggested(false));

  return (
    <Controller
      control={control}
      name="category_ids"
      render={({ field }) => (
        <div
          className={`sm:col-span-2 gap-1.5 items-center flex-start sm:grid! grid-cols-2 w-full`}
        >
          {/* Select Category */}
          <div
            className={`box-form-style min-w-35 max-w-1/2 sm:max-w-none relative `}
          >
            <h4 className="label-form-style">Select Categories</h4>
            <div className="w-full relative  " ref={categRef}>
              <input
                className={`input-form-style `}
                type="text"
                placeholder="Enter category name"
                value={categoryWord}
                onChange={(e) => {
                  setCategoryWord(e.target.value);
                  setOpenSuggested(true);
                }}
              />
              {openSuggested && (
                <div className="options fade-in-animate z-10 flex-start-col p-1.5 w-full absolute top-[calc(100%+2px)] left-0 max-h-38 overflow-y-auto bg-white rounded-sm shadow-sm">
                  <button
                    onClick={() => setOpenCategoryPopup(true)}
                    className="text-xs p-1.5 text-white bg-orange rounded-sm self-end"
                  >
                    Add New +
                  </button>
                  {suggestedCategory.map((categ) => {
                    return (
                      <div
                        onClick={() => {
                          if (
                            field.value.map((cat) => cat.id).includes(categ.id)
                          ) {
                            field.onChange(
                              field.value.filter((cat) => cat.id !== categ.id),
                            );
                          } else {
                            field.onChange([...field.value, categ]);
                          }
                          setCategoryWord("");
                        }}
                        className="p-1.5 text-xs hover:cursor-pointer hover:bg-orange-lite rounded-sm w-full flex-start"
                      >
                        <span key={categ.id} className="min-w-30">
                          {categ.name}
                        </span>
                        {field.value.map((cat) => cat.id).includes(categ.id) ? (
                          <FaCheck className="text-orange" />
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {errors?.category_ids && (
              <ErrorMessageFrom message={errors.category_ids.message} />
            )}
          </div>
          {/* Review Categories */}
          <div className="flex-start min-w-0 flex-1 gap-1.5">
            <FaAngleRight className="self-end mb-2 text-sm text-gray" />
            <div className={`${`box-form-style`} min-w-0`}>
              <h4 className={`label-form-style`}>Categories Selected</h4>
              <div
                className={`input-form-style max-w-50 sm:max-w-none whitespace-nowrap overflow-x-auto`}
              >
                {field.value.length > 0 ? (
                  <span className="">
                    {field.value.map((categ) => categ.name).join(", ")}
                  </span>
                ) : (
                  <span className="text-gray">Select Category</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default React.memo(AddCategories);
