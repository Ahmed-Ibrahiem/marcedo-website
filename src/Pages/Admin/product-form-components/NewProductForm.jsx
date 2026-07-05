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
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
} from "./utils/reducerData.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import Step3 from "./steps/Step3.jsx";
import Step4 from "./steps/Step4.jsx";

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

const schemas = [step1Schema, step2Schema, step3Schema, step4Schema];

const NewProductForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [openCategoryPopup, setOpenCategoryPopup] = useState(false);
  const [openBrandPopup, setOpenBrandPopup] = useState(false);
  const [stepOneInfo, setStepOneInfo] = useState({ name: "" });
  const [allBrands, setAllBrands] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [hasVariants, setHasVariants] = useState(false);
  const methods = useForm({
    resolver: yupResolver(schemas[currentStep - 1]),
    context: { hasVariants },
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
      currency: "EGP",
      cost_price: 0,
      name: "",
      is_active: false,
      is_best_seller: false,
      is_featured: false,
      short_description: "",
      thumbnail: "",
      gallery: [],
      videos: [],
      variants: [],
      colorPalette: {},
      charge_tax: true,
      quantity: 0,
      sku: "",
      track_inventory: true,
      low_stock_threshold: 0,
      shipping_type: "Standard Shipping",
      estimated_delivery_days: { from: 3, to: 5 },
      from: "Cairo, Egypt",
      is_free: false,
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
                setOpenBrandPopup={setOpenBrandPopup}
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
            {currentStep === 3 && (
              <Step3
                setHasVariants={setHasVariants}
                key={"model-3"}
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            )}
            {currentStep === 4 && (
              <Step4
                key={"model-4"}
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
      <AnimatePresence mode="popLayout">
        {openCategoryPopup && (
          <NewCategoryPopup
            key={"model"}
            setOpenCategoryPopup={setOpenCategoryPopup}
            setAllCategories={setAllCategories}
          />
        )}
        {openBrandPopup && (
          <AddNewBrandPopup
            key={"model2"}
            allBrands={allBrands}
            setAllBrands={setAllBrands}
            setOpenBrandPopup={setOpenBrandPopup}
          />
        )}
      </AnimatePresence>

      <DevTool control={control} />
    </div>
  );
};

export default NewProductForm;
