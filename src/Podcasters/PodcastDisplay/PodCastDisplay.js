import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router"
import {setMediaUrl, createNewTranscriptJob} from "../../Store/actions"




const PodcastDisplay = (props) =>{
    const history = useHistory()
    const dispatch = useDispatch()
    const {id} = useParams()
    const [message, setMessage] = useState(false)

    console.log("new version")

    const createToTranscriptLink = (id) =>{
        return () =>{
            history.push("/transcripts/" + id)
        }
    }

    const createNewTranscriptLink = (mediaurl, title) =>{
        return () => {
            setMessage(true)
            // const prom = createNewTranscriptJob(mediaUrl, id, [], title)
            // prom.then(val=>{
            //     dispatch(setMediaUrl(val))
            //     history.push(`/podcaster/podcasts/${id}/newtranscript/${title}`)
            // })
            
        }
    }


    if(!props.info.title){
        return(
            <p>Loading</p>
        )
    }
    return(
        <>
        {message ? 
        <div className="darkenTheScreen">
            <div className="speakerEdit">
                <h4>As the AWS Natual Language Processing service changes for every piece of audio analysed, the ability to request new episode transcripts is gated behind a special passcode. Please contact the creater, Brandon Bartlett, if you would like access to this functionality. I can be reached at brandonacb@gmail.com.</h4>
            </div>
        </div>
        : null}
        <div className="podcastEpisodeDisplay">
        <div className="podcastCover" style={{backgroundImage: `url(${props.info.image})`}}></div>
        <h2>{props.info.title}</h2>
        <p>{props.info.description}</p>
        {props.info.items.map((el, i)=>{
            return(
                <div className="podcastEpisode" key={i}>
                    <h4>{el.title}</h4>
                    <p>{el.pubDate}</p>
                    {!el.status ? <button onClick={createNewTranscriptLink(el.enclosure.url, el.title)}>Transcribe this</button> : el.transcriptId ? <button onClick={createToTranscriptLink(el.transcriptId)}>View Transcript</button> : <button>Transcript Pending</button>}
                </div>
            )
        })}
        </div>
        </>
    )
}

export default PodcastDisplay