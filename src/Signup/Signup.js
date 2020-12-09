import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import {clearError, signupUser} from "../Store/actions"

const Signup = (props) =>{
    const dispatch = useDispatch()
    const history = useHistory()

    const error = useSelector(state=>state.error)
    const user = useSelector(state=>state.user)

    const [option, setOption] = useState("Podcaster")
    const [researcherSignup, setResearcherSignup] = useState(false)
    const [transcriberSignup, setTranscriberSignup] = useState(false)
    const [podcasterSignup, setPodcasterSignup] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
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
        setResearcherSignup(false)
        setTranscriberSignup(false)
        setPodcasterSignup(false)
    }

    const handleChange = (e) =>{
        setAllToFalse()
        const selection = e.target.value
        if(selection === "Podcaster"){
            setOption("Podcaster")
            setPodcasterSignup(true)
        } else if(selection === "Transcriber"){
            setOption("Transcriber")
            setTranscriberSignup(true)
        } else{
            setResearcherSignup(true)
            setOption("Researcher")
        }
    }

    const handlePassword = e => setPassword(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handleFirstName = e => setFirstName(e.target.value)
    const handleLastName = e => setLastName(e.target.value)

    const submitDetails = e =>{
        let userDetails
        if(researcherSignup){
            userDetails = signupUser(option, email, password)
        } else {
            userDetails = signupUser(option, email, password, firstName, lastName)
        }
        userDetails.then(val => dispatch(val))
    }

    return(
        <div className="loginPage">
            <h1>Signup</h1>
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
                {podcasterSignup || transcriberSignup ? 
                <>
                <label>First Name</label>
                <input type="text" value={firstName} onChange={handleFirstName}></input>
                <label>Last Name</label>
                <input type="text" value={lastName} onChange={handleLastName}></input>
                </> : null
            }
            </div>
            <button className="submitButton" onClick={submitDetails}>Login</button>
        </div>
        
    )
}

export default Signup