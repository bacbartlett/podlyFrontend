import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import SpeakerBox from "./SpeakerBox"
import {createNewTranscriptJob} from "../../Store/actions"
import { useHistory, useParams } from "react-router";
import {clearMediaUrl} from "../../Store/actions"

const NewTranscriptForm = (props) =>{
    const {id, title} = useParams()
    const dispatch = useDispatch()
    const mediaUrl = useSelector(state=>state.mediaUrl)
    const history = useHistory()
    const [speakerSections, setSpeakerSections] = useState(["item"])
    const [loading, setLoading] = useState(false)


    useEffect(()=>{
        return ()=>{
            dispatch(clearMediaUrl())
        }
    },[])
    
    const addSpeaker = () =>{
        const temp = [...speakerSections]
        temp.push("item")
        setSpeakerSections(temp)
    }

    const submit = () =>{
        setLoading(true)
        const getAllBoxes = document.querySelectorAll(".speakerInputBox")
        const speakers = []
        getAllBoxes.forEach((el)=>{
            speakers.push(el.value)
        })
        const prom = createNewTranscriptJob(mediaUrl, id, speakers, title)
        prom.then(val=> {
            dispatch(val);
            history.goBack()
        })
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
            {loading ? <button>Pending</button> : <button onClick={submit}>Submit</button>}
        </div>
        
    )
}

export default NewTranscriptForm