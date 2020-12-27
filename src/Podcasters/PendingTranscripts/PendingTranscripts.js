import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import {getPendingTranscripts, clearPendingTranscripts} from "../../Store/actions"
import EpisodeDisplay from "../../Displays/EpisodeDisplay/EpisodeDisplay"

const PendingTranscripts = (props) =>{
    const dispatch = useDispatch()
    const history = useHistory()
    
    const transcripts = useSelector(state=>state.transcripts)

    const [stateTranscripts, setStateTranscripts] = useState(transcripts)

    useEffect(()=>{
        const prom = getPendingTranscripts()
        prom.then(val=>dispatch(val))

        return ()=>dispatch(clearPendingTranscripts())
    },[])

    useEffect(()=>{
        setStateTranscripts(transcripts)
    }, [transcripts])

    const createClickFunction = (id) => {
        return ()=>{
            history.push("/transcriber/transcribe/" + id)
        }
    }

    if(stateTranscripts.msg){
        return <h4>{stateTranscripts.msg}</h4>
    }

    if(!stateTranscripts.length){
        return <p>Loading</p>
    }else{
        return(
            <EpisodeDisplay episodes={transcripts} clickStub={"/transcriber/transcribe"} title={"Open Jobs"} transcribeButton={false} />
        )
    }
}

export default PendingTranscripts