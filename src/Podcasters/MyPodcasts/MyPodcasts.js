import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {setMyPodcasts, clearMyPodcasts, setNewPodcast} from "../../Store/actions"


const MyPodcasts = (props) =>{
    const history = useHistory()
    const myPodcasts = useSelector(state=>state.myPodcasts)
    const dispatch = useDispatch()

    const [myPodcastsState, setMyPodcastsState] = useState(myPodcasts || [])
    const [newRSSFeed, setNewRSSFeed] = useState("")

    useEffect(()=>{
        const pods = setMyPodcasts()
        pods.then(val=> dispatch(val))
        return ()=>{
            dispatch(clearMyPodcasts())
        }
    },[])

    useEffect(()=>{
        setMyPodcastsState(myPodcasts)
    },[myPodcasts])

    const handleRSSFeedChange = (e) => setNewRSSFeed(e.target.value)

    const addFeed = e =>{
        setNewRSSFeed("")
        const prom = setNewPodcast(newRSSFeed)
        prom.then(val => dispatch(val))
    }

    const generateLinkFunction = (id) =>{
        return () =>{
            history.push("/podcaster/podcasts/" + id)
        }
    }

    return(
        <>
        <div className="myPodcasts">
            {myPodcastsState.map((el, i) =>{
                return(
                    <div onClick={generateLinkFunction(el.id)} className="podcast" key={i}>
                        <h3>{el.name}</h3>
                    </div>
                )
            })}
        </div>
        <br/>
        <br/>
        <label>Add New RSS Feed:</label>
        <input value={newRSSFeed} onChange={handleRSSFeedChange}></input>
        <button onClick={addFeed}>Add Feed</button>


        </>
    )
}

export default MyPodcasts