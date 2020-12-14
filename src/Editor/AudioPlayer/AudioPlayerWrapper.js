import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AudioPlayer from "./AudioPlayer"

const AudioPlayerWrapper = (props) =>{
    const editorData = useSelector(state=>state.editorData)

    const [podcastUrl, setPodcastUrl] = useState({});

    useEffect(()=>{
        if(editorData && editorData.transcript && editorData.transcript.link){
            setPodcastUrl(editorData.transcript.link)
        }
    }, [editorData])

    return <AudioPlayer editorMode={props.editorMode} setEditorMode={props.setEditorMode} keepWithTime={props.keepWithTime} podcast={podcastUrl}/>
}

export default AudioPlayerWrapper