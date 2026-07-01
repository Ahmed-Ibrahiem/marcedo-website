import React, { useEffect, useState, memo } from "react";
import { useFormContext } from "react-hook-form";
import { FaPlus, FaXmark } from "react-icons/fa6";
import { IoCloudUploadOutline } from "react-icons/io5";
import ErrorMessageFrom from "../../../../../Components/ui/ErrorMessageFrom";

const GallaryImages = () => {
  const [isDragging, setIsDragging] = useState(false);

  // Connect with react-hook-form context
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  // Initialize local state from the current form value (e.g. edit mode) or an empty array
  const [gallary, setGallery] = useState(() => getValues("gallery") || []);

  // Process uploaded or dropped files
  const handleFiles = (files) => {
    [...files].forEach((file) => {
      // Skip anything that isn't an image
      if (!file.type.startsWith("image")) return;

      const reader = new FileReader();

      // Once the image finishes converting to Base64:
      // 1. Append it to local state using a functional update (avoids stale
      //    closure issues when multiple files are uploaded at once)
      // 2. Sync the resulting value to RHF right away, so validation only
      //    runs on a real user action (upload/delete), not on initial mount
      reader.onload = (e) => {
        setGallery((prev) => {
          const updated = [...prev, e.target.result];
          setValue("gallery", updated, {
            shouldDirty: true,
            shouldValidate: true,
          });
          return updated;
        });
      };

      reader.readAsDataURL(file);
    });
  };

  // Remove an image by index and sync the updated array to RHF
  const handleDelete = (index) => {
    setGallery((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      setValue("gallery", updated, {
        shouldDirty: true,
        shouldValidate: true,
      });
      return updated;
    });
  };

  return (
    <div className="rounded-sm text-sm! bg-white shadow-[3px_3px_5px_var(--color-gray-300)] p-2.5">
      <h1 className="font-semibold">Gallary Images</h1>

      <div className="flex-start-col w-full mt-2.5 gap-2.5">
        {/* Drag & Drop Zone Label */}
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
          htmlFor="gallery"
          className={`border-2 border-dashed xl:col-span-2 border-border flex-center-col gap-1.5 p-2.5 text-sm w-full
                cursor-pointer rounded-sm hover:border-gray-400 ${isDragging ? "border-blue-300! bg-blue-100/50!" : ""}`}
        >
          {/* Hidden File Input */}
          <input
            onChange={(e) => handleFiles(e.target.files)}
            multiple
            id="gallery"
            accept="image/*"
            type="file"
            className="hidden"
          />
          <IoCloudUploadOutline size={30} className="text-orange" />
          <p className="text-gray">Drag and drop an image</p>
          <p>Or</p>
          <label
            htmlFor="gallery"
            className="px-5 py-1.5 bg-white border border-border
                rounded-sm hover:text-orange font-bold cursor-pointer  hover:border-orange"
          >
            Browse file
          </label>
        </label>

        {/* Gallery Preview Section */}
        <div className="w-full h-20 flex-start gap-5 ">
          {gallary?.length > 0 && (
            <div className="flex-start h-full gap-2.5 overflow-x-auto">
              {gallary.map((imageSrc, index) => {
                return (
                  <div
                    key={index}
                    className="h-full min-w-18 w-20 flex-center bg-gray-200 rounded-sm relative border border-border"
                  >
                    {/* Delete Button - type="button" prevents accidental form submission */}
                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      className="absolute text-xs right-1 top-1 w-5 h-5 bg-black text-white flex-center rounded-full"
                    >
                      <FaXmark />
                    </button>
                    <img
                      src={imageSrc}
                      alt={`Preview ${index}`}
                      className=" max-h-[90%]"
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick "Add More" Trigger */}
          <label
            htmlFor="gallery"
            className=" flex-center-col gap-2.5 p-2.5 border-2 border-border h-full hover:border-gray-400
                        border-dashed rounded-sm text-gray max-w-20 text-xs! cursor-pointer hover:text-black-lite"
          >
            <FaPlus />
            <p>Add More</p>
          </label>
          {errors?.gallery && (
            <ErrorMessageFrom
              style={"relative! -bottom-7"}
              message={errors.gallery.message}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(GallaryImages);
