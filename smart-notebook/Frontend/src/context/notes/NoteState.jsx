import noteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";

  const [Notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2YjdlZGY5MTA4NmZhOTRhYzQ2MjMzIn0sImlhdCI6MTcwMTg1Mjg0NX0.lQCWimfURZmnz-p5EMr7Ebx53zwzyBDqhMocq_kF-jo",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2YjdlZGY5MTA4NmZhOTRhYzQ2MjMzIn0sImlhdCI6MTcwMTg1Mjg0NX0.lQCWimfURZmnz-p5EMr7Ebx53zwzyBDqhMocq_kF-jo",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    setNotes(Notes.concat(json));
  };

  const deleteNote = async(id) => {
    console.log("deleting node of id: ", id);
    const response = await fetch(`${host}/api/notes/deletenode/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2YjdlZGY5MTA4NmZhOTRhYzQ2MjMzIn0sImlhdCI6MTcwMTg1Mjg0NX0.lQCWimfURZmnz-p5EMr7Ebx53zwzyBDqhMocq_kF-jo",
      },
      
    });
    const json = await response.json();
    console.log(json);
  
    const newNote = Notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  const editNote = async(id,{title,description,tag}) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2YjdlZGY5MTA4NmZhOTRhYzQ2MjMzIn0sImlhdCI6MTcwMTg1Mjg0NX0.lQCWimfURZmnz-p5EMr7Ebx53zwzyBDqhMocq_kF-jo",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
  
  fetchNotes()
  };
  return (
    <noteContext.Provider
      value={{ Notes, setNotes, addNote, deleteNote, editNote, fetchNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
