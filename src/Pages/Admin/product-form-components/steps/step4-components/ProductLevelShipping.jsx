import React, { useEffect } from "react";
import DropDownList from "../../../components/DropDownList";
import { Controller, useFormContext, useWatch } from "react-hook-form";

const ProductLevelShipping = () => {
  const estimatedDeliveryDays = useWatch({
    name: "estimated_delivery_days",
    defaultValue: { from: 3, to: 5 },
  });
  const shippingType = useWatch({ name: "shipping_type" });
  const { setValue, register } = useFormContext();
  const shippingDefaults = [
    { id: 1, name: "Standard Shipping" },
    { id: 2, name: "Express Shipping" },
  ];

  useEffect(() => {
    let days;
    if (shippingType === "Standard Shipping") days = { from: 3, to: 5 };
    if (shippingType === "Express Shipping") days = { from: 1, to: 2 };

    setValue("estimated_delivery_days", days);
  }, [shippingType]);
  return (
    <div className="w-full bg-white grow flex-start-col gap-2.5 rounded-sm shadow-sm  p-2.5">
      <h1 className="font-semibold">Inventory (Product-level)</h1>
      <div className="w-full grid md:grid-cols-3 xl:grid-cols-4 gap-5">
        {/* Shipping Type */}
        <Controller
          name="shipping_type"
          render={({ field }) => {
            return (
              <div className="box-form-style">
                <p className="label-form-style">Shipping Type</p>
                <DropDownList
                  listStyle={""}
                  opionsStyle={"w-full!"}
                  list={shippingDefaults}
                  currentSelect={field.value}
                  optionFun={(item) => field.onChange(item.name)}
                />
              </div>
            );
          }}
        />
        {/* estimated_delivery_days */}
        <div className="box-form-style">
          <p className="capitalize label-form-style">estimated delivery days</p>
          <div className="flex-start gap-2.5">
            <div className="from relative grow">
              <div className="input-form-style text-gray bg-gray-100 w-full">
                {estimatedDeliveryDays.from}
              </div>
              <p className="absolute text-gray -top-2  left-2.5 text-xs px-1">
                From
              </p>
            </div>
            <span>-</span>
            <div className="to relative grow">
              <div className="input-form-style text-gray bg-gray-100 w-full">
                {estimatedDeliveryDays.to}
              </div>
              <p className="absolute text-gray -top-2  left-2.5 text-xs px-1">
                To
              </p>
            </div>
          </div>
        </div>
        {/* from */}
        <div className="box-form-style">
          <p className="capitalize label-form-style">From (Shipping Origin)</p>
          <input
            type="text"
            placeholder="Enter Shipping Origin"
            className="input-form-style"
            {...register("from")}
          />
        </div>
        <div className="box-form-style">
          <p className="label-form-style">Track Inventroy</p>
          <div className="flex-start gap-2.5">
            <input
              type="checkbox"
              className="switch-input-style"
              {...register("is_free")}
            />
            <p className="text-sm text-gray">Free shipping for this product</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLevelShipping;
