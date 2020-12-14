import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TranscriptViewer from "./TranscriptView"
import {getEditorData, clearEditorData} from "../Store/actions"
import { useParams } from "react-router"

const ViewerWrapper = (props) =>{
    const dispatch = useDispatch()
    const {transcriptId} = useParams()
    const editorData = useSelector(state=>state.editorData)

    const [stateEditorData, setStateEditorData] = useState(editorData)

    useEffect(()=>{
        const prom = getEditorData(transcriptId)
        prom.then(val=>{dispatch(val)})
        return()=>{dispatch(clearEditorData())}
    },[])

    useEffect(()=>{
        setStateEditorData(editorData)
    }, [editorData])

    if(!stateEditorData.data){
        return <p>Loading</p>
    } 
    return(
        <TranscriptViewer data={stateEditorData} speakerOptions={editorData.transcript.Speakers} />
    )
}


export default ViewerWrapper