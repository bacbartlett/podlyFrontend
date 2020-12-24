import { useDispatch } from "react-redux"
import {baseUrl} from "../config"


export const GET_PODCAST = "GET_PODCAST"
export const CLEAR_PODCAST = "CLEAR_PODCAST"
export const SET_USER = "SET_USER"
export const REMOVE_USER = "REMOVE_USER"
export const SET_ERROR = "SET_ERROR"
export const CLEAR_ERROR = "CLEAR_ERROR"
export const SET_MYPODCASTS = "SET_MYPODCASTS"
export const CLEAR_MYPODCASTS = "CLEAR_MYPODCASTS"
export const SET_MEDIAURL = "SET_MEDIAURL"
export const CLEAR_MEDIAURL = "CLEAR_MEDIAURL"
export const SET_TRANSCRIPTS = "SET_TRANSCRIPTS"
export const CLEAR_TRANSCRIPTS = "CLEAR_TRANSCRIPTS"
export const GET_EDITORDATA = "GET_EDITORDATA"
export const CLEAR_EDITORDATA = "CLEAR_EDITORDATA"
export const UPDATE_WORDARR = "UPDATE_WORDARR"
export const UPDATE_AUDIOISLOADED = "UPDATE_AUDIOISLOADED"
export const UPDATE_SECTIONS = "UPDATE_SECTIONS"
export const CLEAR_SECTIONS = "CLEAR_SECTIONS"
export const SET_PODCASTDISPLAY = "SET_PODCASTDISPLAY"
export const CLEAR_PODCASTS = "CLEAR_PODCASTS"



export const getPodcast = async (podcastId) =>{
    const res = await fetch(baseUrl + "/podcaster/podcasts/" + podcastId, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
    })
    const data = await res.json()
    return{type: GET_PODCAST, payload: data}
    
}

export const clearPodcast = () =>{
    return{
        type: CLEAR_PODCAST
    }
}

export const setError = (err) =>{
    return {
        type: SET_ERROR,
        payload: err
    }
}

export const clearError = () =>{
    return{
        type: CLEAR_ERROR
    }
}

export const setUser = async (type, email, password) =>{
    const res = await fetch(baseUrl + `/${type.toLowerCase()}/login`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          },
        body: JSON.stringify({email, password})
    })
    const data = await res.json()
    if(data.msg){
        return setError(data.msg)
    }
    localStorage.setItem("token", data.token)
    // document.cookie = `loginToken=${data.token}`;
    localStorage.setItem("type", type)
    return {
        type: SET_USER,
        payload: {...data, type}
    }
}

export const signupUser = async (type, email, password, firstName, lastName) =>{
    const res = await fetch(baseUrl + `/${type.toLowerCase()}/signup`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password, firstName, lastName})
    })
    const data = await res.json()
    if(data.msg){
        return setError(data.msg)
    }
    localStorage.setItem("token", data.token)
    //document.cookie = `loginToken=${data.token}`;
    localStorage.setItem("type", type)
    return {
        type: SET_USER,
        payload: {...data, type}
    }
}

export const removeUser = () =>{
    localStorage.setItem("token", "")
    return {
        type: REMOVE_USER,
        payload: {}
    }
}

export const setMyPodcasts = async ()=>{
    const res = await fetch(baseUrl + `/podcaster/podcasts/mypodcasts`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        credentials: "include",
        mode: "cors"
    })
    const data = await res.json()
    return {
        type: SET_MYPODCASTS,
        payload: data
    }

}

export const clearMyPodcasts = () =>{
    return {
        type: CLEAR_MYPODCASTS
    }
}

export const setNewPodcast = async (rssFeedUrl)=>{
    const res = await fetch(baseUrl + "/podcaster/podcasts/new", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({rssFeedUrl})
    })
    const data = await res.json()
    return {
        type: SET_MYPODCASTS,
        payload: data
    }
}

export const setMediaUrl = (mediaurl) =>{
    return{
        type: SET_MEDIAURL,
        payload: mediaurl
    }
}

export const clearMediaUrl = () =>{
    return{
        type: CLEAR_MEDIAURL
    }
}

export const createNewTranscriptJob = async (mediaLink, podcastId, speakerNames, title) =>{
    const res = await fetch(baseUrl + `/podcaster/podcasts/${podcastId}/newJob`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mediaUrl: mediaLink,
            speakerNames,
            title
        })
    })
    const data = await res.json();
    if(!data.msg === "starting"){
        return{
            type: SET_ERROR,
            payload: "There was a problem processing this transcription. Please try again later"
        }
    }
    // const res2 = await fetch(baseUrl + `/podcaster/podcast/${podcastId}`)
    // const data2 = res2.json()
    // return{type: GET_PODCAST, payload: data2}
    return clearMediaUrl()
    
}

export const getTranscripts = async() =>{
    const res = await fetch(baseUrl + "/transcriber/openprojects", {
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    const data = await res.json()
    return {
        type: SET_TRANSCRIPTS,
        payload: data
    }
}

export const clearTranscripts = () =>{
    return{
        type: CLEAR_TRANSCRIPTS
    }
}

export const getEditorData = async (id) =>{
    const res = await fetch(baseUrl + "/transcriber/transcription/" + id, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    const data = await res.json()
    if(data.msg){
        return{
            type: SET_ERROR,
            payload: data.msg
        }
    }
    return {
        type: GET_EDITORDATA,
        payload: data}
}

export const clearEditorData = () =>{
    return{
        type: CLEAR_EDITORDATA,
    }
}

export const updateWordArr = () =>{
    return{
        type: UPDATE_WORDARR
    }
}

export const updateAudioIsLoaded = (val) =>{
    return{
        type: UPDATE_AUDIOISLOADED,
        payload: val
    }
}

export const updateSections = (val) =>{
    return{
        type: UPDATE_SECTIONS,
        payload: val
    }
}

export const clearSections = () =>{
    return{
        type: CLEAR_SECTIONS
    }
}

export const getALlPodcasts = async (pageNum) =>{
    const res = await fetch(baseUrl + "/researcher/researching/allPodcasts/" + pageNum, {
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    const data = await res.json()
    return{
        type: SET_PODCASTDISPLAY,
        payload: data
    }
}

export const getPendingTranscripts = async () =>{
    const res = await fetch(baseUrl + "/podcaster/podcasts/pendingJobs", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    const data = await res.json()
    return {
        type: SET_TRANSCRIPTS,
        payload: data
    }
}

export const clearPendingTranscripts = () =>{
    return {
        type: CLEAR_TRANSCRIPTS
    }
}

export const approveTranscript = async (id) =>{
    const res = await fetch(baseUrl + "/podcaster/approveReject/" + id, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({msg: "Approve"})
    })
    const data = await res.json()
    return data
}

export const rejectTranscript = async (id) =>{
    const res = await fetch(baseUrl + "/podcaster/approveReject/" + id, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({msg: "Reject"})
    })
    const data = await res.json()
    return data
}

export const getTranscriptsForPodcast = async (id) =>{
    const res = await fetch(baseUrl + "/researcher/researching/allEpisodes/" + id, {
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    const data = await res.json()
    return {
        type: SET_TRANSCRIPTS,
        payload: data
    }
}

export const clearTranscriptsForPodcast = () =>{
    return {
        type: CLEAR_TRANSCRIPTS
    }
}

