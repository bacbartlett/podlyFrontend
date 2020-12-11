import React, { useState } from "react"

const SpeakerBox = (props) =>{
    const [name, setName] = useState("")

    const handleChange = e => setName(e.target.value)

    return(
        <div className="speaker" key={props.index}>
            <label>Speaker Name:</label>
            <input className="speakerInputBox" type="text" value={name} onChange={handleChange}></input>
        </div>
    )
}

export default SpeakerBox