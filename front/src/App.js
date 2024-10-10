import './App.css';
import React, {useEffect, useState} from "react";
import Service from "./Service";
import Note from "./components/Note/Note";

function App() {

    //state
    const [notes, setNotes] = useState([]);
    const [isMounted] = useState(false);
    const [addNoteDisplayed, setAddNoteDisplayed] = useState(false)

    //behavior
    useEffect(() => {
        if (!isMounted) {
            Service.retrieveData().then(notes =>
                setNotes(notes)
            );
        }
    }, [isMounted]);


    const addNote = (data) => {
        Service.commitData(data).then(
            () => {
                Service.retrieveData().then(notes =>
                    setNotes(notes))
            }
        )
        setAddNoteDisplayed(false)


    }

    const deleteNote = (id) => {
        Service.deleteData(id).then(
            () => {
                Service.retrieveData().then(notes =>
                    setNotes(notes))
            }
        )

    }

    const updateNote = (id, data) => {
        Service.updateData(id, data).then(
            () => {
                Service.retrieveData().then(notes =>
                    setNotes(notes))
            })
        }


    //render
    return (
        <div className={"App"}>
            <h1 className={"nomApp"}>APP NOTE</h1>
            <div className={"container"}>
                {notes.map((note) => (
                    <div>
                        <Note key={note.id} noteInfo={note} readOnly={true} methods={{update: updateNote, create: addNote, delete: deleteNote}}/>
                    </div>
                ))}
            </div>

            <div className={"createNote"}>
                <div style={{visibility: addNoteDisplayed?"visible":"hidden"}}>
                    <Note readOnly={false} methods={{create: addNote}} />
                </div>
                <button
                    className={"add-note-button"}
                    onClick={() => {
                        setAddNoteDisplayed(!addNoteDisplayed)
                    }}
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default App;