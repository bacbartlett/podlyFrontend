import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListDividers from "./ContextBoxSpeaker"

const SpeakerSection = (props) =>{
    const speakerName = props.speaker
    const stateUpdater = props.stateUpdater
    const number = props.number
    const sections = props.sections
    const changeSectionSpeaker = props.changeSectionSpeaker
    

    const speakerList = useSelector(state=>state.speakers)

    const [localSpeakerList, setLocalSpeakerList] = useState(speakerList)

    const [localSections, setLocalSections] = useState(sections)

    console.log("THISNFISNFSF", sections[0][0].speaker)

    useEffect(()=>{
        console.log("RUNNING FUCKER", sections[0][0].speaker)
        setLocalSections(sections)
    }, [sections])

    useEffect(()=>{
        setLocalSpeakerList(speakerList)
    }, [speakerList])

    const changeSectionNameFunction = (name, sections) =>{
        console.log("Running:", number, props.sections[0][0].speaker, props.sections[0][1].speaker)
        changeSectionSpeaker(number, name, sections)
    } 

    const createSectionNameSwitcherFunction = (name, sections)=>{
        console.log("CREATING:", number, props.sections[0][0].speaker, props.sections[0][1].speaker)
        return(e) =>{
            changeSectionNameFunction(name, sections)
        }
    }
    

    const changeSpeakerName = (name) =>{
        stateUpdater(speakerName, name, sections)
    }

    const createNameSwitcherFunction = (name, sections) =>{
        return (e)=>{
            changeSpeakerName(name, sections)
        }
    }

    //set up the event listeners to open and close menus
    useEffect(()=>{
        const handleClick = (e) =>{
            console.log(localSpeakerList)
            e.stopPropagation()
            document.querySelector("html").addEventListener("click", handleClickOut)
            const div = document.createElement("div")
            document.querySelector("body").appendChild(div)
            div.classList.add("speakerClickContextBox")
            div.style.top = e.clientY + "px";
            div.style.left = e.clientX + "px";
            div.backgroundColor = "grey"
            
            for(let i = 0; i < localSpeakerList.length; i++){
                console.log(i)
                const option = document.createElement("div")
                option.innerHTML = `${speakerName} => ${localSpeakerList[i]}`
                option.style.display = "flex"
                option.classList.add("speakerOption")
                div.appendChild(option)
                option.addEventListener("click", createNameSwitcherFunction(localSpeakerList[i], localSections))
            }
            for(let i = 0; i < localSpeakerList.length; i++){
                console.log(i)
                const option = document.createElement("div")
                option.innerHTML = `This Section => ${localSpeakerList[i]}`
                option.style.display = "flex"
                option.classList.add("speakerOption")
                div.appendChild(option)
                option.addEventListener("click", createSectionNameSwitcherFunction(localSpeakerList[i], localSections))
            }

            const option = document.createElement("div")
            option.innerHTML = "Change Name Options"
            option.style.display = "flex"
            option.classList.add("speakerOption")
            div.appendChild(option)
            option.addEventListener("click", props.openSpeakerBox)

            

            e.target.addEventListener("click", handleClickOut)
        }
        const handleClickOut = (e) =>{
            document.querySelector("html").removeEventListener("click", handleClickOut)
            const sections = document.querySelectorAll(".speakerSecontion")
            sections.forEach(el=>el.removeEventListener("click", handleClickOut))
            const boxes = document.querySelectorAll(".speakerClickContextBox")
            boxes.forEach(el=> document.querySelector("body").removeChild(el))
        }
        document.getElementById(`speakerSection${number}`).addEventListener("click", handleClick)

        const removeEventListeners = () =>{
            const temp = document.getElementById(`speakerSection${number}`)
            if(temp){
                temp.removeEventListener("click", handleClick)
            }
            
        }
        return removeEventListeners
    })

    return(
        <>
        <div className="speakerSecontion" id={`speakerSection${number}`}>
            {speakerName + ":"}
        </div>
        </>
    )
}

export default SpeakerSection