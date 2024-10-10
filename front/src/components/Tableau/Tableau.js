import React, {useState} from 'react';
import "./Tableau.css";
function Tableau({name, component, className}) {
    //state
    const [content, setContent] = useState(undefined)
    //behavior
    //render
    return (
        <div className={className}>
            <div className={"content"}>
                {content}
            </div>
            <button
                className={"button"}
                onClick={() => {
                    console.log(content)
                    setContent(content === undefined ? component : undefined)
                }}
            >
                {name}
            </button>
        </div>
    )
}


export default Tableau;
