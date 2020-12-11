import React, {useState} from "react";
import SpeakerBox from "./SpeakerBox"

const NewTranscriptForm = (props) =>{
    const [speakerSections, setSpeakerSections] = useState(["item"])

    const addSpeaker = () =>{
        const temp = [...speakerSections]
        temp.push("item")
        setSpeakerSections(temp)
    }

    const submit = () =>{
        const getAllBoxes = document.querySelectorAll(".speakerInputBox")
        const speakers = []
        getAllBoxes.forEach((el)=>{
            speakers.push(el.value)
        })
        console.log(speakers)
    }



    return(
        <div className="speakerNameForm">
            {speakerSections.map((el, i)=>{
                return(
                    <SpeakerBox index={i} />
                )
            })}
            <br/>
            <button onClick={addSpeaker}>Add Speaker</button>
            <button onClick={submit}>Submit</button>
        </div>
        
    )
}

export default NewTranscriptForm