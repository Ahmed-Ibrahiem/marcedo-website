import React, { useEffect, useReducer, useState } from "react";
import FormProgress from "./components/FormProgress";
import Step1 from "./steps/Step1";
import StepsControl from "./steps/StepsControl";
import { AnimatePresence } from "framer-motion";
import Step2 from "./steps/Step2";
import AddNewBrandPopup from "./components/AddNewBrandPopup";
import NewCategoryPopup from "../components/category-form/NewCategoryPopup";
import { getAllBrands } from "../../../services/BrandsServices";
import { getAllCategories } from "../../../services/CategoriesServices";
import { FormProvider, useForm } from "react-hook-form";
import { step1Schema } from "./utils/reducerData.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";

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

const schemas = [step1Schema];

const NewProductForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [openCategoryPopup, setOpenCategoryPopup] = useState(false);
  const [stepOneInfo, setStepOneInfo] = useState({ name: "" });
  const [allBrands, setAllBrands] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const methods = useForm({
    resolver: yupResolver(schemas[currentStep - 1]),
    defaultValues: {
      stock_status: "",
      category_ids: [],
      brand_id: "",
      tags: [],
      relatedIds: [],
      thumbnail: "",
      has_discount: false,
      discount_percentage: 0,
      original_price: 0,
      currency: "",
      name: "",
      is_active: false,
      is_best_seller: false,
      is_featured: false,
      short_description: "",
    },
    mode: "onChange",
  });

  const { control } = methods;

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

      setAllCategories(res);
    };
    getBrands();
    getCategories();
  }, []);

  const handleNextStep = async () => {
    const valid = await methods.trigger();
    if (valid) setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="h-full flex-start-col w-full gap-5">
      <header className="bg-transparent! ">
        <h1 className="font-bold">Add New Product</h1>
      </header>

      <FormProgress currentStep={currentStep} />

      <div className="grow w-full  mt-5 relative">
        <FormProvider {...methods}>
          <AnimatePresence>
            {currentStep === 1 && (
              <Step1
                allBrands={allBrands}
                allCategories={allCategories}
                setOpenCategoryPopup={setOpenCategoryPopup}
                // Animation
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
        </FormProvider>
      </div>

      <StepsControl
        currentStep={currentStep}
        onNext={handleNextStep}
        onBack={() => setCurrentStep((prev) => prev - 1)}
      />

      {/* <AddNewBrandPopup /> */}
      <AnimatePresence>
        {openCategoryPopup && (
          <NewCategoryPopup
            key={"model"}
            setOpenCategoryPopup={setOpenCategoryPopup}
            setAllCategories={setAllCategories}
          />
        )}
      </AnimatePresence>

      <DevTool control={control} />
    </div>
  );
};

export default NewProductForm;
