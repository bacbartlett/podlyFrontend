import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import {clearError, setUser} from "../Store/actions"
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

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

    const demoLogin = () =>{
        let email
        let password = "password"
        if (option === "Podcaster"){
            email = "demoP@user.com"
        } else if (option === "Transcriber"){
            email = "demoT@user.com"
        } else if (option === "Researcher"){
            email = "demoR@user.com"
        }
        const userDetails = setUser(option, email, password)
        userDetails.then(val=>dispatch(val))
    }

    return(
        <div className="loginPage">
            <h1>Login</h1>
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
            <Button variant="contained" className="submitButton" onClick={submitDetails}>Login</Button>
            <Button variant="contained" className="demologin" onClick={demoLogin}>Demo User</Button>
        </div>
        
    )
}

export default Login