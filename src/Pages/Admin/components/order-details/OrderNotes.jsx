import { useRef, useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { PiNotePencil } from "react-icons/pi";
import { FaCheck, FaTrash } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

const OrderNotes = ({ notes, setNotes }) => {
  const [noteMode, setNoteMode] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [editId, setEditId] = useState("");
  const [editText, setEditText] = useState("");
  const addNewInputRef = useRef(null);
  const editInputRef = useRef(null);

  const editNote = () => {
    // Edit note based on note id
    if (editText.trim()) {
      setNotes((prev) =>
        prev.map((not) =>
          not.id === editId ? { ...not, text: editText } : not,
        ),
      );
    }
    // return editId and EditText to default value
    setEditId("");
    setEditText("");
  };

  const addNewNote = () => {
    if (newNote.trim()) {
      setNotes((prev) => [
        ...prev,
        { id: crypto.randomUUID(), text: newNote.trim() },
      ]);
    }

    setNoteMode(null);
    setNewNote("");
  };

  return (
    <SectionWrapper
      icon={<PiNotePencil />}
      title={"Order Notes"}
      sectionStyle={"gap-2.5! min-h-[165px]"}
    >
      {notes?.length === 0 && !noteMode && (
        <div className="grow w-full flex-center-col xl:py-5">
          <img
            src="https://res.cloudinary.com/dsqaber42/image/upload/v1787726650/ChatGPT_Image_26_%D8%A3%D8%BA%D8%B3%D8%B7%D8%B3_2026_09_43_36_%D8%B5_snel1p.png"
            className="max-w-20 max-h-20"
            alt=""
          />
          <p className="text-gray text-sm">No notes add yet.</p>
        </div>
      )}

      {/* Add New Note Input */}
      {noteMode === "new" && (
        <div className="w-full flex-between gap-5 text-xs ">
          <input
            className="grow p-1.5 border border-border rounded-sm outline-none"
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onBlur={addNewNote}
            onKeyDown={(e) => {
              if (e.key === "Enter") addNewNote();
            }}
            ref={addNewInputRef}
          />

          {/* Button To Start Add New Note Oporation */}
          <button
            onClick={addNewNote}
            className="w-6 h-6 flex-center bg-orange text-white rounded-sm active:scale-110"
          >
            <FaCheck />
          </button>
        </div>
      )}

      {/* Notes Items */}
      {notes.length > 0 && (
        <div
          className={`flex-start-col w-full gap-1.5 grow ${noteMode === "new" ? "max-h-21" : "max-h-30"} overflow-auto `}
        >
          {notes.map((note) => {
            return (
              <div key={note.id} className="w-full flex-between gap-5 text-xs">
                {/* Edit Mode Input */}
                {editId === note.id ? (
                  <>
                    <input
                      className="grow p-1.5 border border-border rounded-sm outline-none"
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={editNote}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") editNote();
                      }}
                      ref={editInputRef}
                    />

                    {/* Button To Start Edit Current Note Oporation */}
                    <button
                      onClick={editNote}
                      className="w-6 h-6 flex-center bg-orange text-white rounded-sm active:scale-110 "
                    >
                      <FaCheck />
                    </button>
                  </>
                ) : (
                  // View Edit Note Text
                  <>
                    <p>{note.text}</p>
                    <div className="flex-start gap-1.5">
                      <button
                        className="w-6 h-6 flex-center rounded-sm active:scale-110 border border-border hover:shadow-sm"
                        onClick={() => {
                          setEditId(note.id);
                          setEditText(note.text);
                          setTimeout(() => editInputRef.current.focus(), 200);
                          setNoteMode("edit");
                        }}
                      >
                        <CiEdit size={18} />
                      </button>
                      <button
                        className="w-6 h-6 flex-center rounded-sm active:scale-110 border border-border hover:shadow-sm hover:text-orange"
                        onClick={() => {
                          setNotes((prev) =>
                            prev.filter((item) => item.id !== note.id),
                          );
                        }}
                      >
                        <FaRegTrashAlt size={15} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Active New Note Button */}
      <button
        onClick={() => {
          setNoteMode("new");
          setTimeout(() => addNewInputRef.current.focus(), 200);
        }}
        className="absolute top-2.5 right-2.5 rounded-sm border border-border px-2.5 py-1.5 text-xs font-semibold"
      >
        Add Note
      </button>
    </SectionWrapper>
  );
};

export default OrderNotes;
