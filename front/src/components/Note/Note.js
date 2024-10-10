import React, {useEffect, useState} from 'react';
import './Note.css'

function Note({noteInfo =  {auteur: "", description: "", couleur: "blanchedalmond"}, readOnly, methods }) {

    //state
    const [inputFields, setInputFields] = useState({auteur: noteInfo.auteur, description: noteInfo.description, couleur: noteInfo.couleur});
    const [displayButton, setDisplayButton]  = useState(false)
    const [displayEdit, setDisplayEdit]  = useState(!readOnly)

    const contentFields =
        <div className={"champs"}>
            <textarea className={"description champ"}
                      minLength={10}
                      value={inputFields.description}
                      placeholder={"Description"}
                      onChange={(event) => handleChange(event, "description")}
                      readOnly={readOnly && !displayEdit}/>
            <input className={"auteur champ"}
               placeholder={"Auteur"}
               onChange={(event) => handleChange(event, "auteur")}
               type={"text"}
               value={inputFields.auteur}
               readOnly={readOnly && !displayEdit}
               minLength={3}/>
        </div>

    //behavior

    const handleClick = () => {
        setDisplayButton(!displayButton)
    }

    const isEditMode = () => {
        if (displayButton){
            return "span-btn-clicked"
        }
        return "span-btn"
    }

    const handleChange = (event, field) => {
        const copyInputFields = {...inputFields};
        copyInputFields[field] = event.target.value
        setInputFields(copyInputFields)
    }

    const handleSubmit = () => {
        if(!readOnly){
            methods.create(inputFields)
            setInputFields({...inputFields,
                auteur: "",
                description: ""
            })
        }
        else{
            console.log(noteInfo.id)
            methods.update(noteInfo.id, inputFields)
            setDisplayEdit(false)
        }

    }

    const displayEditNote = () => {
        setDisplayEdit(true)
    }

    if (readOnly && !displayEdit) {
        return (
            <div className={"note-container"}  style={{background : noteInfo.couleur}}>
                <span className={isEditMode()} onClick={handleClick}>
                    <button className={"btn-note"} onClick={displayEditNote}><img src={"stylo.png"}/> </button>
                    <button className={"btn-note"} onClick={() => {
                            if(window.confirm("Supprimer la note ?")) {
                               methods.delete(noteInfo.id)
                            }
                        }
                    }><img src={"croix.png"}/> </button>
                </span>
                <div>
                    {contentFields}
                </div>
            </div>
        )
    } else {
        return (
            <div className={"note-container"} style={{background: noteInfo.couleur}}>
                {contentFields}
                <button className={"confirmer"}
                        onClick={handleSubmit}>
                    Confirmer
                </button>
            </div>
        );
    }

}

export default Note;
