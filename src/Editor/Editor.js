import React, { useState } from "react"
import EditorWrapper from "./EditorWrapper"
import SpeakerSection from "./SpeakerSection/SpeakerSection"


const useParseJsonAndSetStates = (wordArr) =>{
    let speakerList = [wordArr[0].speaker]
    let currentSpeaker = ""
    let result = []
    let collector = []
    for(let i = 0; i < wordArr.length; i++){
        if(wordArr[i].speaker !== currentSpeaker && i > 0){
            result.push(collector)
            collector = []
            if(!speakerList.includes(wordArr[i].speaker)){
                speakerList.push(wordArr[i].speaker)
            }
        }
        collector.push(wordArr[i])
    }
    return {speakerNames: states, sections: result}
}

const Editor = (props) =>{
    const data = JSON.parse(props.data)
    const {speakerNames, sections} = useParseJsonAndSetStates(data)

    const [speakers, setSpeakers] = useState(speakerNames)

    const setSpeakerNames = (oldName, newName) =>{
        //this needs to alter the larger guy up in wrapper!!
        const innerSpeakers = [...speakers];
        const i = innerSpeakers.indexOf(oldName)
        innerSpeakers[i] = newName
        setSpeakers(innerSpeakers)

    }
    
    return(
        <div>
        <h1>Editor</h1>
        {sections.map(words => {
            return(
                <SpeakerSection speaker={words[0].speaker} stateUpdater={} />
            )
        })}
        </div>
    )
}

export default Editor