import React, { useContext, useEffect, useRef ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../Context/notes/noteContext'
import Addnote from './Addnote';
import NotesItem from './NotesItem';

export default function Mynotes() {
  const context = useContext(noteContext);
  const { notes, getNotes ,editNote } = context;
  let navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  }
  const ref = useRef(null);
  const refClose=useRef(null);

  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""});

  const handlesubmit=(e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag)
   refClose.current.click();
    console.log("notes updated",note);

}
const onchange =(e)=>{
    setNote({...note,[e.target.name]:e.target.value});
}
  return (
    <>
      <Addnote></Addnote>
      {/* <!-- Button trigger modal --> */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* Modal  */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* form for modal  */}
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label" >Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onchange}  value={note.etitle}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" onChange={onchange}  value={note.edescription}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" onChange={onchange} value={note.etag}/>
                </div>

                {/* <button type="submit" className="btn btn-primary" onClick={handlesubmit}>Submit</button> */}
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handlesubmit} className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
      <div className='fs-3 mb-3 mt-2'>My Notes</div>
        {notes.map((note) => {
          return <NotesItem key={note._id} updateNote={updateNote} note={note}></NotesItem>
        })}
      </div>
    </>
  )
}
