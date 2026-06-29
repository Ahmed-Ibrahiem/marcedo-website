import React, { useEffect, useState } from "react";
import { FaAngleRight, FaXmark } from "react-icons/fa6";
import { TbCube, TbUrgent } from "react-icons/tb";
import { FiInfo } from "react-icons/fi";
import { BsLayersFill } from "react-icons/bs";
import { FaSitemap } from "react-icons/fa";
import { LuHouse } from "react-icons/lu";
import {
  addNewCategory,
  getlevelOneOfCategories,
  getLevelTwoByCategoryId,
} from "../../../../services/CategoriesServices";
import DropDownList from "../DropDownList";
import { motion } from "framer-motion";
import { GiCheckMark } from "react-icons/gi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const NewCategoryPopup = ({ setOpenCategoryPopup, setAllCategories }) => {
  const [categoryType, setCategoryType] = useState("main");
  const [categoryName, setCategoryName] = useState("");
  const [selectedLevelOne, setSelectedLevelOne] = useState(null);
  const [selectedLevelTwo, setSelectedLevelTwo] = useState(null);
  const [levelOneCategories, setLevelOneCategories] = useState([]);
  const [levelTwoCategories, setLevelTwoCategories] = useState([]);
  const [parentWarning, setParentWarning] = useState(false);
  const [categNameWarning, setCategNameWarning] = useState(false);
  const [isAlreadyExist, setIsAlreadyExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmAdded, setConfirmAdded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (categoryType === "main") {
      setSelectedLevelOne(null);
      setSelectedLevelTwo(null);
      setLevelOneCategories([]);
      setLevelTwoCategories([]);
    } else {
      const getLevelOne = async () => {
        const categs = await getlevelOneOfCategories();
        setLevelOneCategories(categs);
        setSelectedLevelOne(null);
        setLevelTwoCategories([]);
      };
      getLevelOne();
    }
  }, [categoryType]);

  useEffect(() => {
    if (!selectedLevelOne) return;
    const getCategsOfLev2 = async () => {
      const categs = await getLevelTwoByCategoryId(selectedLevelOne.id);
      setLevelTwoCategories(categs);
      setSelectedLevelTwo(null);
    };
    getCategsOfLev2();
  }, [selectedLevelOne]);

  const defaultValues = () => {
    setCategoryName("");
    setCategNameWarning(false);
    setIsAlreadyExist(false);
    setParentWarning(false);
  };

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      setCategNameWarning(true);
      return;
    }
    if (categoryType === "sub" && !selectedLevelOne) {
      setParentWarning(true);
      return;
    }

    setLoading(true);
    try {
      const parentId = selectedLevelTwo
        ? selectedLevelTwo?.id
        : selectedLevelOne?.id;

      const category = await addNewCategory(categoryName, parentId);

      if (!category) {
        setIsAlreadyExist(true);
        return;
      }

      const categData = { name: category.name, id: category.id };

      setAllCategories((prev) => [...prev, categData]);

      setConfirmAdded(true);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    defaultValues();
    setOpenCategoryPopup(false);
    setConfirmAdded(false);
  };

  return (
    <div className="flex sm:items-center sm:justify-center fixed top-0 left-0 w-full min-h-screen h-screen overflow-y-auto p-3 bg-black/50 cursor-crosshair z-50">
      <form
        className="w-4xl max-w-full min-h-fit sm:h-[95%] bg-white rounded-sm p-4 cursor-auto relative pb-20"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="head flex-between w-full">
          <div className="font-bold flex-start gap-1.5">
            <TbCube className="text-orange" size={20} />
            <h1>Add New Category</h1>
          </div>

          <button
            onClick={handleClosePopup}
            className="w-8 h-8 border border-border rounded-sm flex-center text-sm hover:bg-black hover:text-white"
          >
            <FaXmark />
          </button>
        </div>

        {/* Tip */}
        <div className="w-full flex-start gap-1.5 p-5 rounded-sm bg-blue-100 border border-blue-400 mt-5 text-blue-600">
          <FiInfo />
          <p className=" text-sm">
            <strong className="text-[16px]!">Tip: </strong>
            You can create main category or sub category under existing
            categories.
          </p>
        </div>

        {/* Category inputs */}
        <div className="flex-start-col gap-5 mt-5">
          {/* Category name */}
          <div className={`${boxStyle} relative`}>
            <label className={labelStyle} htmlFor="category-name">
              Category Name
            </label>
            <input
              onChange={(e) => {
                setCategoryName(e.target.value);
                if (e.target.value.trim()) {
                  setCategNameWarning(false);
                  setIsAlreadyExist(false);
                } else setCategNameWarning(true);
              }}
              value={categoryName}
              type="text"
              id="category-name"
              className={inputStyle}
              placeholder="Enter the category name"
            />
            {categNameWarning && (
              <span className="text-red-500 absolute -bottom-5 text-xs font-semibold">
                This Field Is Required
              </span>
            )}
            {isAlreadyExist && (
              <span className="text-red-500 absolute -bottom-5 text-xs font-semibold">
                This Category Name Is Already Exist
              </span>
            )}
          </div>

          {/* Category Type */}
          {categoryName.trim() && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.8 } }}
              className={`${boxStyle} ${categoryName.trim() === "" ? "text-gray! pointer-events-none" : ""}`}
            >
              <p className={labelStyle}>Category Type</p>
              <div className="grid sm:grid-cols-2 w-full gap-5 ">
                {/* Main Category Option */}
                <label
                  htmlFor="main-categ"
                  className={`border border-border cursor-pointer rounded-sm
                     flex-start items-start! p-4 gap-4 
                     ${categoryType === "main" && categoryName.trim() != "" ? "bg-orange-lite/50 border-orange" : ""} 
                     `}
                >
                  <input
                    checked={
                      categoryType === "main" && categoryName.trim() != ""
                    }
                    onChange={() => setCategoryType("main")}
                    type="radio"
                    className="radio-option"
                    id="main-categ"
                    name="category-type"
                  />
                  <div className="flex flex-col sm:flex-row gap-2.5 ">
                    <BsLayersFill
                      className={`${categoryName.trim() === "" ? "text-gray" : "text-orange"}`}
                      size={23}
                    />
                    <div className="flex-start-col">
                      <h3 className="font-semibold">Main Category</h3>
                      <p className="text-gray">Top level category</p>
                    </div>
                  </div>
                </label>
                {/* Sub Category Option */}
                <label
                  htmlFor="sub-categ"
                  className={`border border-border cursor-pointer rounded-sm
                     flex-start items-start! p-4 gap-4 
                     ${categoryType === "sub" ? "bg-orange-lite/50 border-orange" : ""}`}
                >
                  <input
                    checked={categoryType === "sub"}
                    onChange={() => setCategoryType("sub")}
                    type="radio"
                    className="radio-option"
                    id="sub-categ"
                    name="category-type"
                  />
                  <div className="flex flex-col sm:flex-row gap-2.5 ">
                    <FaSitemap
                      className={`${categoryName.trim() === "" ? "text-gray" : "text-orange"}`}
                      size={23}
                    />
                    <div className="flex-start-col">
                      <h3 className="font-semibold">Sub Category</h3>
                      <p className="text-gray">
                        child category under existing category
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </motion.div>
          )}

          {/* Category Parent */}
          {categoryType === "sub" && categoryName.trim() && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.8 } }}
              className="w-full relative "
            >
              <h4 htmlFor="category-parent" className={labelStyle}>
                Select Parent Category
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2.5 w-full mt-2.5">
                {/* Level One  */}
                {levelOneCategories.length > 0 && (
                  <div className="flex-start gap-2.5 w-full text-xs!">
                    <DropDownList
                      list={levelOneCategories}
                      currentSelect={
                        selectedLevelOne?.name || "select category"
                      }
                      optionFun={(item) => {
                        setSelectedLevelOne(item);
                        setParentWarning(false);
                      }}
                      listStyle={"w-full! justify-between!"}
                    />
                    <FaAngleRight className="text-gray" />
                  </div>
                )}

                {/* Level Two */}
                {levelTwoCategories.length > 0 ? (
                  <div className="flex-start gap-2.5 w-full text-xs!">
                    <DropDownList
                      list={levelTwoCategories}
                      currentSelect={selectedLevelTwo?.name || "none"}
                      optionFun={(item) => {
                        setSelectedLevelTwo(item);
                      }}
                      listStyle={"w-full! justify-between!"}
                    >
                      <button
                        onClick={() => {
                          setSelectedLevelTwo(null);
                        }}
                        type="button"
                        className="p-1.5 w-fit self-end bg-orange-lite hover:bg-orange hover:text-white text-xs rounded-sm font-semibold rouned-sm"
                      >
                        none
                      </button>
                    </DropDownList>
                    <FaAngleRight className="text-gray" />
                  </div>
                ) : selectedLevelOne ? (
                  <div className="text-gray ">
                    <span>{categoryName} (First sub sub-category)</span>
                  </div>
                ) : (
                  ""
                )}

                {/* Level Three */}
                {selectedLevelTwo && (
                  <div className="text-gray text-sm md:text-[16px]">
                    <span>{categoryName} (First sub sub-category)</span>
                  </div>
                )}
              </div>
              {parentWarning && (
                <span className="text-red-500 text-xs font-semibold absolute -bottom-5">
                  Please Select Parent Category
                </span>
              )}
            </motion.div>
          )}

          {/* Category Path */}
          {categoryName.trim() && categoryType && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.8 } }}
              className={boxStyle}
            >
              <h4 className={labelStyle}>Path Review</h4>
              <div className="flex-start gap-1 sm:gap-2.5 text-xs sm:text-sm md:text-[16px] w-full bg-gray-light/60 p-3 text-orange font-bold rounded-sm">
                <LuHouse className="text-gray" />
                <FaAngleRight className="text-gray " />
                {selectedLevelOne && (
                  <div className="flex-start gap-1 sm:gap-2.5">
                    <span>{selectedLevelOne.name}</span>
                    <FaAngleRight className="text-gray" />
                  </div>
                )}
                {selectedLevelTwo && (
                  <div className="flex-start gap-1 sm:gap-2.5">
                    <span>{selectedLevelTwo.name}</span>
                    <FaAngleRight className="text-gray" />
                  </div>
                )}
                <span>{categoryName}</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Action Btn */}
        <div className="action-btn flex-between gap-2.5 w-full p-5 absolute bottom-0 left-0">
          <button
            onClick={handleClosePopup}
            className="border border-border p-2.5 text-sm rounded-sm font-semibold hover:bg-gray-light"
          >
            Cancel
          </button>
          <button
            onClick={() => handleAddCategory()}
            className="border border-border p-2.5 text-sm rounded-sm font-semibold hover:bg-orange hover:text-white hover:border-orange "
          >
            Add Category
          </button>
        </div>

        {/* Confirm Message */}
        {confirmAdded && (
          <div className="absolute flex-center w-full h-full bg-black/20 rounded-sm inset-0 ">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { type: "tween", ease: "[0, 0 , 1 , 1]" },
              }}
              className="w-1/2 h-1/2 bg-white shadow-sm rounded-sm flex-center-col gap-10"
            >
              <div className="flex-center-col gap-5">
                <div
                  className="w-17.5 h-17.5 rounded-full flex-center text-3xl text-orange
               bg-orange-lite shadow-[0_0_5px_var(--color-orange-lite)] "
                >
                  <GiCheckMark />
                </div>
                <span>
                  Category "{categoryName}" Has Been Added Successfully
                </span>
              </div>
              <button
                onClick={() => handleClosePopup()}
                className="text-white bg-orange p-2.5 px-4 rounded-sm hover:scale-105"
              >
                Ok
              </button>
            </motion.div>
          </div>
        )}

        {loading && (
          <div className="absolute flex-center w-full h-full bg-black/20 rounded-sm inset-0">
            <div className="flex-center-col gap-2.5">
              <AiOutlineLoading3Quarters className="loading-animate-1 text-4xl text-gray" />
              <p>Loading...</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

const boxStyle = `
flex-start-col w-full gap-1.5 text-sm
`;

const inputStyle = `
border text-sm border-border p-1.5 rounded-sm w-full outline-transparent focus:outline-1 focus:outline-orange  duration-500!
`;

const labelStyle = `
font-bold
`;

export default NewCategoryPopup;
