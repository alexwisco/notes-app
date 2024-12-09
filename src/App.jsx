import { useState, useEffect } from "react";
import noteService from "./services/notes";
import "./App.css";
import Notes from "./components/Notes";
import Note from "./components/Note";

function App() {
  const [notes, setNotes] = useState([]); // holds user's notes
  const [newTitle, setNewTitle] = useState(""); // note title
  const [newContent, setNewContent] = useState(""); // note content

  //******************************************************************************
  // retrieving from json server
  useEffect(() => {
    noteService // imported functions from notes.js
      .getAll() // getAll() from notes.js. take into account that callback functions
      // now return data directly after the change.
      .then((initialNote) => {
        setNotes(initialNote);
      });
  }, []);
  console.log("rendered: ", notes.length, " notes");

  //******************************************************************************

  //******************************************************************************
  // Typing in form box - data sent in the form box changes the state of title/content
  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setNewContent(e.target.value);
  };

  //******************************************************************************

  //******************************************************************************
  // Adding a new note. User clicks submit button (event e). Create note object
  // with title and content from handlers. Add new note to notes[]. Logging for debugging.
  const addNote = (e) => {
    e.preventDefault();

    const noteObject = {
      title: newTitle, // from input box set by title handler
      content: newContent, // from ipnut box set by content handler
    };

    noteService.create(noteObject).then((note) => {
      setNotes(notes.concat(note));

      setNewTitle("");
      setNewContent("");
    });
  };
  //******************************************************************************

  //******************************************************************************
  // Deleting a note
  const deleteNote = (id) => {
    const obj = notes.find((note) => note.id === id);
    const objTitle = obj.title;
    if (window.confirm(`Delete ${objTitle} note?`)) {
      // if user is sure
      noteService
        .noteDelete(id) // callback from notes.js
        .then(() => {
          // can't forget to update the ui
          setNotes(notes.filter((note) => note.id !== id));

          console.log(`${objTitle} note has been deleted :)`);
        })
        // error checking functionality
        .catch((error) => {
          console.error("Error with deletion of: ", error);
        });
    }
  };

  //******************************************************************************

  //******************************************************************************
  // Function to show debugging info of a note on button click
  const showInfo = ({ note }) => {
    e.preventDefault;
    console.log(note.title);
    console.log(note.content);
    console.log(note.id);
  };
  //******************************************************************************

  return (
    <>
      <h1> Notes App </h1>
      <div className="app-container">
        <form className="note-form" onSubmit={addNote}>
          <input
            placeholder="Title"
            value={newTitle}
            onChange={handleTitleChange}
            required
          />
          <textarea
            placeholder="Content"
            value={newContent}
            onChange={handleContentChange}
            rows={10}
            required
          />
          <button type="submit">Add</button>
        </form>

        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id}>
              <Note note={note} deleteNote={() => deleteNote(note.id)} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
