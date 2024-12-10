const Note = ({ note, deleteNote }) => {
  return (
    <>
      <div className="note-item">
        <h3>{note.title} </h3>
        <p> {note.content}</p>
        <div className="note-header">
          <button onClick={deleteNote}> Delete </button>
        </div>
      </div>
    </>
  );
};

export default Note;
