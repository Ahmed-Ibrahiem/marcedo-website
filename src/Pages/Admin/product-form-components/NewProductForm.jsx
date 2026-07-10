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
  step5Schema,
} from "./utils/reducerData.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import Step3 from "./steps/Step3.jsx";
import Step4 from "./steps/Step4.jsx";
import Step5 from "./steps/Step5.jsx";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Success_Toast from "../../../Components/ui/confirm-message/Success_Toast.jsx";
import { data, useParams } from "react-router-dom";
import {
  getProductForEdit,
  publishProduct,
  updateProduct,
} from "./services/productFormServices.js";
import {
  uploadImageToCloudinary,
  uploadMaltiIMageToCloudinary,
} from "../../../services/cloudinaryServices.js";
import UploadProgressBar from "../../../Components/ui/UploadProgressBar.jsx";

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

const schemas = [
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
];

const defaultProductValues = {
  category_ids: [],
  brand_id: "",
  tags: [],
  thumbnail: "",
  discount_percentage: 0,
  original_price: "",
  currency: "EGP",
  cost_price: 0,
  name: "",
  short_description: "",
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
  estimated_delivery_days: { from: 0, to: 0 },
  from: "",
  is_free: false,
  is_active: true,
  is_featured: true,
  is_best_seller: true,
  related_ids: [],
  description: [],
  current_price: "",
  discount_expires_at: null,
};

const NewProductForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [openCategoryPopup, setOpenCategoryPopup] = useState(false);
  const [openBrandPopup, setOpenBrandPopup] = useState(false);
  const [stepOneInfo, setStepOneInfo] = useState({ name: "" });
  const [allBrands, setAllBrands] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [hasVariants, setHasVariants] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { product_id: productId } = useParams();

  const isEditMode = Boolean(productId);

  const methods = useForm({
    resolver: yupResolver(schemas[currentStep - 1]),
    context: { hasVariants, setCurrentStep },
    defaultValues: defaultProductValues,
    mode: "onTouched",
  });

  const { control, handleSubmit, reset } = methods;

  useEffect(() => {
    const getData = async () => {
      const [brandsReq, categories] = await Promise.all([
        getAllBrands(),
        getAllCategories(),
      ]);

      const brands = brandsReq.map((brand) => ({
        name: brand.name,
        id: brand.id,
      }));

      setAllBrands(brands);
      setAllCategories(categories);
    };

    getData();
  }, []);

  useEffect(() => {
    if (!isEditMode) return;
    const loadProduct = async () => {
      try {
        setIsProductLoading(true);
        const productData = await getProductForEdit(productId);

        reset(productData);
      } catch (errors) {
        console.error("Failed to load product for edit:", errors);
      } finally {
        setIsProductLoading(false);
      }
    };
    loadProduct();
  }, [productId]);

  const handleNextStep = async () => {
    const valid = await methods.trigger();
    if (valid) setCurrentStep((prev) => prev + 1);
  };

  const uplaodFormMedia = async (formData) => {
    let filesToUpload = [];
    const update = { ...formData };

    if (formData.thumbnail instanceof File) {
      filesToUpload.push({ key: "thumbnail", file: update.thumbnail });
    }

    if (update.gallery?.length > 0) {
      update.gallery.forEach((item, index) => {
        if (item instanceof File)
          filesToUpload.push({ key: `gallery-${index}`, file: item });
      });
    }

    if (filesToUpload.length <= 0) return update;

    const progressMap = {};

    const result = await Promise.all(
      filesToUpload.map(({ key, file }) => {
        return uploadImageToCloudinary(file, (percent) => {
          progressMap[key] = percent;
          const total = Object.values(progressMap).reduce((a, b) => a + b, 0);
          const avarage = Math.round(total / filesToUpload.length);
          setUploadProgress(avarage);
        }).then((url) => ({ key, url }));
      }),
    );

    result.forEach((item) => {
      if (item.key === "thumbnail") {
        update.thumbnail = item.url;
      } else if (item.key.startsWith("gallery")) {
        const index = Number(item.key.split("-")[1]);
        update.gallery[index] = item.url;
      }
    });

    return update;
  };

  const onSave = async (formData) => {
    setSubmitError(null);
    setIsSubmitting(true);
    setUploadProgress(0);
    try {
      const cleanData = await uplaodFormMedia(formData);
      const proId = await publishProduct(cleanData);

      reset();
      setCurrentStep(1);
      setHasVariants(false);
      toast(
        <Success_Toast
          message={`"${cleanData.name}" Product Saved Successfully!`}
        />,
      );
    } catch (err) {
      console.error("Failed to publish product:", err);
      setSubmitError("Something Went Wrong, Please Try Again.");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const onUpdate = async (formData, existingProductId) => {
    setSubmitError(null);
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      const cleanData = await uplaodFormMedia(formData);
      await updateProduct(cleanData, existingProductId);

      toast(
        <Success_Toast
          message={`"${cleanData.name}" Product Updated Successfully!`}
        />,
      );
    } catch (err) {
      console.error("Failed to update product:", err);
      setSubmitError("Something Went Wrong, Please Try Again.");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleFinalSubmit = async () => {
    const stepsValid = await Promise.all(
      schemas.map((schema) => schema.isValid(methods.getValues())),
    );

    if (stepsValid.every(Boolean)) {
      if (isEditMode) {
        handleSubmit((formData) => onUpdate(formData, productId))();
      } else {
        handleSubmit(onSave)();
      }
    } else {
      setSubmitError("There are same missing data, check it please");
    }
  };

  useEffect(() => {
    if (isSubmitting || isProductLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSubmitting, isProductLoading]);

  return (
    <main className="h-full flex-start-col w-full gap-5 relative">
      <header className="bg-transparent! ">
        <h1 className="font-bold">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h1>
      </header>

      <FormProgress currentStep={currentStep} />

      <FormProvider {...methods}>
        <fieldset disabled={isSubmitting} className="contents">
          <form
            id="product-form"
            onSubmit={(e) => e.preventDefault()}
            className="grow w-full mt-5 relative"
          >
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
              {currentStep === 5 && (
                <Step5
                  setCurrentStep={setCurrentStep}
                  key={"model-5"}
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                />
              )}
            </AnimatePresence>
          </form>
        </fieldset>
        <StepsControl
          isEditMode={isEditMode}
          formId="product-form"
          currentStep={currentStep}
          onNext={handleNextStep}
          onBack={() => setCurrentStep((prev) => prev - 1)}
          handleFinalSubmit={handleFinalSubmit}
          isSubmitting={isSubmitting}
        />
      </FormProvider>

      {submitError && (
        <p className="text-red-500 text-sm font-semibold">{submitError}</p>
      )}

      {isProductLoading && (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-white flex-center-col gap-5  text-gray">
          <AiOutlineLoading3Quarters
            size={40}
            className="loading-animate-1 text-orange"
          />
          <p className="text-xl font-bold">Loading...</p>
        </div>
      )}

      {isSubmitting && (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-white flex-center-col gap-5  text-gray">
          <AiOutlineLoading3Quarters
            size={40}
            className="loading-animate-1 text-orange"
          />
          <p className="text-xl font-bold">Submitting...</p>
        </div>
      )}

      {uploadProgress > 0 && uploadProgress <= 100 && (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-white flex-center-col gap-5  text-gray">
          <UploadProgressBar
            style={"w-75! max-w-full!"}
            progress={uploadProgress}
          />
        </div>
      )}

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

      {/* <DevTool control={control} /> */}
    </main>
  );
};

export default NewProductForm;
