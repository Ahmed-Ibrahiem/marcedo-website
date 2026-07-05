import React, { useEffect, useState } from "react";
import DropDownList from "../../../components/DropDownList";
import { FaPercent } from "react-icons/fa";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import InputNumaric from "../../components/InputNumaric";
import ErrorMessageFrom from "../../../../../Components/ui/ErrorMessageFrom";

const ProductLevelPricing = () => {
  const { setValue, control, register } = useFormContext();
  const currentPrice = useWatch({ name: "current_price" });
  const originalPrice = useWatch({ name: "original_price" });
  const discountPercentage = useWatch({ name: "discount_percentage" });
  const currency = useWatch({ name: "currency" });
  const variants = useWatch({ name: "variants" });
  const {
    formState: { errors },
  } = useFormContext();
  const currencyList = [
    { name: "EGP", id: 1 },
    { name: "USD", id: 2 },
    { name: "EUR", id: 3 },
  ];

  useEffect(() => {
    const price = originalPrice - (originalPrice * discountPercentage) / 100;
    setValue("current_price", price);
  }, [originalPrice, discountPercentage]);
  return (
    <div className="w-full bg-white flex-start-col gap-2.5 rounded-sm shadow-sm  p-2.5">
      <h1 className="font-semibold">Pricing (Product-level)</h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-5 w-full">
        {/* Original Price */}
        {variants.length === 0 && (
          <Controller
            defaultValue={0}
            control={control}
            name="original_price"
            render={({ field }) => {
              return (
                <InputNumaric
                  inputName={"Original Price"}
                  placeholder={"Enter your price"}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  <Controller
                    name="currency"
                    control={control}
                    defaultValue={"EGP"}
                    render={({ field: currencyField }) => {
                      return (
                        <DropDownList
                          currentSelect={currencyField.value}
                          optionFun={(item) =>
                            currencyField.onChange(item.name)
                          }
                          list={currencyList}
                          listStyle={
                            "absolute! right-0! bottom-0! shadow-none! justify-between! min-w-10!"
                          }
                          opionsStyle={"w-full!"}
                        />
                      );
                    }}
                  />
                  {errors.original_price && (
                    <ErrorMessageFrom message={errors.original_price.message} />
                  )}
                </InputNumaric>
              );
            }}
          />
        )}
        {/* Discount */}
        {variants.length === 0 && (
          <InputNumaric
            inputName={"Discount Percentage (Optional)"}
            placeholder="Enter your discount"
            {...register("discount_percentage")}
          >
            <FaPercent className="text-xs text-gray absolute bottom-2.5 right-2.5" />
          </InputNumaric>
        )}
        {/* Final Price */}
        {variants.length === 0 && (
          <div className="box-form-style">
            <p className="label-form-style">Final Price</p>
            <div className="input-form-style flex-between bg-gray-100 text-gray ">
              <span>{currentPrice}</span>
              <p>{currency}</p>
            </div>
          </div>
        )}
        {/* Cost Price */}
        <InputNumaric
          inputName={"Cost Price (Optional,Internal Only)"}
          {...register("cost_price")}
          placeholder={"Enter your cost price"}
        >
          <div className="absolute bottom-0 right-0 p-1.5 text-sm border border-border rounded-sm text-gray bg-gray-100">
            {currency}
          </div>
        </InputNumaric>
        {/* Charge Tax */}
        <div className="box-form-style">
          <p className="label-form-style">Tax Status</p>
          <div className="flex-start gap-2.5">
            <input
              type="checkbox"
              className="switch-input-style"
              {...register("charge_tax")}
            />
            <p className="text-sm text-gray">Charge tax on this product</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLevelPricing;
