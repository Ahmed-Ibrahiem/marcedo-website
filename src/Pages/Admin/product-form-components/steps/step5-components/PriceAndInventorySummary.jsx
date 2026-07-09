import React, { memo } from "react";
import { useFormContext } from "react-hook-form";
import VariantsSummary from "../step4-components/VariantsSummary";
import { FaRegCircleXmark, FaRegCircleCheck, FaPencil } from "react-icons/fa6";

const PriceAndInventorySummary = ({ setCurrentStep }) => {
  const { getValues } = useFormContext();
  const variants = getValues("variants");
  const cost = getValues("cost_price");
  const taxStatus = getValues("charge_tax");
  const finalPrice = getValues("current_price");
  const originalPrice = getValues("original_price");
  const shippingType = getValues("shipping_type");
  const estimated_delivery_days = getValues("estimated_delivery_days");
  const from = getValues("from");
  const isFree = getValues("is_free");
  return (
    <div className="w-full bg-white rounded-sm shadow-sm p-2.5">
      <div className="flex-between mb-2.5">
        <h1 className="font-bold">Price & Inventory Summary</h1>
        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className={btnStyle}
        >
          <FaPencil />
          <span>Edit</span>
        </button>
      </div>
      {variants.length > 0 && (
        <VariantsSummary
          containerStyle={"border border-border shadow-none!"}
          variants={variants}
        />
      )}
      <div className="w-full rounded-sm gap-5 border border-border p-2.5 mt-5 flex max-md:flex-col">
        {/* price */}
        <div className="grow  sm:border-r border-border ">
          <h2 className="font-bold">Price (Product Level)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mt-2.5">
            {variants.length === 0 && (
              <div className="flex-start-col gap-5">
                {/* Original Price */}
                <div className="box-form-style">
                  <label className="label-form-style">Original Price</label>
                  <p className="text-gray">{originalPrice}</p>
                </div>
                {/* Final Price */}
                <div className="box-form-style">
                  <label className="label-form-style">Final Price</label>
                  <p className="text-gray">{finalPrice}</p>
                </div>
              </div>
            )}
            <div className="flex-start-col gap-5">
              {/* Cost */}
              <div className="box-form-style">
                <label className="label-form-style">Cost Price:</label>
                <p className="text-gray">{cost}</p>
              </div>
              {/* Tax */}
              <div className="box-form-style">
                <label className="label-form-style">Tax Status:</label>
                <p
                  className={`p-1.5 rounded-sm text-sm text-gray bg-gray-100 w-fit font-semibold
                ${cost ? "text-green! bg-green-200!" : ""}`}
                >
                  {cost ? "Taxable" : "Untaxable"}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Inventory */}
        <div className="grow">
          <h2 className="font-bold">Shipping (Product Level)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mt-2.5">
            {/* Shipping type */}
            <div className="box-form-style">
              <label className="label-form-style">Shipping Type:</label>
              <p className="text-gray">{shippingType}</p>
            </div>
            {/* Delivery Days */}
            <div className="box-form-style">
              <label className="label-form-style">Delivery Time:</label>
              <p className="text-gray">
                {estimated_delivery_days.from} - {estimated_delivery_days.to}{" "}
                Business Days
              </p>
            </div>
            {/* From Origin */}
            <div className="box-form-style">
              <label className="label-form-style">From (Origin):</label>
              <p className="text-gray">{from}</p>
            </div>
            {/* Free Shipping */}
            <div className="box-form-style">
              <label className="label-form-style">Free Shipping:</label>
              <div
                className={`flex-start gap-1.5 ${isFree ? "text-green" : "text-red-600"}`}
              >
                {isFree ? (
                  <>
                    <FaRegCircleCheck />
                    <p>YES</p>
                  </>
                ) : (
                  <>
                    <FaRegCircleXmark />
                    <p>NO</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const btnStyle = `
flex-start max-sm:absolute max-sm:top-12.5 max-sm:right-5 gap-2.5 p-1.5 px-4 bg-white
rounded-sm border border-border h-fit hover:bg-gray-200 
`;
export default React.memo(PriceAndInventorySummary);
