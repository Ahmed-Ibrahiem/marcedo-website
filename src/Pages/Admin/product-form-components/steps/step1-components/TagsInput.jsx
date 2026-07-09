import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";

/**
 * TagsInput
 *
 * Simple multi-input tag field for Step 1 (Basic Information).
 * Tags are product-level only (no shared pool, no category linkage).
 * Admin types a tag and presses Enter (or comma) to add it as a chip.
 */
const TagsInput = ({ name = "tags" }) => {
  const { control } = useFormContext();
  const [inputValue, setInputValue] = useState("");

  const addTag = (value, currentTags, onChange) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    // Avoid exact duplicates (case-insensitive) within this product only
    const alreadyExists = currentTags.some(
      (tag) => tag.toLowerCase() === trimmed.toLowerCase(),
    );
    if (!alreadyExists) {
      onChange([...currentTags, trimmed]);
    }
    setInputValue("");
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => {
        const tags = field.value || [];

        const handleKeyDown = (e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag(inputValue, tags, field.onChange);
          } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
            // Quick delete of the last tag when input is empty
            field.onChange(tags.slice(0, -1));
          }
        };

        const removeTag = (index) => {
          field.onChange(tags.filter((_, i) => i !== index));
        };

        return (
          <div className="box-form-style">
            <label className="label-form-style">Tags</label>

            <div className="flex-wrap flex-start gap-2 rounded-sm border border-border px-3 py-2 focus-within:border-orange">
              {tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="flex-start gap-2.5 rounded-sm bg-orange-lite px-3 py-1 text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className=" hover:text-orange"
                    aria-label={`Remove ${tag}`}
                  >
                    <FaXmark size={10} />
                  </button>
                </span>
              ))}

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => addTag(inputValue, tags, field.onChange)}
                placeholder={
                  tags.length === 0 ? "Type a tag and press Enter" : ""
                }
                className="min-w-30 flex-1 border-none text-sm outline-none"
              />
            </div>

            <p className="mt-1 text-xs text-gray-400">
              Press Enter or comma to add a tag.
            </p>
          </div>
        );
      }}
    />
  );
};

export default React.memo(TagsInput);
