import { useRef, useState } from "react";
import { FaAngleRight, FaArrowLeft, FaXmark } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { useReviewsContext } from "../../../Context/Reviews_Provider";
import { useReviewsUIContext } from "../../../Context/ReviewsUIProvider";
const ReviewStepFour = () => {
  const { setIsOpenReviewForm, productData } = useReviewsContext();
  const { setCurrentStep } = useReviewsUIContext();

  const inputRef = useRef(null);
  const [previews, setPreviews] = useState([]);
  const [isDropDown, setIsDropDown] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files) => {
    [...files].forEach((file) => {
      if (!file.type.startsWith("image") && !file.type.startsWith("video"))
        return;
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews((prev) => [
          ...prev,
          { src: e.target.result, id: Date.now() + Math.random() },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.target.files);
  };

  const handleSelectedTags = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prev) => prev.filter((t) => t !== tag));
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  return (
    <div className="review-content w-full flex flex-col justify-between pt-7.5 pb-1.5  gap-5 h-full fade-in-animate">
      {/* Head */}
      <div className="flex-center-col w-full gap-1.5">
        <h2 className="text-xl font-semibold">Share a picture or video</h2>
        <p className="text-sm text-gray ">
          Upload a photo or video to support your review.
        </p>
      </div>

      <div className="grow flex-start-col gap-7.5 w-full">
        {/* start upload and review media review */}
        <div className="review-media-container w-full flex-start-col gap-2.5">
          {/* Start Upload files */}
          <div
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
            onClick={() => inputRef.current.click()}
            className={`upload-files flex-center-col gap-5 p-7.5 py-7.5 md:py-12 w-full border-2 
           border-dashed cursor-pointer hover:border-gray/60 rounded-sm hover:bg-gray-light/80 
           ${isDragging ? "border-blue-400! bg-blue-50!" : "border-border!"}`}
          >
            <FiUpload className="text-4xl text-gray " />
            <p className="text-gray text-center">
              <b>click to upload</b> or drag and drop
            </p>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              className="hidden"
              ref={inputRef}
              onChange={(e) => handleDrop(e)}
            />
          </div>

          {/* Start Display media */}
          <div className="flex-start gap-2 w-full overflow-auto pb-2">
            {previews.map((media, index) => {
              return (
                <div
                  key={index}
                  className="min-w-18 w-18 h-20 bg-gray-light border border-border rounded-sm flex-center"
                >
                  <img
                    src={media.src}
                    className="max-w-[90%] object-contain max-h-[90%]"
                    alt="" loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="drop-down-list w-full justify-between! p-2.5! text-[16px]! "
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsDropDown((prev) => !prev);
          }}
        >
          <p onClick={(e) => setIsDropDown((prev) => !prev)}>
            {selectedTags.length === 0
              ? "select your tags..."
              : selectedTags.join(", ")}
          </p>
          <FaAngleRight />
          {isDropDown && (
            <ul className="options">
              {productData.tags.map((tag, index) => {
                return (
                  <li
                    className="flex-start  p-0! pl-1.5! hover:bg-orange-lite rounded-sm"
                    key={index}
                  >
                    <input
                      type="checkbox"
                      className="checkbox"
                      id={tag}
                      onChange={() => handleSelectedTags(tag)}
                    />
                    <label
                      className="cursor-pointer grow p-1 px-1.5"
                      htmlFor={tag}
                    >
                      {tag}
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* action buttons */}
      <div className="flex-between w-full mt-10">
        <button
          type="button"
          className="font-semibold flex-start gap-2.5"
          onClick={() => setCurrentStep((prev) => prev - 1)}
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>
        <button
          onClick={() => setCurrentStep((prev) => prev + 1)}
          type="button"
          className="font-semibold py-2.5 px-5 rounded-sm bg-orange-lite! hover:text-white! hover:bg-orange!"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewStepFour;
