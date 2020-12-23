import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import {clearError, signupUser} from "../Store/actions"
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

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
            <InputLabel id="demo-simple-select-label">Login Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          onChange={handleChange}
        >
          <MenuItem value={"Podcaster"}>Podcaster</MenuItem>
          <MenuItem value={"Transcriber"}>Transcriber</MenuItem>
          <MenuItem value={"Researcher"}>Researcher</MenuItem>
        </Select>
            <div className="error">
                {error}
            </div>
            <TextField id="email" type="email" value={email} onChange={handleEmail} label="Email" />
            <TextField id="password" type="password" value={password} onChange={handlePassword} label="Password" />
                {podcasterSignup || transcriberSignup ? 
                <>
                <TextField id="firstName" type="text" value={firstName} onChange={handleFirstName} label="First Name" />
                <TextField id="lastName" type="text" value={lastName} onChange={handleLastName} label="Last Name" />
                </> : null
            }
            <Button variant="contained" className="submitButton" onClick={submitDetails}>Signup</Button>
        </div>
        
    )
}

export default Signup