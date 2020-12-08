import { useDispatch } from "react-redux"
import {baseUrl} from "../Globals"

const dispatch = useDispatch()

export const GET_PODCAST = "GET_PODCAST"


export const getPodcast = async (podcastId) =>{
    const res = await fetch(baseUrl + "/podcasts/podcastId")
    const data = await res.json()
    return{type: GET_PODCAST, payload: data}
    
}