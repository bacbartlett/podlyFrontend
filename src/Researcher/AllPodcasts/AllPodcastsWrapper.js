import React, {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import {getALlPodcasts, clearPodcast} from "../../Store/actions"
import PodcastDisplay from "../../Displays/PodcastDisplay/PodcastDisplay"

const AllPodcastWrapper = (props) =>{
    const [toDisplay, setToDisplay] = useState([])
    const dispatch = useDispatch()
    const podcastDisplay = useSelector(state=>state.myPodcasts)

    useEffect(()=>{
        const prom = getALlPodcasts(0)
        prom.then(val=>dispatch(val))
        return ()=>{
            dispatch(clearPodcast())
        }
    }, [])

    useEffect(()=>{
        setToDisplay(podcastDisplay)
        
    }, [podcastDisplay])

    if(!toDisplay.results || !toDisplay.results.length){
        return(
            <p>Loading</p>
        )
    }

    return(
        <PodcastDisplay clickStub={"/podcasts"} podcasts={podcastDisplay} />
    )

}

export default AllPodcastWrapper