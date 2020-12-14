import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import {getTranscripts, clearTranscripts} from "../../../Store/actions"
import EpisodeDisplay from "../../../Displays/EpisodeDisplay/EpisodeDisplay"

const TranscriptDisplay = (props) =>{
    const dispatch = useDispatch()
    const history = useHistory()
    
    const transcripts = useSelector(state=>state.transcripts)

    const [stateTranscripts, setStateTranscripts] = useState(transcripts)

    useEffect(()=>{
        const prom = getTranscripts()
        prom.then(val=>dispatch(val))

        return ()=>dispatch(clearTranscripts())
    },[])

    useEffect(()=>{
        setStateTranscripts(transcripts)
    }, [transcripts])

    const createClickFunction = (id) => {
        return ()=>{
            history.push("/transcriber/transcribe/" + id)
        }
    }

    if(!stateTranscripts.length){
        return <p>Loading</p>
    }else{
        // return(
        //     <div className="TranscriptPage">
        //         {stateTranscripts.map((el, i)=>{
        //             return(<div className="neededTranscript" key={i} onClick={createClickFunction(el.id)}>
        //                 <h4>{el.title}</h4>
        //                 <p>From: {el.podcastName}</p>
        //             </div>)
        //         })}
        //     </div>
        // )
        return(
            <EpisodeDisplay episodes={transcripts} clickStub={"/transcriber/transcribe"} title={"Open Jobs"} transcribeButton={false} />
        )
    }
}

export default TranscriptDisplay