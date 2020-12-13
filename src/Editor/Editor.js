import React, { useEffect, useState } from "react"
import AudioPlayerWrapper from "./AudioPlayer/AudioPlayerWrapper"
import Text from "./Text/Text"
import SpeakerSection from "./SpeakerSection/SpeakerSection"
import { useDispatch, useSelector } from "react-redux"
import {updateAudioIsLoaded} from "../Store/actions"

const Editor = (props) =>{
    const dispatch = useDispatch()
    const {data, speakerOptions} = props
    const words = data.data
    const updateWordArr = useSelector(state=>state.updateWordArr)
    const updateAudioIsLoadedSLice = useSelector(state=>state.updateAudioIsLoaded)

    const [sections, setSections] = useState([])
    const [wordIndex, setWordIndex] = useState([])
    const [currentlySelection, setCurrentlySelected] = useState([0,0])
    const [allWords, setAllWords] = useState([])
    const [editorMode, setEditorMode] = useState(0)
    const [openLocalTextMenu, setOpenLocalTextMenu] = useState(false)

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

    //This is to handle reassigning sections inside of a larger chunk
    useEffect(()=>{

        const handleLocalTextChange = (name, selected) =>{
            //console.log(selected, selected.toString(), selected.innerHTML)
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
            console.log(before, toChange, after)
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
            console.log("closing")
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

        return ()=>{document.getElementById("editorPage").removeEventListener("mouseup", handleMouseUp)}
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

    return(
        <div className="editorPage" id="editorPage">
            <h2>Editor</h2>
            <AudioPlayerWrapper keepWithTime={keepWithTime} />
            {sections.map((el, i) => {
                return(
                    <div className="section" key={i}>
                        <SpeakerSection changeSectionSpeaker={changeSectionSpeaker} speakerList={speakerOptions} number={i} speaker={el[0].speaker} sections={sections} stateUpdater={changeSpeaker} />
                        <Text text={el} specialKey={i} editorMode={editorMode} />
                    </div>
                )
            })}
        </div>
    )

}

export default Editor