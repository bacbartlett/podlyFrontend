import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import SpeakerBox from "./SpeakerBox"
import {createNewTranscriptJob} from "../../Store/actions"
import { useHistory, useParams } from "react-router";
import {clearMediaUrl} from "../../Store/actions"
import SpeakerDisplay from "../../Displays/AddOrRemoveSpeakers/AddOrRemoveSpeakers"

const NewTranscriptForm = (props) =>{
    const {id, title} = useParams()
    const dispatch = useDispatch()
    const mediaUrl = useSelector(state=>state.mediaUrl)
    const history = useHistory()
    const [speakerSections, setSpeakerSections] = useState(["item"])
    const [loading, setLoading] = useState(false)
    const transcriptId = useSelector(state=>state.mediaUrl)


    useEffect(()=>{
        return ()=>{
            dispatch(clearMediaUrl())
        }
    },[])
    

    const submit = () =>{
        setLoading(true)
        history.goBack()
    }



    return(
        <div className="speakerNameForm">
            <SpeakerDisplay id={transcriptId} />
            <br/>
            {loading ?  <button key={101}>Pending</button> : <button key={102} onClick={submit}>Submit</button>}
        </div>
        
    )
}

export default NewTranscriptForm