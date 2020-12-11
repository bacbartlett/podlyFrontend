import React from "react"
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router"
import {setMediaUrl} from "../../Store/actions"



const PodcastDisplay = (props) =>{
    const history = useHistory()
    const dispatch = useDispatch()
    const {id} = useParams()

    const createToTranscriptLink = (id) =>{
        return () =>{
            history.push("/transcripts/" + id)
        }
    }

    const createNewTranscriptLink = (mediaurl) =>{
        return () => {
            dispatch(setMediaUrl(mediaurl))
            history.push(`/podcaster/podcasts/${id}/newtranscript`)
        }
    }


    if(!props.info.title){
        return(
            <p>Loading</p>
        )
    }
    return(
        <div className="podcastEpisodeDisplay">
        <div className="podcastCover" style={{backgroundImage: `url(${props.info.image})`}}></div>
        <h2>{props.info.title}</h2>
        <p>{props.info.description}</p>
        {props.info.items.map((el, i)=>{
            return(
                <div className="podcastEpisode" key={i}>
                    <h4>{el.title}</h4>
                    <p>{el.pubDate}</p>
                    {!el.status ? <button onClick={createNewTranscriptLink(el.enclosure.url)}>Transcribe this</button> : el.transcriptId ? <button onCLick={createToTranscriptLink(el.transcriptId)}>View Transcript</button> : <button>Transcript Pending</button>}
                </div>
            )
        })}
        </div>
    )
}

export default PodcastDisplay