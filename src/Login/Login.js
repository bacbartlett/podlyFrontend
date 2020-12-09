import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import {clearError, setUser} from "../Store/actions"

const Login = (props) =>{
    const dispatch = useDispatch()
    const history = useHistory()

    const error = useSelector(state=>state.error)
    const user = useSelector(state=>state.user)

    const [option, setOption] = useState("Podcaster")
    const [researcherLogin, setResearcherLogin] = useState(false)
    const [transcriberLogin, setTranscriberLogin] = useState(false)
    const [podcasterLogin, setPodcasterLogin] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    //const [userState, setUserState] = useState(user)
    const [stateError, setStateError] = useState(error)
    

    const ifLoggedInThenRedirect = () =>{
        if(user.type){
            history.push(`/${user.type.toLowerCase()}`)
        }
    }

    useEffect(()=>{
        ifLoggedInThenRedirect()
    }, [user])

    useEffect(()=>{
        setStateError(error)
    }, [error])

    useEffect(()=>{
        return ()=>{
            dispatch(clearError())
        }
    }, [])

    const setAllToFalse = () =>{
        setResearcherLogin(false)
        setTranscriberLogin(false)
        setPodcasterLogin(false)
    }

    const handleChange = (e) =>{
        setAllToFalse()
        const selection = e.target.value
        if(selection === "Podcaster"){
            setOption("Podcaster")
            setPodcasterLogin(true)
        } else if(selection === "Transcriber"){
            setOption("Transcriber")
            setTranscriberLogin(true)
        } else{
            setResearcherLogin(true)
            setOption("Researcher")
        }
    }

    const handlePassword = e => setPassword(e.target.value)
    const handleEmail = e => setEmail(e.target.value)

    const submitDetails = e =>{
        const userDetails = setUser(option, email, password)
        userDetails.then(val => dispatch(val))
    }

    return(
        <div className="loginPage">
            <h1>Login</h1>
            <label>Login as:</label>
            <select value={option} onChange={handleChange}>
                <option value="Podcaster">Podcaster</option>
                <option value="Transcriber">Transcriber</option>
                <option value="Researcher">Researcher</option>
            </select>
            <div className="error">
                {error}
            </div>
            <div className="loginForm">
                <label>Email</label>
                <input type="email" value={email} onChange={handleEmail}></input>
                <label>Password</label>
                <input type="password" value={password} onChange={handlePassword}></input>
            </div>
            <button className="submitButton" onClick={submitDetails}>Login</button>
        </div>
        
    )
}

export default Login