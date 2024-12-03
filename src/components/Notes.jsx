import Note from './Note'

const Notes = ({notes, deleteNote}) => {

    return (
        <div className='notes-grid'>
            {notes.map(note => 
            <div className='note-item'>
                <Note key={note.id}
                note={note}
                deleteNote = {deleteNote}/>
            </div>
            
            )}
            
        </div>
    ) 
}

export default Notes