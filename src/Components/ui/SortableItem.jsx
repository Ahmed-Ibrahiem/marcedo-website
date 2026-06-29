import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RxDragHandleDots2 } from "react-icons/rx";
import React, { memo } from "react";

const SortableItem = ({ customStyle, id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex-start gap-2 w-full ${customStyle || ""}`}
    >
      <RxDragHandleDots2
        {...attributes}
        {...listeners}
        className="cursor-grab text-lg outline-none text-gray shrink-0"
      />
      {children}
    </div>
  );
};

export default React.memo(SortableItem);
