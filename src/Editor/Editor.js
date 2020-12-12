import React, { useEffect, useState } from "react"
import SpeakerSection from "./SpeakerSection/SpeakerSection"
import Text from "./Text/Text"
import AudioPlayerWrapper from "./AudioPlayer/AudioPlayerWrapper"

//breaking up the word array into sections
const parseJsonAndSetStates = (wordArr) =>{
    let speakerList = [wordArr[0].speaker]
    let currentSpeaker = wordArr[0].speaker
    let result = []
    let collector = []
    for(let i = 0; i < wordArr.length; i++){
        if(wordArr[i].speaker !== currentSpeaker){
            currentSpeaker = wordArr[i].speaker;
            result.push(collector)
            collector = []
            if(!speakerList.includes(wordArr[i].speaker)){
                speakerList.push(wordArr[i].speaker)
            }
        }
        collector.push(wordArr[i])
    }
    result.push(collector)
    console.log(result)
    return {speakerNames: speakerList, sections: result}
}

const Editor = (props) =>{
    const [editorMode, setEditorMode] = useState(0)
    const [stateSections, setStateSections] = useState([])
    const [wordNodes, setWordNodes] = useState([])
    const [selectedWordIndex, setSelectedWordIndex] = useState(0)

    //const [speakers, setSpeakers] = useState(speakerNames)


    //on mount
    useEffect(()=>{
        console.log(props.data)
        let data = props.data.data
        const temp = parseJsonAndSetStates(data)
        let speakerNames = temp.speakerNames
        let sections = temp.sections
        //setSpeakers(speakerNames)
        setStateSections(sections)
    }, [])
    

    //when state sections change,
    //readd the totalword index and upddate the list
    useEffect(()=>{
        console.log("Resetting this jabroni")
        if(!stateSections){
            return
        }
        let result = []
        let currentIndex = 0
        const words = document.querySelectorAll(".Editor__Word")
        words.forEach(el=>{
            //el.createAttribute("totalwordindex")
            el.setAttribute("totalwordindex", currentIndex++)
            result.push(el)
        })
        setWordNodes(result)

    }, [stateSections])


    //functions to thread


    const setSpeakerNames = (oldName, newName) =>{
        //this needs to alter the larger guy up in wrapper!!
        //const innerSpeakers = [...speakers];
        //const i = innerSpeakers.indexOf(oldName)
        //innerSpeakers[i] = newName
        //console.log(innerSpeakers)
        //setSpeakers(innerSpeakers)
        const newStateSections = []
        for(let i = 0; i < stateSections.length; i++){
            if(stateSections[i][0].speaker !== oldName){
                newStateSections.push(stateSections[i])
                continue
            }
            const collector = []
            for(let j = 0; j < stateSections[i].length; j++){
                const word = stateSections[i][j]
                word.speaker = newName
                collector.push(word)
            }
            newStateSections.push(collector)
        }
        setStateSections(newStateSections)
    }

    const handleWordClick = (e) =>{
        if(editorMode === 2){
            return
        }
        const newIndex = e.target.getAttribute("totalwordindex")
        if(selectedWordIndex === newIndex){
            setEditorMode(2)
            return
        }
        wordNodes[selectedWordIndex].classList.remove("Editor__SelectedWord")
        setSelectedWordIndex(newIndex)
        wordNodes[newIndex].classList.add("Editor__SelectedWord")
    }
    

    if(!stateSections){
        console.log("Nothing here")
        return null
    }
    console.log("SOMETHING HERE")
    return(
        <div>
        <h1>Editor</h1>
        <AudioPlayerWrapper />
        {stateSections.map((words, i) => {
            return(
                <div className="section">
                <SpeakerSection key={i*2} speaker={words[0].speaker} stateUpdater={setSpeakerNames} />
                <Text setEditorMode={setEditorMode} editorMode={editorMode} handleWordClick={handleWordClick} text={words} specialKey={i} key={i*2+1} />
                </div>
            )
        })}
        </div>
    )
}

export default Editor