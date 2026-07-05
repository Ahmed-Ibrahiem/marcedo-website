import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useFormContext, useWatch } from "react-hook-form";
import { getAttributesByCategoriesId } from "../../../../services/categoriesPageServices";
import { FaPencil, FaXmark, FaRegTrashCan } from "react-icons/fa6";
import { FaPercent } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DropDownList from "../../components/DropDownList";
import ErrorMessageFrom from "../../../../Components/ui/ErrorMessageFrom";
import InputNumaric from "../components/InputNumaric";

const Step3 = ({ setHasVariants, ...props }) => {
  const currencyList = [
    { name: "EGP", id: 1 },
    { name: "USD", id: 2 },
    { name: "EUR", id: 3 },
  ];
  const [attributiesList, setAttributesList] = useState(null);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [sku, setSku] = useState("");
  const [currency, setCurrency] = useState("EGP");
  const [prodColor, setProdColor] = useState({ name: "", hex: "#000000" });
  const [discount_percentage, setDiscount_percentage] = useState("0");
  const [threshold, setThreshold] = useState(0);
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
        console.log(deepestCategories)
        const req = await getAttributesByCategoriesId(deepestCategories);
        setAttributes(req);
        setDefaultvariant(req);
      } catch (errors) {
        console.log(errors);
        setIsErrors(true);
      }
    };
    getAttributesData();
  }, []);

  useEffect(() => {
    setHasVariants(variants.length > 0);
  }, [variants]);

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
    if (!/^\S+$/.test(sku)) {
      setMissingMessage({
        type: "sku",
        message: 'SKU cannot contain spaces, You can use "-"',
      });
      return;
    }

    const productVariant = {
      id: crypto.randomUUID(),
      attributes: prodColor.name
        ? { ...areThereVariant, color: prodColor.name }
        : areThereVariant,
      original_price: Number(price),
      stock: Number(stock),
      sku,
      discount_percentage: Number(discount_percentage),
      currency,
      threshold: Number(threshold),
      price: Number(
        Math.round(+price - price * (+discount_percentage / 100)).toFixed(1),
      ),
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
    setDiscount_percentage(0);
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
        {/* Variants Options */}
        <div className="flex-start-col h-full gap-4 grow 2xl:col-span-3 p-3.5 bg-white shadow-sm rounded-sm">
          <h1 className="font-bold">Add Product Variants </h1>
          {attributes.length > 0 && (
            <div className="relative flex flex-col sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 min-[900px]:grid-cols-4 2xl:grid-cols-4  w-full gap-5">
              {/* Variants Inputs */}
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
          {/* Skeleton Loading */}
          {attributes.length === 0 && (
            <div className="relative flex flex-col sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 min-[900px]:grid-cols-4 2xl:grid-cols-4  w-full gap-5">
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
              <SkeletonLoading />
            </div>
          )}

          {/* Price , stock , sku */}
          <div className="mt-auto sm:grid sm:grid-cols-4 gap-5 w-full">
            {/* Price */}
            <InputNumaric
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              inputName={"Original Price"}
              placeholder={"Enter your price"}
            >
              <DropDownList
                currentSelect={currency}
                optionFun={(item) => setCurrency(item.name)}
                list={currencyList}
                listStyle={
                  "absolute! right-0! bottom-0! gap-0! text-sm! shadow-none! justify-between! w-17! min-w-10!"
                }
                opionsStyle={"w-full!"}
              />

              {errors.original_price && (
                <ErrorMessageFrom message={errors.original_price.message} />
              )}
            </InputNumaric>

            {/* Discount */}
            <InputNumaric
              value={discount_percentage}
              onBlur={(e) => {
                if (
                  e.target.value.trim() === "" ||
                  +discount_percentage.trim() < 0
                ) {
                  setDiscount_percentage("0");
                } else if (+discount_percentage.trim() > 100)
                  setDiscount_percentage(99);
              }}
              onChange={(e) => {
                setDiscount_percentage(e.target.value);
              }}
              id="price"
              placeholder="Enter your price"
              inputName={"Discount Percentage"}
            >
              <FaPercent
                size={12}
                className="absolute right-2.5 text-gray bottom-2.5 mt-0"
              />
            </InputNumaric>
            {/* Stock */}
            <InputNumaric
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Enter your stock"
              inputName={"Stock"}
            >
              {missingMessage.type === "stock" && (
                <ErrorMessageFrom message={missingMessage.message} />
              )}
            </InputNumaric>
            {/* Low Stock Threshold */}
            <InputNumaric
              value={threshold}
              onChange={(e) => {
                setThreshold(e.target.value);
              }}
              inputName={"Low Stock Threshold"}
            />
            {/* Sku */}
            <div className="box-form-style relative">
              <label className="label-form-style" htmlFor="sku">
                SKU
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => {
                  setSku(e.target.value.toUpperCase());
                }}
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
                  className="relative input-form-style flex-start-col gap-1.5 text-xs! w-full"
                >
                  <h4 className="font-semibold ">{variant.sku}</h4>

                  <div className="grid grid-cols-3 gap-2.5 w-full">
                    {Object.entries(variant.attributes).map(([key, value]) => {
                      return (
                        <div key={key}>
                          <span>{key.split("_").join(" ")}:</span>{" "}
                          <p className="text-gray">{value}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-full flex-start  gap-5">
                    <div className="flex-start gap-2.5">
                      <span>Final Price:</span>
                      <p>
                        {variant.price} {variant.currency}
                      </p>
                      {variant.discount_percentage > 0 && (
                        <p className="line-through">{variant.original_price}</p>
                      )}
                    </div>
                    <div className="flex-start gap-1.5">
                      <span>Stock: </span>
                      <p>{variant.stock}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setValue(
                        "variants",
                        variants.filter((item) => item.id !== variant.id),
                      );
                    }}
                    className="absolute top-2.5 right-2.5 w-4.5 h-4.5 rounded-full text-[10px] bg-black text-white flex-center "
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
