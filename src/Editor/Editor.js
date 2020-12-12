import React, { useEffect, useState } from "react"
import AudioPlayerWrapper from "./AudioPlayer/AudioPlayerWrapper"
import Text from "./Text/Text"
import SpeakerSection from "./SpeakerSection/SpeakerSection"
import { useDispatch, useSelector } from "react-redux"
import {updateAudioIsLoaded} from "../Store/actions"

const Editor = (props) =>{
    const dispatch = useDispatch()
    const {data} = props
    const words = data.data
    const updateWordArr = useSelector(state=>state.updateWordArr)
    const updateAudioIsLoadedSLice = useSelector(state=>state.updateAudioIsLoaded)

    const [sections, setSections] = useState([])
    const [wordIndex, setWordIndex] = useState([])
    const [currentlySelection, setCurrentlySelected] = useState([0,0])
    const [allWords, setAllWords] = useState([])
    const [editorMode, setEditorMode] = useState(0)

    console.log("Just checking:", sections)
    //On mount, set up sections
    useEffect(()=>{
        const tempSections = []
        let tempSection = []
        let currentSpeaker = words[0].speaker
        for(let i = 0; i < words.length; i++){
            const word = words[i]
            if(word.speaker !== currentSpeaker){
                tempSections.push(tempSection)
                tempSection = []
                currentSpeaker = word.speaker
            }
            tempSection.push(word)
        }
        console.log("First one ran")
        setSections(tempSections)
    }, [])



    //updates the word index for near constant lookup times
    useEffect(()=>{
        const words = document.querySelectorAll(".Editor__Word")
        const tempWordIndex = []
        const tempAllWords = []
        for(let i = 0; i < words.length; i ++){
            let secondIndex = Math.floor(words[i].getAttribute("starttime"))
            if(!tempWordIndex[secondIndex]){
                tempWordIndex[secondIndex] = []
            }
            words[i].setAttribute("totalwordindex", i)
            tempWordIndex[secondIndex].push(words[i])
            tempAllWords.push(words[i])
        }
        setWordIndex(tempWordIndex)
        setAllWords(tempAllWords)


    }, [updateWordArr])


    //this function needs to be threaded through so that it can find audio
    const keepWithTime = (e) =>{
        const selected = document.querySelectorAll(".Editor__SelectedWord")
        //testcomment
        selected.forEach(el=>el.classList.remove("Editor__SelectedWord"))

        const currentTime = (Math.floor(e.target.currentTime * 100)) / 100
        let currentIndex = Math.floor(currentTime)
        let wordsAtSecond = wordIndex[currentIndex]
        //finds words at the second prior if any
        let currentWord

        while(!wordsAtSecond && currentIndex >= 0){
            currentIndex -= 1;
            wordsAtSecond = wordIndex[currentIndex]
        }
        //only true if going negative
        if(!wordsAtSecond){
            return
        }

        for(let i = 0; i < wordsAtSecond.length; i++){
            currentWord = wordsAtSecond[i]
            if(currentWord.getAttribute("endtime") > currentTime){
                break
            }
        }
        currentWord.classList.add("Editor__SelectedWord")
    }



    const changeSpeaker = (oldName, newName, sections) =>{
        const result = []
        console.log("At start sections,", sections)
        for(let i = 0; i < sections.length; i++){
            if(sections[i][0].speaker !== oldName){
                result.push(sections[i])
            } else{
                const collector = []
                for(let j = 0; j < sections[i].length; j++){
                    const word = {...sections[i][j]}
                    word.speaker = newName
                    collector.push(word)
                }
                result.push(collector)
            }
            
        }
        console.log(result)
        console.log("Second one ran")
        setSections(result)
    }

    console.log("About to render, here is sections:", sections)
    if(!sections.length){
        return <p>Loading</p>
    }

    return(
        <div className="editorPage">
            <h2>Editor</h2>
            <AudioPlayerWrapper keepWithTime={keepWithTime} />
            {sections.map((el, i) => {
                return(
                    <div className="section" key={i}>
                        <SpeakerSection speakerList={["Bob", "Alice", "Jones"]} number={i} speaker={el[0].speaker} sections={sections} stateUpdater={changeSpeaker} />
                        <Text text={el} specialKey={i} editorMode={editorMode} />
                    </div>
                )
            })}
        </div>
    )

}

export default Editor