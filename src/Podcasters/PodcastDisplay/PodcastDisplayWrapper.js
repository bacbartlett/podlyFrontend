import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
//import PodcastDisplay from "./PodCastDisplay"
import {getPodcast, clearPodcast} from "../../Store/actions"
import { useHistory, useParams } from "react-router"
import EpisodeDisplay from "../../Displays/EpisodeDisplay/EpisodeDisplay"
import {setMediaUrl} from "../../Store/actions"


const PodcastDisplayWrapper = (props) =>{
    const {id} = useParams()
    const dispatch = useDispatch()
    const podcastInfo = useSelector(state=>state.podcastDisplay)
    const history = useHistory()

    const createToTranscriptLink = (id) =>{
        return () =>{
            history.push("/transcripts/" + id)
        }
    }

    const createNewTranscriptLink = (mediaurl, title) =>{
        return () => {
            dispatch(setMediaUrl(mediaurl))
            history.push(`/podcaster/podcasts/${id}/newtranscript/${title}`)
        }
    }

    useEffect(()=>{
        const asyncFunc = async() => await getPodcast(id)
        asyncFunc().then(val=>dispatch(val))
        return ()=>{
            dispatch(clearPodcast())
        }
    }, [])

    if(!podcastInfo || !podcastInfo.length){
        return <h2>Loading Episodes</h2>
    }

    return(
        
        <EpisodeDisplay episodes={podcastInfo} title={podcastInfo[0].podcastTitle}
        clickStub={"/transcript"} transcribeButton={true} transcibeFunction={createNewTranscriptLink}/>
    )
}

export default PodcastDisplayWrapper