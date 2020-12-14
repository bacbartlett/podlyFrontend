import React, { useEffect, useState } from "react"
import AudioPlayerWrapper from "./AudioPlayer/AudioPlayerWrapper"
import Text from "./Text/Text"
import SpeakerSection from "./SpeakerSection/SpeakerSection"
import { useDispatch, useSelector } from "react-redux"
import {updateAudioIsLoaded} from "../Store/actions"
import { useHistory, useParams } from "react-router"
import { TextsmsTwoTone } from "@material-ui/icons"

const TranscriptViewer = (props) =>{
    const history = useHistory()
    const dispatch = useDispatch()
    const {transcriptId} = useParams()
    const {data, speakerOptions} = props
    const words = data.data
    console.log("In editor!!!!", words.length)
    const updateWordArr = useSelector(state=>state.updateWordArr)
    const updateAudioIsLoadedSLice = useSelector(state=>state.updateAudioIsLoaded)

    const [sections, setSections] = useState([])
    const [wordIndex, setWordIndex] = useState([])
    const [allWords, setAllWords] = useState([])
    const [editorMode, setEditorMode] = useState(0)
    const [openLocalTextMenu, setOpenLocalTextMenu] = useState(false)
    const [moveSelected, setMoveSelected] = useState(0)
    const [submitting, setSubmitting] = useState(false)

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
        tempSections.push(tempSection)
        console.log("TEMP SECTIONS:", tempSections)
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


    useEffect(()=>{
        const moveSelectorWord = (e) =>{
            if(editorMode === 0 && !document.getElementById("audio").paused){
                return
            }
            if(e.key === "ArrowRight"){
                const selected = document.querySelector(".Editor__SelectedWord")
                selected.classList.remove("Editor__SelectedWord")
                allWords[parseInt(selected.getAttribute("totalwordindex")) + 1].classList.add("Editor__SelectedWord")
                setMoveSelected(moveSelected+1)
            } else if(e.key === "ArrowLeft"){
                const selected = document.querySelector(".Editor__SelectedWord")
                selected.classList.remove("Editor__SelectedWord")
                allWords[parseInt(selected.getAttribute("totalwordindex")) - 1].classList.add("Editor__SelectedWord")
                setMoveSelected(moveSelected+1)
            }
        }

        document.querySelector("body").addEventListener("keydown", moveSelectorWord)

        return () => {
            document.querySelector("body").removeEventListener("keydown", moveSelectorWord)
        }

    })




    return(
        <div className="editorPage" id="editorPage">
            <h2>Editor</h2>
            <AudioPlayerWrapper keepWithTime={keepWithTime} />
            {sections.map((el, i) => {
                return(
                    <div className="section" key={i}>
                        <SpeakerSection number={i} speaker={el[0].speaker} sections={sections} />
                        <Text text={el} speaker={el[0].speaker} specialKey={i} />
                    </div>
                )
            })}
            <br />
            <br />
        </div>
    )

}

export default TranscriptViewer