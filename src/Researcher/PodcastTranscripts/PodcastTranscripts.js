import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"
import {getTranscriptsForPodcast, clearTranscriptsForPodcast} from "../../Store/actions"
import EpisodeDisplay from "../../Displays/EpisodeDisplay/EpisodeDisplay"

const PodcastTranscripts = (props) =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const {id} = useParams()
    
    const transcripts = useSelector(state=>state.transcripts)

    const [stateTranscripts, setStateTranscripts] = useState(transcripts)

    useEffect(()=>{
        const prom = getTranscriptsForPodcast(id)
        prom.then(val=>dispatch(val))

        return ()=>dispatch(clearTranscriptsForPodcast())
    },[])

    useEffect(()=>{
        setStateTranscripts(transcripts)
    }, [transcripts])

    const createClickFunction = (id) => {
        return ()=>{
            history.push("/transcription/" + id)
        }
    }

    if(!stateTranscripts.length){
        return <p>Loading</p>
    }else{
        return(
            <EpisodeDisplay episodes={transcripts} clickStub={"/transcriber/transcribe"} title={"Open Jobs"} transcribeButton={false} />
        )
    }
}

export default PodcastTranscripts