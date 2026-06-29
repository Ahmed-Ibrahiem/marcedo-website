import React, { useState } from "react";
import AddBlockPopup from "../../components/AddBlockPopup";
import { FaPlus } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { Controller, useFormContext } from "react-hook-form";
import ErrorMessageFrom from "../../../../../Components/ui/ErrorMessageFrom";
import { FaHeading } from "react-icons/fa6";
import { RxText } from "react-icons/rx";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { HiMiniNumberedList } from "react-icons/hi2";
import { motion } from "framer-motion";

// Display config for each block type (icon, color, labels)
const typeOptions = [
  {
    name: "Heading",
    type: "heading",
    color: "#32333b",
    icon: <FaHeading />,
    desc: "Add a section heading",
  },
  {
    name: "Paragraph",
    type: "paragraph",
    color: "#099d09",
    icon: <RxText />,
    desc: "Add normal text paragraph",
  },
  {
    name: "Bullet List",
    type: "bullet-list",
    color: "#3B82F6",
    icon: <MdOutlineFormatListBulleted />,
    desc: "Add a bullet list",
  },
  {
    name: "Numbered List",
    type: "numbered-list",
    color: "#e15e43",
    icon: <HiMiniNumberedList />,
    desc: "Add a numbered list",
  },
];

const DescriptionSection = () => {
  const [openBlockPopup, setOpenBlockPopup] = useState(false);
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name="description"
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <div className="box-form-style relative">
          <h3 className="label-form-style">Description</h3>

          {/* Open the block type picker popup */}
          <button
            onClick={() => setOpenBlockPopup(true)}
            className="flex-center gap-2.5 p-1.5 rounded-sm bg-orange text-white text-xs font-semibold w-fit active:scale-70"
          >
            <FaPlus />
            <span>Add Block</span>
          </button>

          {/* Empty state */}
          {!field.value.length && <p className="text-gray my-2.5">--- No block yet --- </p>}

          {/* List of added blocks */}
          {field.value.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="content flex-start-col gap-3.5 mt-1.5 max-h-52 overflow-y-auto"
            >
              {field.value.map((item) => {
                // Match the block to its display config
                const typeInfo = typeOptions.find(
                  (typ) => item.type === typ.type,
                );

                return (
                  <label
                    htmlFor={item.type}
                    className="p-2.5 w-full cursor-pointer rounded-sm border border-border flex-between gap-5"
                    style={{ borderColor: typeInfo.color }}
                    key={item.id}
                  >
                    <div className="flex-start gap-2.5">
                      {/* Block type icon */}
                      <div
                        className="w-8 h-8 rounded-sm flex-center text-lg!"
                        style={{
                          color: typeInfo.color,
                          background: `${typeInfo.color}25`,
                        }}
                      >
                        {typeInfo.icon}
                      </div>

                      {/* Block content preview */}
                      <div className="flex-start-col gap-1 text-xs">
                        {/* Title row */}
                        {item.type === "paragraph" ||
                        item.type === "heading" ? (
                          <h3 className="font-semibold">{typeInfo.name}</h3>
                        ) : item?.content?.title ? (
                          <h3 className="font-semibold">
                            {item.content.title}
                          </h3>
                        ) : null}

                        {/* Content preview: text for heading/paragraph, items for lists */}
                        {item.type === "paragraph" ||
                        item.type === "heading" ? (
                          <p className="text-gray line-clamp-1">
                            {item.content}
                          </p>
                        ) : (
                          <ul
                            className={`flex ml-5 gap-x-5 gap-y-2.5 flex-wrap ${
                              item.type === "bullet-list"
                                ? "list-disc!"
                                : "list-decimal!"
                            }`}
                          >
                            {item.content.items.map((listItem) => (
                              <li key={listItem.id}>{listItem.text}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* Remove block from the description field */}
                    <button
                      onClick={() =>
                        field.onChange([
                          ...field.value.filter((i) => i.id !== item.id),
                        ])
                      }
                      className="w-7 h-7 shadow-sm rounded-sm border border-border flex-center text-orange hover:border-orange hover:bg-orange hover:text-white"
                    >
                      <FaTrashAlt />
                    </button>
                  </label>
                );
              })}
            </motion.div>
          )}

          {/* Block picker popup — mounts only when open */}
          {openBlockPopup && (
            <AddBlockPopup
              addNewItem={(item) => field.onChange([...field.value, item])}
              setOpenBlockPopup={setOpenBlockPopup}
            />
          )}

          {/* Validation error */}
          {errors?.description && (
            <ErrorMessageFrom message={errors.description.message} />
          )}
        </div>
      )}
    />
  );
};

export default DescriptionSection;
