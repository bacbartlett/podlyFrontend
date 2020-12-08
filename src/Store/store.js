import {createStore, applyMiddleware, combineReducers, compose} from "redux"

import {podcastDisplayReducer} from "./reducers"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({podcastDisplay: podcastDisplayReducer})

const configureStore = initialState =>{
    return createStore(reducer, initialState)
}

const store = configureStore({})

export default store