// EditNoteModal.js

import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const EditNoteModal = ({ isOpen, closeModal, note }) => {
  const context = useContext(noteContext);
  const { editNote } = context;

  const [editedNote, setEditedNote] = useState({
    title: note.title,
    description: note.description,
    tag: note.tag,
  });

  const handleInputChange = (e) => {
    setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
  };

  const handleEditNote = () => {
    editNote(note._id, editedNote);
    closeModal();
  };

  return (
    <>
      {isOpen && (
        <div className="modal fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="modal-container bg-gray-800 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold text-white">Edit Note</p>
                <button
                  onClick={closeModal}
                  className="modal-close cursor-pointer z-50 text-white"
                >
                  &times;
                </button>
              </div>
              <div className="mb-4">
                <label htmlFor="title" className="text-sm text-gray-400">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editedNote.title}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 rounded border border-gray-600 focus:border-indigo-500 focus:bg-gray-800 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="tag" className="text-sm text-gray-400">
                  Tag:
                </label>
                <input
                  type="text"
                  id="tag"
                  name="tag"
                  value={editedNote.tag}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 rounded border border-gray-600 focus:border-indigo-500 focus:bg-gray-800 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="text-sm text-gray-400">
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={editedNote.description}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 rounded border border-gray-600 focus:border-indigo-500 focus:bg-gray-800 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleEditNote}
                  className="text-white bg-indigo-500 uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditNoteModal;
