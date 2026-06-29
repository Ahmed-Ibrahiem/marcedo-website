import React, { useEffect, useState, memo } from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaCheck,
  FaHeading,
  FaXmark,
} from "react-icons/fa6";
import { RxText } from "react-icons/rx";
import { MdOutlineFormatListBulleted, MdModeEdit } from "react-icons/md";
import { HiMiniNumberedList } from "react-icons/hi2";
import { motion } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "../../../../Components/ui/SortableItem";

// Block type options with their display config
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

const AddBlockPopup = ({ setOpenBlockPopup, addNewItem }) => {
  const [selectedType, setSelectedType] = useState("heading");
  const [currentStep, setCurrentStep] = useState(1);
  const [content, setContent] = useState(null);
  const [itemContent, setItemContent] = useState([]);
  const [listTitle, setListTitle] = useState("");
  const [selectedItem, setSelectedItem] = useState(null); // currently edited list item

  // dnd-kit sensors: mouse/touch + keyboard support
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Reorder list items after drag ends
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setContent((prev) => {
        const oldIndex = prev.findIndex((i) => i.id === active.id);
        const newIndex = prev.findIndex((i) => i.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  // Move item one position up
  const moveUp = (index) => {
    if (index === 0) return;
    setContent((prev) => arrayMove(prev, index, index - 1));
  };

  // Move item one position down
  const moveDown = (index) => {
    if (index === content.length - 1) return;
    setContent((prev) => arrayMove(prev, index, index + 1));
  };

  // Build final block data and pass it to the parent
  const handleAddBlock = () => {
    const data = {
      id: crypto.randomUUID(),
      type: selectedType,
      content:
        selectedType === "paragraph" || selectedType === "heading"
          ? content
          : { title: listTitle, items: content },
    };

    addNewItem(data);
    setOpenBlockPopup(false);
  };

  // Reset content whenever the user switches block type
  useEffect(() => {
    setContent(null);
  }, [selectedType]);

  // Initialize content state based on selected type when moving to step 2
  const handleNextStep = () => {
    if (selectedType === "bullet-list" || selectedType === "numbered-list") {
      setContent([]);
      setItemContent("");
      setListTitle("");
    } else {
      // String init needed to safely call .trim().length in step 2
      setContent("");
    }
    setCurrentStep((prev) => prev + 1);
  };

  // Add a new item to the list
  const addItem = () => {
    if (!itemContent) return;
    setContent((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: itemContent },
    ]);
    setItemContent("");
  };

  // Auto-focus the inline input when an item enters edit mode
  useEffect(() => {
    if (selectedItem) document.getElementById(selectedItem.id).focus();
  }, [selectedItem]);

  // Toggle edit mode for a list item:
  // - First call: opens inline edit (sets selectedItem)
  // - Second call (via button, Enter, or onBlur): saves the change
  const editItem = (item) => {
    if (!selectedItem) {
      setSelectedItem(item);
    } else {
      setContent((prev) =>
        prev.map((i) => {
          if (i.id === item.id) return { ...i, text: selectedItem.text };
          return i;
        }),
      );
      setSelectedItem(null);
    }
  };

  // Remove an item from the list
  const deleteItem = (item) => {
    setContent((prev) => prev.filter((i) => i.id !== item.id));
    setSelectedItem(null);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpenBlockPopup(false);
      }}
      className="fixed top-0 left-0 w-full h-screen flex-center cursor-crosshair z-50 bg-black/50"
    >
      <div
        className="w-xl cursor-pointer flex-start-col h-[90%] bg-white rounded-sm shadow-sm p-5 max-w-[95%]"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Header */}
        <div className="flex-between items-start! w-full">
          <h1 className="text-lg font-semibold">Add Block</h1>
          <button
            onClick={() => setOpenBlockPopup(false)}
            className="w-8 h-8 border border-border rounded-sm flex-center text-sm hover:bg-black hover:text-white"
          >
            <FaXmark />
          </button>
        </div>

        {/* Step 1: choose block type */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            <h3 className="text-sm font-semibold mt-5">Choose Block Type</h3>
            <div className="content flex-start-col gap-3.5 mt-1.5">
              {typeOptions.map((item) => (
                <label
                  htmlFor={item.type}
                  className="p-4 w-full cursor-pointer rounded-sm border border-border flex-between gap-5"
                  style={{
                    border: `${selectedType === item.type ? `1px solid ${item.color}` : "1px solid var(--color-gray-light)"}`,
                  }}
                  key={item.type}
                >
                  <div className="flex-start gap-2.5">
                    <div
                      className="w-12 h-12 rounded-sm flex-center text-xl!"
                      style={{
                        color: item.color,
                        background: `${item.color}25`,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-start-col gap-1 text-sm">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray line-clamp-1">{item.desc}</p>
                    </div>
                  </div>
                  <input
                    checked={selectedType === item.type}
                    type="radio"
                    className="radio-option"
                    name="type"
                    id={item.type}
                    onChange={() => setSelectedType(item.type)}
                    style={{
                      borderColor: `${selectedType === item.type ? item.color : "var(--color-gray-light)"}`,
                    }}
                  />
                </label>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: fill in block content based on selected type */}
        {currentStep > 1 && selectedType && (
          <div className="w-full box-form-style">
            <h3 className="text-sm font-semibold mt-5 label-form-style">
              Add {selectedType.split("-").join(" ")}
            </h3>

            {/* Heading input */}
            {selectedType === "heading" && (
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your heading"
                className="input-form-style"
              />
            )}

            {/* Paragraph input with character counter */}
            {selectedType === "paragraph" && (
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => {
                    if (e.target.value.trim().length <= 300)
                      setContent(e.target.value);
                  }}
                  className="input-form-style h-50 leading-6"
                  placeholder="Enter your paragraph"
                />
                <p className="absolute bottom-3.5 right-3.5 text-xs text-gray">
                  {content.trim().length}/300
                </p>
              </div>
            )}

            {/* List input: title + item management + drag-to-reorder */}
            {(selectedType === "bullet-list" ||
              selectedType === "numbered-list") && (
              <div className="flex-start-col gap-2.5 w-full">
                {/* List title */}
                <div className="box-form-style">
                  <label htmlFor="list-title" className="label-form-style">
                    List Title
                  </label>
                  <input
                    type="text"
                    className="input-form-style"
                    id="list-title"
                    placeholder="Enter your list title"
                    value={listTitle}
                    onChange={(e) => setListTitle(e.target.value)}
                  />
                </div>

                {/* New item input — press Enter or click "Add Item" */}
                <div className="box-form-style">
                  <label htmlFor="item" className="label-form-style">
                    Item text
                  </label>
                  <input
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addItem();
                    }}
                    type="text"
                    className="input-form-style text-[16px]!"
                    value={itemContent}
                    onChange={(e) => setItemContent(e.target.value)}
                    placeholder="Enter item text"
                  />
                </div>

                <button
                  onClick={addItem}
                  className="text-sm self-end border-2 rounded-sm border-orange hover:bg-orange hover:text-white p-2 px-4 bg-transparent font-semibold text-orange"
                >
                  Add Item
                </button>

                {/* Live preview of added items with drag, reorder arrows, edit, delete */}
                <div className="w-full">
                  <h3 className="text-lg font-semibold">
                    {listTitle || "Unknown yet"}
                  </h3>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={content.map((i) => i.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <ul className="flex-start-col w-full gap-2.5 mt-2.5 max-h-45.5 overflow-auto">
                        {content.map((item, index) => (
                          <SortableItem
                            key={item.id}
                            id={item.id}
                            customStyle="border border-border rounded-sm p-1.5"
                          >
                            <div className="text-sm flex-start gap-3 grow">
                              {/* Inline edit input or plain text */}
                              {selectedItem?.id === item.id ? (
                                <input
                                  id={item.id}
                                  className="border-none outline-none grow"
                                  type="text"
                                  value={selectedItem.text}
                                  onChange={(e) =>
                                    setSelectedItem((prev) => ({
                                      ...prev,
                                      text: e.target.value,
                                    }))
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") editItem(item);
                                  }}
                                  onBlur={() => editItem(item)}
                                />
                              ) : (
                                <p className="line-clamp-1">{item?.text}</p>
                              )}
                            </div>

                            {/* Item actions: reorder arrows, edit/save, delete */}
                            <div className="flex-start gap-2.5">
                              {index !== 0 && (
                                <button
                                  type="button"
                                  onClick={() => moveUp(index)}
                                >
                                  <FaAngleUp />
                                </button>
                              )}
                              {index !== content.length - 1 && (
                                <button
                                  type="button"
                                  onClick={() => moveDown(index)}
                                >
                                  <FaAngleDown />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => editItem(item)}
                                className={itemBtnStyle}
                              >
                                {selectedItem?.id === item.id ? (
                                  <FaCheck />
                                ) : (
                                  <MdModeEdit />
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteItem(item)}
                                className={itemBtnStyle}
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </SortableItem>
                        ))}
                      </ul>
                    </SortableContext>
                  </DndContext>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer: navigation buttons */}
        <div className="flex-between mt-auto w-full gap-3.5">
          {currentStep === 1 ? (
            <button
              onClick={() => setOpenBlockPopup(false)}
              type="button"
              className={btnStyle}
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              type="button"
              className={btnStyle}
            >
              Back
            </button>
          )}
          {currentStep === 1 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className={`${btnStyle} bg-orange text-white`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleAddBlock}
              type="button"
              className={`${btnStyle} bg-orange text-white`}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const btnStyle = `
py-2.5 px-5 rounded-sm border border-border text-sm font-bold flex-center active:scale-90 duration-200!
`;

const itemBtnStyle = `
text-sm w-6 h-6 rounded-sm border border-orange flex-center bg-orange text-white
`;

export default React.memo(AddBlockPopup);
