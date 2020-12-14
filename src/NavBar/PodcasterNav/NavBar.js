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
            <div onClick={logout} className="NavBar__Logout NavBar__Link">
                Log Out
            </div>
        </div>
    )
}

export default NavBar