import {createStore, applyMiddleware, combineReducers, compose} from "redux"

import {podcastDisplayReducer, errorReducer, userReducer, myPodcastsReducer, mediaUrlReducer, transcriptsReducer, editorReducer, updateWordArrReducer,
    updateAudioIsLoadedReducer} from "./reducers"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({podcastDisplay: podcastDisplayReducer, user: userReducer, error: errorReducer, myPodcasts: myPodcastsReducer, mediaUrl: mediaUrlReducer,
    transcripts: transcriptsReducer, editorData: editorReducer, updateWordArr: updateWordArrReducer, updateAudioIsLoaded: updateAudioIsLoadedReducer})

const configureStore = initialState =>{
    return createStore(reducer, initialState, composeEnhancers())
}

export const store = configureStore({})
