import React, { useContext } from 'react'
import noteContext from '../Context/notes/noteContext'

export default function NotesItem(props) {
    const context=useContext(noteContext);
    const { note ,updateNote} = props;
    const {deleteNote} =context;
    return (

            <div className="col-md-3">
                <div className="card my-3" >
                    <div className="card-body">
                        <div className='container d-flex justify-content-between '>
                           <h5 className="card-title">{note.title}</h5>
                            <div>
                            <i className="fa fa-solid fa-trash mx-2 " onClick={()=>{deleteNote(note._id)}} ></i>
                            <i className="fa fa-light fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
                            </div>
                        </div>
                        <p className="card-text">{note.description} </p>
                        <i> <p className="card-text">Tag:- {note.tag} </p></i>
                    </div>
                </div>
            </div>

    )
}
