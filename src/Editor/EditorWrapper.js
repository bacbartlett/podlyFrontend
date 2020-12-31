import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Editor from "./Editor"
import {getEditorData, clearEditorData, setSpeakers} from "../Store/actions"
import { useParams } from "react-router"

const EditorWrapper = (props) =>{
    const dispatch = useDispatch()
    const {transcriptId} = useParams()
    const editorData = useSelector(state=>state.editorData)
    const speakerData = useSelector(state=>state.speakers)

    const [stateEditorData, setStateEditorData] = useState(editorData)
    const [stateSpeakers, setStateSpeakers] = useState(speakerData)

    useEffect(()=>{
        const prom = getEditorData(transcriptId)
        prom.then(val=>{dispatch(val)})
        const prom2 = setSpeakers(transcriptId)
        prom2.then(val=>{dispatch(val)})
        return()=>{dispatch(clearEditorData())}
    },[])

    useEffect(()=>{
        setStateEditorData(editorData)
    }, [editorData])

    useEffect(()=>{
        setStateSpeakers(speakerData)
    }, [speakerData])

    if(!stateEditorData.data){
        return <p>Loading</p>
    } 
    return(
        <Editor data={stateEditorData} speakerOptions={stateSpeakers} />
    )
}


export default EditorWrapper