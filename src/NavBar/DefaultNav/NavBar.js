import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import {removeUser} from "../../Store/actions"

const NavBar = (props) =>{
    const user = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const logout = () =>{
        document.cookie = "loginToken="
        history.push("/")
        dispatch(removeUser())
    }

    const goToMyPodcasts = () =>{
        history.push("/podcaster")
    }

    const goToPendingJobs = () => {
        history.push("/podcaster/pendingjobs")
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

    const goToAbout = () =>{
        history.push("/about")
    }

    const goToPodcasts = () =>{
        history.push("/podcasts")
    }

    const goToMyNotes = () => {
        history.push("/researcher")
    }

    const goToLogin = () =>{
        history.push("/login")
    }

    const goToSignUp = () =>{
        history.push("/signup")
    }


    if(user.type === "Podcaster"){
        return (
        <div className="NavBar">
            <div onClick={goHome} className="NavBar__Home NavBar__Link">
                Home
            </div>
            <div onClick={goToMyPodcasts} className="NavBar__MyPodcasts NavBar__Link">
                My Podcasts
            </div>
            <div onClick={goToPendingJobs} className="NavBar__PendingJobs NavBar__Link">
                Pending Jobs
            </div>
            <div className="NavBar__Loginandsignout">
            <div onClick={goToAbout} className="NavBar__MyTranscripts NavBar__Link">
                About This Site
            </div>
            <div onClick={logout} className="NavBar__Logout NavBar__Link">
                Log Out
            </div>
                
            </div>
                
            </div>
        )
    } else if(user.type === "Transcriber"){
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
                <div className="NavBar__Loginandsignout">
                <div onClick={goToAbout} className="NavBar__MyTranscripts NavBar__Link">
                    About This Site
                </div>
                <div onClick={logout} className="NavBar__Logout NavBar__Link">
                    Log Out
                </div>
                    
                </div>
                    
                </div>
        )
    } else if(user.type === "Researcher"){
        return(
            <div className="NavBar">
            <div onClick={goHome} className="NavBar__Home NavBar__Link">
                Home
            </div>
            <div onClick={goToPodcasts} className="NavBar__OpenJobs NavBar__Link">
                Browse Podcasts
            </div>
            <div onClick={goToMyNotes} className="NavBar__MyTranscripts NavBar__Link">
                My Notes
            </div>
            <div className="NavBar__Loginandsignout">
            <div onClick={goToAbout} className="NavBar__MyTranscripts NavBar__Link">
                About This Site
            </div>
            <div onClick={logout} className="NavBar__Logout NavBar__Link">
                Log Out
            </div>
                
            </div>
            
        </div>
        )
    } else{
        return(<div className="NavBar">
        <div onClick={goHome} className="NavBar__Home NavBar__Link">
            Home
        </div>
        <div onClick={goToPodcasts} className="NavBar__OpenJobs NavBar__Link">
            Browse Podcasts
        </div>
        <div onClick={goToAbout} className="NavBar__MyTranscripts NavBar__Link">
            About This Site
        </div>
        <div className="NavBar__Loginandsignout">
            <div onClick={goToLogin} className="NavBar__Loginandsignout NavBar__Link">
                Log In
            </div>
            <div onClick={goToSignUp} className="NavBar__Loginandsignout NavBar__Link">
                Sign Up
            </div>
            
        </div>
    </div>)
    }

    
}

export default NavBar