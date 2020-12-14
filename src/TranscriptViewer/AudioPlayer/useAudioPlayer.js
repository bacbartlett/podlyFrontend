import {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import {updateAudioIsLoaded} from "../../Store/actions"

const useAudioPlayer = (podcast, keepWithTime, editorMode, setEditorMode) =>{
    const dispatch = useDispatch()
    //const [length, setLegth] = useState(podcast.length);
    const [length, setLegth] = useState(0);
    const [currentTime, setCurrentTime] = useState();
    const [playing, setPlaying] = useState(false);
    const [clickedTime, setClickedTime] = useState(0);

    const makeSetAudioVolume = (audio) => (num) =>{
        audio.volume = num/100
    }


    useEffect(()=>{
        const audio = document.getElementById("audio");
        if(!audio){
            return
        }
        //dispatch(updateAudioIsLoaded(true))

        const setAudioData = () =>{
            setLegth(audio.duration);
            setCurrentTime(audio.currentTime);
        }

        const setAudioTime = () => {
            setCurrentTime(audio.currentTime);
            //
        }

        const spaceToPause = (e) =>{
            if(e.key === " "){
                setPlaying(!playing)
            }
        }


        audio.addEventListener("loadeddata", setAudioData);
        audio.addEventListener("timeupdate", keepWithTime);
        audio.addEventListener("timeupdate", setAudioTime);
        document.querySelector("body").addEventListener("keypress", spaceToPause)

        if(playing){
            audio.play();
        } else{
            audio.pause()
        };

        if (clickedTime && clickedTime !== currentTime) {
            audio.currentTime = clickedTime;
            setClickedTime(null);
          } 

        return ()=>{
            audio.removeEventListener("loadeddata", setAudioData);
            audio.removeEventListener("timeupdate", setAudioTime);
            audio.removeEventListener("timeupdate", keepWithTime)
            document.querySelector("body").removeEventListener("keypress", spaceToPause)
        }
    });

    useEffect(()=>{
        const audio = document.getElementById("audio");
        if(!audio){
            return
        }
        dispatch(updateAudioIsLoaded(true))

        const setAudioData = () =>{
            setLegth(audio.duration);
            setCurrentTime(0);
        }
        audio.currentTime = 0;
        const setAudioTime = () => setCurrentTime(audio.currentTime);

        audio.addEventListener("loadeddata", setAudioData);
        audio.addEventListener("timeupdate", setAudioTime);


        if(playing){
            audio.play();
        } else{
            audio.pause()
        };

        if (clickedTime && clickedTime !== currentTime) {
            audio.currentTime = clickedTime;
            setClickedTime(null);
          } 

        return ()=>{
            audio.removeEventListener("loadeddata", setAudioData);
            audio.removeEventListener("timeupdate", setAudioTime);
        }
    }, [podcast]);


    return{
        currentTime,
        length,
        playing,
        setPlaying,
        setClickedTime,
        makeSetAudioVolume,
    }
}

export default useAudioPlayer;