import React from "react";
import useAudioPlayer from "./useAudioPlayer";
import Controls from "./Controls";
import Volume from "./Volume";
import Bar from "./Bar";

const AudioPlayer = (props) =>{
    const {currentTime, length, playing, setPlaying, setClickedTime, makeSetAudioVolume} = useAudioPlayer(props.podcast, props.keepWithTime)
    if(!props.podcast || !props.podcast.length){
        return null
    }
    return(
        <div className="AudioPlayer">
            <audio id="audio" src={props.podcast}/>
            <Volume makeSetAudioVolume={makeSetAudioVolume} />
            <Bar setClickedTime={setClickedTime} length={length} currentTime={currentTime} />
            <Controls setClickedTime={setClickedTime} setPlaying={setPlaying} playing={playing} />
        </div>
        
    )
    
}

export default AudioPlayer;