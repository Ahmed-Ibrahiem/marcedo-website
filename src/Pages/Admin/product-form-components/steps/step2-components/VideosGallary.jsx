import React, { useState, memo } from "react";
import { BsPlayBtn } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import ErrorMessageFrom from "../../../../../Components/ui/ErrorMessageFrom";
import { useFormContext } from "react-hook-form";

const VideosGallary = () => {
  const [linkText, setLinkText] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const { setValue, getValues } = useFormContext();
  const videos = getValues("videos") || [];

  const handleAddLink = () => {
    if (!linkText.trim()) {
      setWarningMessage("Enter your link first");
      return;
    }
    setValue("videos", [...videos, linkText], {
      shouldDirty: true,
      shouldValidate: true,
    });
    setLinkText("");
  };

  return (
    <div className="w-full grid  md:grid-cols-2  gap-5 text-sm min-h-fit grow p-2.5 bg-white rounded-sm shadow-md pb-5 xl:pb-0">
      <div className="flex-start-col w-full gap-1">
        <h1 className="font-semibold">Product Videos</h1>
        <div className="flex flex-col sm:flex-row sm:items-center   gap-2.5 w-full relative">
          <input
            value={linkText}
            onChange={(e) => {
              setLinkText(e.target.value);
              setWarningMessage("");
            }}
            type="text"
            className="input-form-style"
            placeholder="Paste YouTube or Vimeo link here"
          />
          <button
            onClick={() => handleAddLink()}
            type="button"
            className="px-3 max-w-fit py-2 rounded-sm border whitespace-nowrap border-border hover:text-white hover:bg-orange font-semibold"
          >
            Add link
          </button>
          {warningMessage.trim() && (
            <ErrorMessageFrom message={warningMessage} />
          )}
        </div>
      </div>
      <div className="flex-start-col gap-1">
        <h2 className="font-semibold">Added Videos</h2>
        <div className="max-h-18 overflow-y-auto flex-start-col w-full gap-1">
          {videos.length > 0 && (
            <>
              {videos.map((link, index) => (
                <div
                  key={index}
                  className="flex-between gap-3 rounded-sm w-full border border-border"
                >
                  <div className=" grow flex-start gap-3.5 ">
                    <div className="p-1.5 border-r border-border">
                      <BsPlayBtn size={20} />
                    </div>
                    <p className="line-clamp-1">{link}</p>
                  </div>
                  <button
                    onClick={() =>
                      setValue(
                        "videos",
                        [...videos.filter((v, i) => i !== index)],
                        { shouldDirty: true, shouldValidate: true },
                      )
                    }
                    type="button"
                    className={itemBtnStyle}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </>
          )}
          {videos.length === 0 && (
            <p className="text-gray ">---- No Videos Yet ----</p>
          )}
        </div>
      </div>
    </div>
  );
};

const itemBtnStyle = `
text-sm min-w-6 w-6 min-h-6 h-6 rounded-sm border border-orange flex-center bg-orange text-white
mr-1.5
`;
export default React.memo(VideosGallary);
