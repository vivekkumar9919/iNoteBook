import React  ,{ useContext, useState }from 'react'
import noteContext from '../Context/notes/noteContext'

export default function Addnote() {
    const context =useContext(noteContext);
    const {addNote} =context;
    const [note,setNote]=useState({title:"",description:"",tag:""});
    const handlesubmit=(e)=>{
        e.preventDefault();
       addNote(note.title,note.description,note.tag);
       setNote({title:"",description:"",tag:""});
    }
    const onchange =(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
  return (
    <div>
        <div className='addNoteBox  '>
        <div className='formBox container card  p-4 mt-4'>
        <div className='fs-3 mb-3'>Add Note</div>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onchange} value={note.title} />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text" className="form-control" id="description" name="description"  onChange={onchange} value={note.description}/>
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input type="text" className="form-control" id="tag" name="tag"  onChange={onchange} value={note.tag}/>
            </div>

            <button type="submit" className="btn btn-primary" onClick={handlesubmit}>Submit</button>
          </form>
        </div>

      </div>
    </div>
  )
}
