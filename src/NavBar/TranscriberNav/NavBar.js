import React from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import {removeUser} from "../../Store/actions"

const NavBar = (props) =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const logout = () =>{
        document.cookie = "loginToken="
        history.push("/")
        dispatch(removeUser())
    }

    const goToOpenJobs = () =>{
        history.push("/transcriber")
    }

    const goToMyTranscripts = () => {
        history.push("/transcriber/mytranscripts")
    }

    const goHome = () =>{
        history.push("/")
    }

    return(
        <div className="NavBar">
            <div onClick={goHome} className="NavBar__Home NavBar__Link">
                Home
            </div>
            <div onClick={goToOpenJobs} className="NavBar__OpenJobs NavBar__Link">
                Open Jobs
            </div>
            <div onClick={goToMyTranscripts} className="NavBar__MyTranscripts NavBar__Link">
                My Transcripts
            </div>
            <div onClick={logout} className="NavBar__Logout NavBar__Link">
                Log Out
            </div>
        </div>
    )
}

export default NavBar