import React, { useState, memo } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { useFormContext, useWatch } from "react-hook-form";
import ErrorMessageFrom from "../../../../../Components/ui/ErrorMessageFrom";

const MainImage = () => {
  const [isDragging, setIsDragging] = useState(false);

  // Dynamically watch the "thumbnail" field value from react-hook-form for real-time preview
  const thumbnail = useWatch({
    name: "thumbnail",
  });

  // Extract form control and errors from context
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  // Process the selected single file (either from drop or browse)
  const handleFiles = (files) => {
    const file = files[0]; // Take only the first file since this is a single thumbnail upload
    if (!file) return;
    if (!file.type.startsWith("image")) return; // Validate that the file is an image

    const reader = new FileReader();

    // Convert file to Base64 string and update the form state directly
    reader.onload = (e) =>
      setValue("thumbnail", e.target.result, {
        shouldValidate: true,
        shouldDirty: true,
      });

    reader.readAsDataURL(file);
  };

  return (
    <div className="thembnail flex-start-col gap-2.5 bg-white w-full rounded-sm p-2.5 shadow-[3px_3px_5px_var(--color-gray-300)]">
      <h1 className="font-semibold">Thumbnail Image (main image)</h1>

      <div className="gap-5 w-full grow grid lg:grid-cols-2 xl:grid-cols-3">
        {/* Drag & Drop Area */}
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={`border-2 border-dashed xl:col-span-2 border-border flex-center-col gap-1.5 p-5 text-sm 
                cursor-pointer h-full rounded-sm hover:border-gray-400 ${isDragging ? "border-blue-300! bg-blue-100/50!" : ""}`}
          htmlFor="thumbnail"
        >
          <IoCloudUploadOutline size={30} className="text-orange" />
          <p className="text-gray text-center">
            Drag and drop an image here <br />
          </p>
          <p> Or</p>

          {/* Hidden File Input */}
          <input
            onChange={(e) => handleFiles(e.target.files)}
            type="file"
            id="thumbnail"
            accept="image/*" // Restricts file picker to images only
            className="hidden"
          />
          <label
            htmlFor="thumbnail"
            className="px-5 py-1.5 bg-white border border-border
                rounded-sm hover:text-orange font-bold cursor-pointer  hover:border-orange"
          >
            Browse file
          </label>
        </label>

        {/* Preview and Error Section */}
        <div className="h-50 xl:h-auto xl:max-h-58.5 bg-gray-100 rounded-sm border flex-center border-border relative">
          {thumbnail ? (
            <img
              src={thumbnail}
              className="max-w-[90%] max-h-[90%] "
              alt="Thumbnail Preview"
            />
          ) : (
            <div>
              <p className="text-gray font-semibold">No Image</p>
            </div>
          )}

          {/* Clear Thumbnail Button */}
          {thumbnail && (
            <button
              type="button" // Prevents the button from firing an accidental form submission
              onClick={() =>
                setValue("thumbnail", "", {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              className="absolute top-2.5 flex-center right-2.5 rounded-full w-6 h-6 text-sm bg-black text-white "
            >
              <FaXmark />
            </button>
          )}

          {/* Validation Error Message */}
          {errors?.thumbnail && (
            <ErrorMessageFrom
              style={"bottom-5 left-[50%] translate-x-[-50%] whitespace-nowrap"}
              message={errors.thumbnail.message}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(MainImage);
