import { useDispatch } from "react-redux"
import {baseUrl} from "../Globals"

export const GET_PODCAST = "GET_PODCAST"
export const SET_USER = "SET_USER"
export const REMOVE_USER = "REMOVE_USER"
export const SET_ERROR = "SET_ERROR"
export const CLEAR_ERROR = "CLEAR_ERROR"


export const getPodcast = async (podcastId) =>{
    const res = await fetch(baseUrl + "/podcaster/podcasts/" + podcastId)
    const data = await res.json()
    return{type: GET_PODCAST, payload: data}
    
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
    const res = await fetch(`${baseUrl}/${type.toLowerCase()}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
    const data = await res.json()
    if(data.msg){
        return setError(data.msg)
    }
    localStorage.setItem("token", data.token)
    localStorage.setItem("type", type)
    console.log(data, data.token)
    return {
        type: SET_USER,
        payload: {...data, type}
    }
}

export const signupUser = async (type, email, password, firstName, lastName) =>{
    const res = await fetch(`${baseUrl}/${type.toLowerCase()}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password, firstName, lastName})
    })
    const data = await res.json()
    if(data.msg){
        return setError(data.msg)
    }
    localStorage.setItem("token", data.token)
    localStorage.setItem("type", type)
    console.log(data.token)
    return {
        type: SET_USER,
        payload: {...data, type}
    }
}

export const removeUser = () =>{
    return {
        type: REMOVE_USER,
        payload: {}
    }
}