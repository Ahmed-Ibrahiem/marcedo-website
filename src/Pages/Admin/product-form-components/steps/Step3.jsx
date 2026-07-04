import React, { useEffect, useState } from "react";
import { color, hex, motion } from "framer-motion";
import { useFormContext, useWatch } from "react-hook-form";
import { getAttributesByCategoriesId } from "../../../../services/categoriesPageServices";
import { FaPencil, FaXmark } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DropDownList from "../../components/DropDownList";
import ErrorMessageFrom from "../../../../Components/ui/ErrorMessageFrom";

const Step3 = ({ ...props }) => {
  const [attributiesList, setAttributesList] = useState(null);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [sku, setSku] = useState("");
  const [prodColor, setProdColor] = useState({ name: "", hex: "#000000" });
  const [missingMessage, setMissingMessage] = useState({
    type: "",
    message: "",
  });
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  const variants = useWatch({ name: "variants" });
  const colorPalette = useWatch({ name: "colorPalette" });

  const [attributes, setAttributes] = useState([]);
  const [isError, setIsErrors] = useState(false);

  const setDefaultvariant = (attri) => {
    const handleAttribute = Object.fromEntries(
      attri.map((att) => [att.key, ""]),
    );

    setAttributesList(handleAttribute);
  };

  useEffect(() => {
    const getAttributesData = async () => {
      try {
        const categories = getValues("category_ids");
        let deepestCategories = [];

        const level1 = [...categories.filter((cat) => cat.level === 1)];
        const level2 = [...categories.filter((cat) => cat.level === 2)];

        if (level2.length > 0) deepestCategories = level2.map((cat) => cat.id);
        else deepestCategories = level1.map((cat) => cat.id);

        const req = await getAttributesByCategoriesId(["cat_003"]);
        setAttributes(req);
        setDefaultvariant(req);
      } catch (errors) {
        console.log(errors);
        setIsErrors(true);
      }
    };
    getAttributesData();
  }, []);

  const handleAddVaraints = () => {
    const areThereVariant = Object.fromEntries(
      Object.entries(attributiesList).filter(([key, value]) => value.trim()),
    );
    const isColorSelect = prodColor.name.trim();
    if (Object.keys(areThereVariant).length === 0 && !isColorSelect) {
      setMissingMessage({
        type: "variants",
        message: "Please Select At Least One Variant ",
      });
      return;
    }
    if (price <= 0) {
      setMissingMessage({
        type: "price",
        message: "Please Select Product Price",
      });
      return;
    }
    if (stock <= 0) {
      setMissingMessage({
        type: "stock",
        message: "Please Select Product Stock",
      });
      return;
    }
    if (!sku.trim()) {
      setMissingMessage({
        type: "sku",
        message: "Please Select Sku Product",
      });
      return;
    }

    const productVariant = {
      id: crypto.randomUUID(),
      attributes: prodColor.name
        ? { ...areThereVariant, color: prodColor.name }
        : areThereVariant,
      price,
      stock,
      sku,
    };
    setValue(
      "colorPalette",
      prodColor.name
        ? { ...colorPalette, [prodColor.name]: prodColor.hex }
        : colorPalette,
    );

    setValue("variants", [...variants, productVariant]);
    setAttributesList((prev) =>
      Object.fromEntries(Object.entries(prev).map(([key, value]) => [key, ""])),
    );
    setPrice(0);
    setStock(0);
    setSku("");
    setProdColor({ name: "", hex: "#000000" });
  };

  useEffect(() => {
    setMissingMessage({ message: "", type: "" });
  }, [price, stock, sku, attributiesList]);
  return (
    <motion.form
      {...props}
      onSubmit={(e) => e.preventDefault()}
      className="w-full min-h-full h-full text-sm flex-start-col gap-4 grow "
    >
      <div className="grid  grid-cols-1 2xl:grid-cols-4 h-full flex-wrap gap-5 w-full">
        <div className="flex-start-col h-full gap-4 grow 2xl:col-span-3 p-3.5 bg-white shadow-sm rounded-sm">
          <h1 className="font-bold">Add Product Variants </h1>
          {attributes.length > 0 && (
            <div className="relative flex flex-col sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 min-[900px]:grid-cols-4 2xl:grid-cols-4  w-full gap-5">
              {attributes.map((attribute) => {
                return (
                  <div
                    className={`relative ${attribute.key === "color" ? "order-50 col-span-2" : ""}`}
                    key={attribute.id}
                  >
                    <p className="capitalize label-form-style mb-1.5">
                      {attribute.name}
                    </p>
                    {attribute.key !== "color" && (
                      <DropDownList
                        listStyle={`justify-between! `}
                        opionsStyle={"w-full! relative!"}
                        list={attribute.values.map(({ label, value }, i) => ({
                          id: i,
                          name: label,
                        }))}
                        currentSelect={
                          attributiesList[attribute.key]
                            ? attributiesList[attribute.key]
                            : `Select ${attribute.name}`
                        }
                        optionFun={(item) => {
                          setAttributesList((prev) => ({
                            ...prev,
                            [attribute.key]: item.name,
                          }));
                        }}
                      >
                        <span
                          className="p-1.5 hover:bg-orange-lite text-sm!"
                          onClick={() => {
                            setAttributesList((prev) => ({
                              ...prev,
                              [attribute.key]: "",
                            }));
                          }}
                        >
                          -- none --
                        </span>
                      </DropDownList>
                    )}
                    {attribute.key === "color" && (
                      <div className="flex-start gap-2.5">
                        {/* color name */}
                        <div className="flex-start gap-1.5">
                          <label
                            className="label-form-style"
                            htmlFor="color-name"
                          >
                            Name
                          </label>
                          <input
                            value={prodColor.name}
                            onChange={(e) =>
                              setProdColor((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            id="color-name"
                            placeholder="Enter your color name"
                            type="text"
                            className="input-form-style"
                          />
                        </div>
                        {/* color hex */}
                        <div className="flex-start gap-1.5">
                          <label
                            className="label-form-style"
                            htmlFor="hex-color"
                          >
                            Hex
                          </label>
                          <input
                            value={prodColor.hex}
                            onChange={(e) =>
                              setProdColor((prev) => ({
                                ...prev,
                                hex: e.target.value,
                              }))
                            }
                            id="hex-color"
                            placeholder="Enter your color name"
                            type="color"
                            className=""
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {missingMessage.type === "variants" && (
                <ErrorMessageFrom
                  style={"-bottom-7"}
                  message={missingMessage.message}
                />
              )}
            </div>
          )}
          {attributes.length === 0 && (
            <div className="relative flex flex-col sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 min-[900px]:grid-cols-4 2xl:grid-cols-4  w-full gap-5">
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
            </div>
          )}
          <div className="mt-auto sm:grid sm:grid-cols-3 gap-5 w-full">
            <div className="box-form-style mt-2.5 relative">
              <label className="label-form-style" htmlFor="price">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                id="price"
                placeholder="Enter your price"
                className="input-form-style"
              />
              {missingMessage.type === "price" && (
                <ErrorMessageFrom message={missingMessage.message} />
              )}
            </div>
            <div className="box-form-style mt-2.5 relative">
              <label className="label-form-style" htmlFor="stock">
                Stock
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                id="stock"
                placeholder="Enter your stock"
                className="input-form-style"
              />
              {missingMessage.type === "stock" && (
                <ErrorMessageFrom message={missingMessage.message} />
              )}
            </div>
            <div className="box-form-style mt-2.5 relative">
              <label className="label-form-style" htmlFor="sku">
                SKU
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                id="sku"
                placeholder="Enter your sku product"
                className="input-form-style"
              />
              {missingMessage.type === "sku" && (
                <ErrorMessageFrom message={missingMessage.message} />
              )}
            </div>
          </div>
          <button
            onClick={() => handleAddVaraints()}
            type="button"
            className="p-1.5 px-2.5 bg-orange rounded-sm text-white font-semibold border-2 border-orange hover:text-orange hover:bg-transparent active:scale-75"
          >
            Add Variant
          </button>
        </div>
        <div className="h-full flex-start-col gap-2.5 w-full p-3.5 bg-white shadow-sm rounded-sm grow">
          <h1 className="font-semibold">Variants Added</h1>
          <div className="flex-start-col gap-2.5 max-h-85 overflow-auto pr-2.5 w-full grow ">
            {variants.map((variant) => {
              return (
                <div
                  key={variant.id}
                  className="relative input-form-style flex-between gap-3.5"
                >
                  <p>
                    {Object.entries(variant.attributes)
                      .map(([key, value]) => value)
                      .join("/ ")}
                  </p>
                  <button
                    onClick={() => {
                      setValue(
                        "variants",
                        variants.filter((item) => item.id !== variant.id),
                      );
                    }}
                    className="w-4.5 h-4.5 rounded-full text-[10px] bg-black text-white flex-center "
                  >
                    <FaXmark />
                  </button>
                </div>
              );
            })}
            {variants.length <= 0 && (
              <div className="flex-center-col w-full gap-2.5 h-full">
                <h2 className="font-semibold">--- No Variants Yet ---</h2>
                <p className="text-gray">Add your variants</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.form>
  );
};

const SkeletonLoading = () => {
  return (
    <div className="box-form-style max-w-full">
      <Skeleton width={100} height={15} />
      <Skeleton className="w-30! md:w-50!" height={35} />
    </div>
  );
};

export default Step3;
