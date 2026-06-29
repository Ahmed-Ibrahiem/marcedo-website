import React, { memo, useState } from "react";
import ErrorMessageFrom from "../../../../../Components/ui/ErrorMessageFrom";
import { useFormContext, useWatch } from "react-hook-form";

const ShortDescription = () => {
  const [descContent, setDescContent] = useState("");
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const shortDescWatch = useWatch({
    name: "short_description",
  });
  return (
    <div className={`box-form-style`}>
      <label htmlFor="name" className={`label-form-style`}>
        Short Description
      </label>
      <div className="relative">
        <textarea
          
          {...register("short_description")}
          className={`input-form-style h-20`}
          placeholder="Enter short description"
        />
        <p className="absolute right-2.5 bottom-2.5 text-xs font-semibold text-gray">
          {shortDescWatch.length}/200
        </p>
      </div>
      {errors?.short_description && (
        <ErrorMessageFrom message={errors.short_description.message} />
      )}
    </div>
  );
};

export default React.memo(ShortDescription);
