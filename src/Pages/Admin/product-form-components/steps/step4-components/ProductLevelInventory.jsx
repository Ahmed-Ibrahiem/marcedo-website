import React, { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import ErrorMessageFrom from "../../../../../Components/ui/ErrorMessageFrom";
import InputNumaric from "../../components/InputNumaric";

const ProductLevelInventory = () => {
  const {
    control,
    register,
    formState: { errors },
    clearErrors,
    trigger,
  } = useFormContext();
  const trackInventory = useWatch({ name: "track_inventory" });
  const variants = useWatch({ name: "variants" });

 
  useEffect(() => {
    if (!trackInventory) {
      clearErrors("low_stock_threshold");
    } else {
      trigger("low_stock_threshold");
    }
  }, [trackInventory, clearErrors, trigger]);

  return (
    <div className="w-full bg-white flex-start-col gap-2.5 rounded-sm shadow-sm  p-2.5">
      <h1 className="font-semibold">Inventory (Product-level)</h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-5 w-full">
        {/* stock */}
        {variants.length === 0 && (
          <InputNumaric
            inputName={"Stock"}
            placeholder={"Enter your product stock"}
            {...register("quantity")}
            
          >
            {errors?.quantity && (
              <ErrorMessageFrom message={errors.quantity.message} />
            )}
          </InputNumaric>
        )}
        {/* SKU */}
        {variants.length === 0 && (
          <Controller
            control={control}
            name="sku"
            render={({ field }) => {
              return (
                <div className="box-form-style">
                  <p className="label-form-style">SKU</p>
                  <input
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                    type="text"
                    className="input-form-style"
                    placeholder={"Enter your product sku"}
                  />
                  {errors?.sku && (
                    <ErrorMessageFrom message={errors.sku.message} />
                  )}
                </div>
              );
            }}
          />
        )}
        {/* Track Inventory */}
        <div className="box-form-style">
          <p className="label-form-style">Track Inventory</p>
          <div className="flex-start gap-2.5">
            <input
              type="checkbox"
              className="switch-input-style"
              {...register("track_inventory")}
            />
            <p className="text-sm text-gray line-clamp-1">
              Track inventory for this product
            </p>
          </div>
        </div>
        {/* Threshold */}
        <InputNumaric
          
          className={`input-form-style ${!trackInventory ? " bg-gray-100 pointer-events-none text-gray" : ""}`}
          inputName={"Low Stock Threshold"}
          placeholder="Enter your threshold"
          {...register("low_stock_threshold")}
        >
          {errors?.low_stock_threshold && (
            <ErrorMessageFrom message={errors.low_stock_threshold.message} />
          )}
        </InputNumaric>
      </div>
    </div>
  );
};

export default ProductLevelInventory;
