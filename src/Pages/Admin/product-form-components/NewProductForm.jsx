import React, { useEffect, useState } from "react";
import FormProgress from "./components/FormProgress";
import Step1 from "./steps/Step1";
import StepsControl from "./steps/StepsControl";
import { AnimatePresence } from "framer-motion";
import Step2 from "./steps/Step2";
import AddNewBrandPopup from "./components/AddNewBrandPopup";
import NewCategoryPopup from "./components/NewCategoryPopup";
import { getAllBrands } from "../../../services/BrandsServices";
import { getAllCategories } from "../../../services/CategoriesServices";

const variants = {
  hidden: {
    scale: 0.9,
    opacity: 0,
    position: "absolute",
  },
  visible: {
    position: "relative",
    scale: 1,
    opacity: 1,
    transition: {
      scale: { duration: 0.3 },
      opacity: { duration: 0.6 },
    },
  },
  exit: {
    position: "absolute",
    scale: 0.9,
    opacity: 0,
    transition: {
      scale: { duration: 0.3 },
      opacity: { duration: 0.4 },
    },
  },
};

const NewProductForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [openCategoryPopup, setOpenCategoryPopup] = useState(false);
  const [stepOneInfo, setStepOneInfo] = useState({ name: "" });
  const [allBrands, setAllBrands] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allSubCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const getBrands = async () => {
      const res = await getAllBrands();

      const brands = res.map((brand) => ({
        name: brand.name,
        id: brand.id,
      }));

      setAllBrands(brands);
    
    };

    const getCategories = async () => {
      const res = await getAllCategories();

      const categories = res
        .filter((categ) => !categ.parent_id)
        .map((category) => ({ name: category.name, id: category.id }));

      const subCategories = res
        .filter((categ) => categ.parent_id)
        .map((categ) => ({ name: categ.name, id: categ.id }));

      setAllCategories(categories);
      setSubCategories(subCategories);
    };
    getBrands();
    getCategories();
  }, []);

  return (
    <div className="h-full flex-start-col w-full gap-5">
      <header className="bg-transparent! ">
        <h1 className="font-bold">Add New Product</h1>
      </header>

      <FormProgress currentStep={currentStep} />

      <div className="grow w-full  mt-5 relative">
        <AnimatePresence>
          {currentStep === 1 && (
            <Step1
              allBrands={allBrands}
              allCategories={allCategories}
              allSubCategories={allSubCategories}
              setOpenCategoryPopup={setOpenCategoryPopup}
              key={"model-1"}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
            />
          )}
          {currentStep === 2 && (
            <Step2
              key={"model-2"}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
            />
          )}
        </AnimatePresence>
      </div>

      <StepsControl currentStep={currentStep} setCurrentStep={setCurrentStep} />

      {/* <AddNewBrandPopup /> */}
      <AnimatePresence>
        {openCategoryPopup && (
          <NewCategoryPopup
            key={"model"}
            setOpenCategoryPopup={setOpenCategoryPopup}
            setAllCategories={setAllCategories}
            setSubCategories={setSubCategories}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewProductForm;
