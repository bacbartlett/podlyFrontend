import React, { useEffect, useState } from "react";
import ListDividers from "./ContextBoxSpeaker"

const SpeakerSection = (props) =>{
    const speakerName = props.speaker
    const stateUpdater = props.stateUpdater
    const number = props.number
    const sections = props.sections
    const changeSectionSpeaker = props.changeSectionSpeaker

    const changeSectionNameFunction = (name) =>{
        changeSectionSpeaker(number, name, sections)
    } 

    const createSectionNameSwitcherFunction = (name, sections)=>{
        return(e) =>{
            changeSectionNameFunction(name)
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
            e.stopPropagation()
            document.querySelector("html").addEventListener("click", handleClickOut)
            const div = document.createElement("div")
            document.querySelector("body").appendChild(div)
            div.classList.add("speakerClickContextBox")
            div.style.top = e.clientY + "px";
            div.style.left = e.clientX + "px";
            div.backgroundColor = "grey"
            
            for(let i = 0; i < props.speakerList.length; i++){
                const option = document.createElement("div")
                option.innerHTML = `${speakerName} => ${props.speakerList[i].name}`
                option.style.display = "flex"
                option.classList.add("speakerOption")
                div.appendChild(option)
                option.addEventListener("click", createNameSwitcherFunction(props.speakerList[i].name, sections))
            }
            for(let i = 0; i < props.speakerList.length; i++){
                const option = document.createElement("div")
                option.innerHTML = `This Section => ${props.speakerList[i].name}`
                option.style.display = "flex"
                option.classList.add("speakerOption")
                div.appendChild(option)
                option.addEventListener("click", createSectionNameSwitcherFunction(props.speakerList[i].name, sections))
            }

            

            e.target.addEventListener("click", handleClickOut)
        }
        const handleClickOut = (e) =>{
            console.log("close menu")
            document.querySelector("html").removeEventListener("click", handleClickOut)
            const sections = document.querySelectorAll(".speakerSecontion")
            sections.forEach(el=>el.removeEventListener("click", handleClickOut))
            const boxes = document.querySelectorAll(".speakerClickContextBox")
            boxes.forEach(el=> document.querySelector("body").removeChild(el))
        }
        document.getElementById(`speakerSection${number}`).addEventListener("click", handleClick)

        const removeEventListeners = () =>{
            document.getElementById(`speakerSection${number}`).removeEventListener("click", handleClick)
        }
        return removeEventListeners
    })

    return(
        <>
        <div className="speakerSecontion" id={`speakerSection${number}`}>
            <h3>{speakerName}:</h3>
        </div>
        </>
    )
}

export default SpeakerSection