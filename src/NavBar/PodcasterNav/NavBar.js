import React from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import {removeUser} from "../../Store/actions"

const NavBar = (props) =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const logout = () =>{
        // document.cookie = "loginToken="
        history.push("/")
        dispatch(removeUser())
    }

    const goToAbout = () =>{
        history.push("/about")
    }

    const goToMyPodcasts = () =>{
        history.push("/podcaster")
    }

    const goToPendingJobs = () => {
        history.push("/podcaster/pendingjobs")
    }

    const goHome = () =>{
        history.push("/")
    }

    return(
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
}

export default NavBar