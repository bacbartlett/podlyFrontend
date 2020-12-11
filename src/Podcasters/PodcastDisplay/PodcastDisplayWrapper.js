import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import PodcastDisplay from "./PodCastDisplay"
import {getPodcast, clearPodcast} from "../../Store/actions"
import { useParams } from "react-router"

const PodcastDisplayWrapper = (props) =>{
    const {id} = useParams()
    const dispatch = useDispatch()
    const podcastInfo = useSelector(state=>state.podcastDisplay)

    useEffect(()=>{
        console.log("calling the back")
        const asyncFunc = async() => await getPodcast(id)
        asyncFunc().then(val=>dispatch(val))
        return clearPodcast
    }, [])

    return(
        
        <PodcastDisplay info={podcastInfo} />
    )
}

export default PodcastDisplayWrapper