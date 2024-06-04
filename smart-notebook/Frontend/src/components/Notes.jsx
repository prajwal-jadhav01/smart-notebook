import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

function Notes() {
  const context = useContext(noteContext);
  const { Notes, fetchNotes } = context;
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <div className="flex flex-wrap -m-4 items-center mt-4 justify-center">
   
        {Notes.length===0?"No notes to display":Notes.map((note) => (
          <NoteItem key={note._id} notes={note} />
        ))}
      </div>
    </>
  );
}

export default Notes;
