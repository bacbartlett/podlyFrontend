import {GET_PODCAST} from "./actions"

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