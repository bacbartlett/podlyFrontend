import {GET_PODCAST, CLEAR_PODCAST, SET_USER, REMOVE_USER, SET_ERROR, CLEAR_ERROR, SET_MYPODCASTS, CLEAR_MYPODCASTS, SET_MEDIAURL, CLEAR_MEDIAURL} from "./actions"

export const podcastDisplayReducer = (state={}, action)=>{
    switch(action.type){
        case GET_PODCAST:{
            return action.payload
        }
        case CLEAR_PODCAST:{
            return {}
        }

        default:{
            return state
        }
    }
}

export const errorReducer = (state="", action)=>{
    switch(action.type){
        case SET_ERROR:{
            return action.payload
        }
        case CLEAR_ERROR:{
            return ""
        }
        default:{
            return ""
        }
    }
}

export const userReducer = (state={}, action)=>{
    switch(action.type){
        case SET_USER:{
            return action.payload
        }
        case REMOVE_USER:{
            return {}
        }
        default:{
            return state
        }
    }
}

export const myPodcastsReducer = (state=[], action) =>{
    switch(action.type){
        case SET_MYPODCASTS:{
            return action.payload
        }
        case CLEAR_MYPODCASTS:{
            return []
        }
        default:{
            return state
        }
    }
}

export const mediaUrlReducer = (state="", action) =>{
    switch(action.type){
        case SET_MEDIAURL:{
            return action.payload
        }
        case CLEAR_MEDIAURL:{
            return ""
        }
        default:{
            return state
        }
    }
}