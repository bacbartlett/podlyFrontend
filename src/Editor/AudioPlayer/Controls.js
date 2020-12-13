import React from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import Replay10Icon from "@material-ui/icons/Replay10"
import Replay30Icon from "@material-ui/icons/Replay30"
import PauseIcon from '@material-ui/icons/Pause';
import Forward10Icon from '@material-ui/icons/Forward10';
import Forward30Icon from '@material-ui/icons/Forward30';


const Controls = (props) =>{

    const toggle = (e) =>{
        props.setPlaying(!props.playing)
    }

    const goBack30 = (e) =>{
        props.setClickedTime(document.getElementById("audio").currentTime - 30 )
    }

    const goBack10 = (e) =>{
        props.setClickedTime(document.getElementById("audio").currentTime - 10 )
    }

    const goForward10 = (e) =>{
        props.setClickedTime(document.getElementById("audio").currentTime + 10 )
    }

    const goForward30 = (e) =>{
        props.setClickedTime(document.getElementById("audio").currentTime + 30 )
    }

    const handleGoToNextSong = () => {
        console.log("Needs to be changed in controls")
    }

    const handleGoToPreviousSong = () => {
        console.log("Needs to be changed in controls")
        
    }

    return (
        <div className="AudioPlayer__Controls AudioPlayer__Section">
            <Replay30Icon onClick={goBack30} />
            <Replay10Icon onClick={goBack10} />
            {props.playing ? <PauseIcon onClick={toggle} /> : <PlayArrowIcon onClick={toggle} />}
            <Forward10Icon onClick={goForward10} />
            <Forward30Icon onClick={goForward30} />
        </div>
    )
}

export default Controls;