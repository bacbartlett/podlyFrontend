import {GET_PODCAST, CLEAR_PODCAST, SET_USER, REMOVE_USER, SET_ERROR, CLEAR_ERROR, SET_MYPODCASTS, CLEAR_MYPODCASTS, SET_MEDIAURL, CLEAR_MEDIAURL,
    SET_TRANSCRIPTS, CLEAR_TRANSCRIPTS, GET_EDITORDATA, CLEAR_EDITORDATA, UPDATE_WORDARR, UPDATE_AUDIOISLOADED, UPDATE_SECTIONS, CLEAR_SECTIONS} from "./actions"

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

export const transcriptsReducer = (state=[], action)=>{
    switch(action.type){
        case SET_TRANSCRIPTS:{
            return action.payload
        }
        case CLEAR_TRANSCRIPTS: {
            return []
        }
        default:{
            return state
        }
    }
}

export const editorReducer = (state={}, action) =>{
    switch(action.type){
        case GET_EDITORDATA:{
            return action.payload
        }
        case CLEAR_EDITORDATA:{
            return {}
        }
        default:{
            return state
        }
    }
}

export const updateWordArrReducer = (state = 0, action) => {
    switch(action.type){
        case UPDATE_WORDARR:{
            return state + 1
        }
        default:{
            return state
        }
    }
}

export const updateAudioIsLoadedReducer = (state = 0, action) =>{
    switch(action.type){
        case UPDATE_AUDIOISLOADED:{
            return state + 1
        }
        default:{
            return state
        }
    }
}

export const sectionsReducer = (state = [], action) =>{
    switch(action.type){
        case UPDATE_SECTIONS:{
            return action.payload
        }
        case CLEAR_SECTIONS:{
            return state
        }
        default:{
            return state
        }
    }
}