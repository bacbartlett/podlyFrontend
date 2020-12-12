import {useState, useEffect} from "react";

const useAudioPlayer = (podcast) =>{

    //const [length, setLegth] = useState(podcast.length);
    const [length, setLegth] = useState(22);
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

        const setAudioData = () =>{
            setLegth(audio.duration);
            setCurrentTime(audio.currentTime);
        }

        const setAudioTime = () => {
            setCurrentTime(audio.currentTime);
            //
        }

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
    });

    useEffect(()=>{
        const audio = document.getElementById("audio");
        if(!audio){
            return
        }

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