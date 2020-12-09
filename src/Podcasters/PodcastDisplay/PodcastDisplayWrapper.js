import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import PodcastDisplay from "./PodCastDisplay"
import {getPodcast} from "../../Store/actions"

const PodcastDisplayWrapper = (props) =>{
    const dispatch = useDispatch()
    const podcastInfo = useSelector(state=>state.podcastDisplay)

    useEffect(()=>{
        console.log("calling the back")
        const asyncFunc = async() => await getPodcast(1)
        asyncFunc().then(val=>dispatch(val))
    }, [])

    return(
        
        <PodcastDisplay info={podcastInfo} />
    )
}

export default PodcastDisplayWrapper