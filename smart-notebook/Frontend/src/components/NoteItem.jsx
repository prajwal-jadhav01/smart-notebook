// NoteItem.js

import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import EditNoteModal from "./EditNoteModal";

function NoteItem({ notes }) {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="xl:w-1/4 lg:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-700 border-opacity-75 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400 mb-4">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <h2 className="text-lg text-white font-medium title-font mb-2">
            {notes.title}
          </h2>
          <i className="fa-regular fa-pen-to-square mx-2" onClick={openModal}></i>
          <i className="fa-solid fa-trash mx-2" onClick={() => deleteNote(notes._id)}></i>
          <p className="leading-relaxed text-base">{notes.description}</p>
        </div>
      </div>

      <EditNoteModal isOpen={isModalOpen} closeModal={closeModal} note={notes} />
    </>
  );
}

export default NoteItem;
