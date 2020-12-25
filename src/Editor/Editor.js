import React, { useEffect, useState } from "react"
import AudioPlayerWrapper from "./AudioPlayer/AudioPlayerWrapper"
import Text from "./Text/Text"
import SpeakerSection from "./SpeakerSection/SpeakerSection"
import { useDispatch, useSelector } from "react-redux"
import {updateAudioIsLoaded, approveTranscript, rejectTranscript} from "../Store/actions"
import { useHistory, useParams } from "react-router"
import { TextsmsTwoTone } from "@material-ui/icons"
import {baseUrl} from "../config"
import Button from '@material-ui/core/Button';

const Editor = (props) =>{
    const history = useHistory()
    const dispatch = useDispatch()
    const {transcriptId} = useParams()
    const {data, speakerOptions} = props
    const words = data.data
    const updateWordArr = useSelector(state=>state.updateWordArr)
    const updateAudioIsLoadedSLice = useSelector(state=>state.updateAudioIsLoaded)
    const typeOfUser = useSelector(state=>state.user.type)

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
        setSections(tempSections)
    }, [])



    //updates the word index for near constant lookup times
    useEffect(()=>{
        const words = document.querySelectorAll(".Editor__Word")
        const tempWordIndex = []
        const tempAllWords = []
        for(let i = 0; i < words.length; i ++){
            let secondIndex = Math.floor(words[i].getAttribute("starttime") / 10)
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
        selected.forEach(el=>el.classList.remove("Editor__SelectedWord"))

        const currentTime = (Math.floor(e.target.currentTime * 100)) / 100
        let currentIndex = Math.floor(currentTime / 10)
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

    //This is to handle reassigning sections inside of a larger chunk
    useEffect(()=>{

        const handleLocalTextChange = (name, selected) =>{
            const nodesInSection = selected.baseNode.parentNode.parentNode.childNodes
            const before = []
            const toChange = []
            const after = []
            let current = before
            for(let i = 0; i < nodesInSection.length; i++){
                //protects from the 1 word edge case
                let justSwitched = false;
                if((nodesInSection[i] === selected.baseNode.parentNode || nodesInSection[i] === selected.focusNode.parentNode) && 
                current === before){
                    current = toChange
                    if(selected.baseNode.parentNode !== selected.focusNode.parentNode){
                        justSwitched = true
                    }  
                }
                current.push(nodesInSection[i])
                if((nodesInSection[i] === selected.baseNode.parentNode || nodesInSection[i] === selected.focusNode.parentNode) && 
                current === toChange && !justSwitched){
                    current = after
                }
            }
            const tempSections = [...sections]
            const indexToEdit = toChange[0].getAttribute("sectionindex")
            const sectionToEdit = sections[indexToEdit]
            for(let i = 0; i < before.length; i++){
                before[i] = sectionToEdit[i]
            }
            for(let i = 0; i < toChange.length; i++){
                toChange[i] = sectionToEdit[i + before.length]
                toChange[i].speaker = name
            }
            for(let i = 0; i < after.length; i++){
                after[i] = sectionToEdit[i + before.length + toChange.length]
            }

            const toAdd = []
            if(before.length) toAdd.push(before)
            if(toChange.length) toAdd.push(toChange)
            if(after.length) toAdd.push(after)

            tempSections.splice(indexToEdit, 1, ...toAdd)
            document.querySelectorAll(".localSpeakerContextBox").forEach((el)=>{
                document.querySelector("body").removeChild(el)
            })
            setSections(tempSections)

        }

        const handleLocalTextChangeFactory = (name, selected) =>{
            return (e)=>{
                e.preventDefault()
                e.stopPropagation()
                handleLocalTextChange(name, selected)
            }
        }

        const closeMenu = () =>{
            document.querySelectorAll(".localSpeakerContextBox").forEach((el)=>{
                document.querySelector("body").removeChild(el)
            })
            document.querySelector("html").removeEventListener("mouseup", closeMenu)
        }

        const handleMouseUp = (e) =>{
            const selected = window.getSelection()
            if(selected.isCollapsed || editorMode === 2){
                return
            }
            e.stopPropagation()
            const open = document.querySelectorAll(".localSpeakerContextBox")
            open.forEach(el=>el.remove())
            const div = document.createElement("div")
            document.querySelector("body").appendChild(div)
            div.classList.add("localSpeakerContextBox")
            div.style.top = e.clientY + "px";
            div.style.left = e.clientX + "px";
            div.backgroundColor = "grey"

            for(let i = 0; i < speakerOptions.length; i++){
                const option = document.createElement("div")
                option.innerHTML = `This text => ${speakerOptions[i].name}`
                option.classList.add("speakerOption")
                div.appendChild(option)
                option.addEventListener("mouseup", handleLocalTextChangeFactory(speakerOptions[i].name, {baseNode: selected.baseNode, focusNode: selected.focusNode}))
            }

            document.querySelector("html").addEventListener("mouseup", closeMenu)
        }

        const editorPage = document.getElementById("editorPage")
        if(!editorPage){
            return
        }
        editorPage.addEventListener("mouseup", handleMouseUp)
    })

    useEffect(()=>{
        if(editorMode === 2){
            const selected = document.querySelector(".Editor__SelectedWord")
            const r = new Range()
            r.setStart(selected.childNodes[0], 0)
            r.setEnd(selected.childNodes[0], selected.innerHTML.length)
            const selection = window.getSelection()
            selection.collapse(null)
            selection.addRange(r)
        }
    }, [editorMode, moveSelected])

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



    const changeSpeaker = (oldName, newName, sections) =>{
        const result = []
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
        setSections(result)
    }

    const changeSectionSpeaker = (index, newName, sections) =>{
        const result = [...sections]
        const toChange = result[index]
        for(let i = 0; i < toChange.length; i++){
            toChange[i].speaker = newName
        }
        result[index] = toChange
        setSections(result)
    }

    if(!sections.length){
        return <p>Loading</p>
    }

    const submitTranscript = (e) =>{
        const selected = document.querySelectorAll(".Editor__SelectedWord")
        selected.forEach(el=>{
            el.classList.remove("Editor__SelectedWord")
        })

        const completedTranscript = []
        for(let i = 0; i < allWords.length; i++){
            const wordNode = allWords[i]
            const word = {
                startTime: wordNode.getAttribute("starttime"),
                endTime: wordNode.getAttribute("endTime"),
                speaker: wordNode.getAttribute("speaker"),
                formatted: wordNode.innerHTML.replace(/&nbsp;/g,' ')
            }
            completedTranscript.push(word)
        }
        const submit = async ()=>{
            const res = await fetch(baseUrl + "/transcriber/transcription/" + transcriptId, {
               method: "POST",
               headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                   "Content-Type": "application/json"
               },
               body: JSON.stringify({data:completedTranscript})
            })
            const data = await res.json()
            if(data.msg === "Success"){
                history.goBack()
            }
        }
        submit()
        setSubmitting(true)
       
    }

    const approveT = () =>{
        const prom = approveTranscript(transcriptId)
        prom.then(val=>{
            if(val.msg === "Success"){
                history.goBack()
            } else{
                alert("An error has occured. Please try again later")
            }
        })
    }

    const rejectT = () =>{
        const prom = rejectTranscript(transcriptId)
        prom.then(val=>{
            if(val.msg === "Success"){
                history.goBack()
            } else{
                alert("An error has occured. Please try again later")
            }
        })
    }

    return(
        <div className="editorPage" id="editorPage">
            <h2>Editor</h2>
            <AudioPlayerWrapper editorMode={editorMode} setEditorMode={setEditorMode} keepWithTime={keepWithTime} />
            {sections.map((el, i) => {
                return(
                    <div className="section" key={i}>
                        <SpeakerSection changeSectionSpeaker={changeSectionSpeaker} speakerList={speakerOptions} number={i} speaker={el[0].speaker} sections={sections} stateUpdater={changeSpeaker} />
                        <Text text={el} speaker={el[0].speaker} specialKey={i} editorMode={editorMode} />
                    </div>
                )
            })}
            <br />
            <br />
            {typeOfUser === "Podcaster" ? <><Button variant={"contained"} onClick={approveT}>Approve Transcript</Button> <Button variant={"contained"} onClick={rejectT}>Reject Transcript</Button> </>:
            submitting ? <Button variant={"contained"} >Please Wait</Button> : <Button variant={"contained"} onClick={submitTranscript}>Submit Transcript</Button>}
        </div>
    )

}

export default Editor