import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
//import PodcastDisplay from "./PodCastDisplay"
import {getPodcast, clearPodcast} from "../../Store/actions"
import { useHistory, useParams } from "react-router"
import EpisodeDisplay from "../../Displays/EpisodeDisplay/EpisodeDisplay"
import {setMediaUrl, createNewTranscriptJob} from "../../Store/actions"


const PodcastDisplayWrapper = (props) =>{
    const {id} = useParams()
    const dispatch = useDispatch()
    const podcastInfo = useSelector(state=>state.podcastDisplay)
    const history = useHistory()

    const [message, setMessage] = useState(false)


    console.log("Is it the second one????")

    const createToTranscriptLink = (id) =>{
        return () =>{
            history.push("/transcripts/" + id)
        }
    }

    const createNewTranscriptLink = (mediaurl, title) =>{
        return () => {
            setMessage(true)
            // const prom = createNewTranscriptJob(mediaurl, id, [], title)
            // prom.then(val=>{
            //     dispatch(setMediaUrl(val))
            //     history.push(`/podcaster/podcasts/${id}/newtranscript/${title}`)
            // })
            
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

    const removeMessage = e => setMessage(false)

    return(
        <>
        {message ? 
        <div className="darkenTheScreen2" onClick={removeMessage}>
            <div className="message">
                <h4>As the AWS Natual Language Processing service changes for every piece of audio analysed, the ability to request new episode transcripts is gated behind a special passcode. Please contact the creater, Brandon Bartlett, if you would like access to this functionality. I can be reached at brandonacb@gmail.com.</h4>
            </div>
        </div>
        : null}
        <EpisodeDisplay episodes={podcastInfo} title={podcastInfo[0].podcastTitle}
        clickStub={"/transcript"} transcribeButton={true} transcibeFunction={createNewTranscriptLink}/>
        </>
    )
}

export default PodcastDisplayWrapper