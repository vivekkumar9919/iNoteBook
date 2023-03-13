import React, { useState } from "react";

import NoteContext from "./noteContext";

const Notestate = (props) => {
  const host = "http://localhost:4000";
  const noteInitial = [];

  const [notes, setNotes] = useState(noteInitial);



  
  // get all notes 
  const getNotes=async()=>{
    const response=await fetch(`${host}/api/notes/fetchallnotes`,{
      method:'GET',
      headers:{
        'content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json =await response.json();
    setNotes(json);

  }



  // add note
  const addNote = async (title, description, tag) => {
    // api call
    await fetch(`${host}/api/notes/addnote/`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')

      },
      body: JSON.stringify({ title, description, tag })
    })
    // const json= response.json();
    console.log("adding note")
    let note = {
      "title": title,
      "description": description,
      "tag": tag,
    };
    setNotes(notes.concat(note));
  }



  // delete a note
  const deleteNote = async(id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`,{
      method: 'DELETE',
      headers: {
        'content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
      })
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
  }




  // edit a note
  const editNote = async (id, title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')

      },
      body: JSON.stringify({ title, description, tag })
    })
    const json = response.json();
    console.log(json);
    
    let newNotes=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
      }
    }
    setNotes(newNotes);
  }






  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default Notestate;