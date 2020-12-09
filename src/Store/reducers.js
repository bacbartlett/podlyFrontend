import {GET_PODCAST, SET_USER, REMOVE_USER, SET_ERROR, CLEAR_ERROR} from "./actions"

export const podcastDisplayReducer = (state={}, action)=>{
    switch(action.type){
        case GET_PODCAST:{
            return action.payload
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