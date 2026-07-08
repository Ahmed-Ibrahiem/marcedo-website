import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { GrCircleAlert } from "react-icons/gr";

const VisibilityAndMarketing = () => {
  const { register, control } = useFormContext();
  return (
    <div className="w-full bg-white rounded-sm shadow-sm p-2.5">
      <h1 className="font-bold mb-2.5">Visibility & Marketing</h1>
      <div className="w-full flex gap-5 border border-border p-2.5 rounded-sm">
        {/* Visibility */}
        <div className="flex-start-col grow gap-2.5 border-r border-border">
          <h3 className="font-bold">Publish Status</h3>
          <div className="flex-start-col gap-2.5">
            <Controller
              name="is_active"
              control={control}
              render={({ field }) => {
                return (
                  <>
                    {/* Draft Input */}
                    <div className="flex gap-2.5">
                      <input
                        id="draft-status"
                        type="radio"
                        name="is_active"
                        checked={!field.value}
                        onChange={(e) => field.onChange(!e.target.checked)}
                        className="radio-option max-h-fit"
                      />
                      <div className="flex-start-col gap-1 5">
                        <label
                          htmlFor="draft-status"
                          className="font-bold cursor-pointer"
                        >
                          Save As Draft
                        </label>
                        <p className="text-gray">
                          Save product as draft and publish it later
                        </p>
                      </div>
                    </div>
                    {/* Publish Input */}
                    <div className="flex gap-2.5">
                      <input
                        id="publish-status"
                        type="radio"
                        name="is_active"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="radio-option max-h-fit"
                      />
                      <div className="flex-start-col gap-1 5">
                        <label
                          htmlFor="publish-status"
                          className="font-bold cursor-pointer"
                        >
                          Publish Now
                        </label>
                        <p className="text-gray">
                          Make product live and visible to customers
                        </p>
                      </div>
                    </div>
                  </>
                );
              }}
            />
          </div>
        </div>
        {/* Marketing */}
        <div className="flex-start-col grow gap-5">
          {/* Featured Product */}
          <div className="flex gap-2.5">
            <input
              id="featured"
              type="checkbox"
              className="switch-input-style"
              {...register("is_featured")}
            />
            <div className="flex-start-col gap-1.5">
              <label
                htmlFor="featured"
                className="font-bold flex-start gap-1.5 cursor-pointer"
              >
                Featured Product <GrCircleAlert className="text-gray" />
              </label>
              <p className="text-gray">show this product in featured section.</p>
            </div>
          </div>
          {/* Best Seller Product */}
          <div className="flex gap-2.5">
            <input
              id="featured"
              type="checkbox"
              className="switch-input-style"
              {...register("is_featured")}
            />
            <div className="flex-start-col gap-1.5">
              <label
                htmlFor="featured"
                className="font-bold flex-start gap-1.5 cursor-pointer"
              >
                Best Seller <GrCircleAlert className="text-gray" />
              </label>
              <p className="text-gray">Make this product as best seller.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisibilityAndMarketing;
