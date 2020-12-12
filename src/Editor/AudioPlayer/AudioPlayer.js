import React from "react";
import useAudioPlayer from "./useAudioPlayer";
import Controls from "./Controls";
import Volume from "./Volume";
import Bar from "./Bar";

const AudioPlayer = (props) =>{
    const {currentTime, length, playing, setPlaying, setClickedTime, makeSetAudioVolume} = useAudioPlayer(props.podcast)
    if(!props.podcast){
        return null
    }
    return(
        <div className="AudioPlayer">
            <audio id="audio" src={props.podcast}/>
            <Volume makeSetAudioVolume={makeSetAudioVolume} />
            <Bar setClickedTime={setClickedTime} length={length} currentTime={currentTime} />
            <Controls setPlaying={setPlaying} playing={playing} />
        </div>
        
    )
    
}

export default AudioPlayer;