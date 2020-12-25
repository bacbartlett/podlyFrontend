import React from "react"
import { useHistory } from "react-router"
import Button from '@material-ui/core/Button';

const EpisodeDisplay = (props) =>{
    const {episodes, title, clickStub, transcribeButton, transcibeFunction} = props
    const history = useHistory()

    if(!episodes || !episodes.length){
        return <h2>Nothing to Display</h2>
    }

    const divClick = (id) =>{
        return () =>{
        if(transcribeButton){
            return
        } else{
            history.push(clickStub + "/" + id)
        }
    }
    }

    const viewTranscript = (id) =>{
        return ()=>{
            if(!id){
                return
            }
            history.push(clickStub + "/" + id)
        }
        
    }

    if(!episodes || !episodes.length){
        return <h2>Loading</h2>
    }

    return(
        <>
        <div className="center">
            <h2>{title}</h2>
        </div>
        <div className="center">
            <div className="episodeDisplay">
                {episodes.map((el, i)=>{
                    return(
                        <div className="episodeDisplay__Episode" onClick={divClick(el.id)} key={i}>
                            <div style={{backgroundImage: `url(${el.image})`}} className="episodeDisplay__image">
                            </div>
                            <div className="episodeDisplay__title episodeDisplay__data">
                                {el.title}
                            </div>
                            <div className="episodeDisplay__Speakers episodeDisplay__data">
                                {el.Speakers.map((el, i)=>{
                                    if(i>0){
                                        return `, ${el.name}`
                                    } else{
                                        return `${el.name}`
                                    }
                                })}
                            </div>
                            <div className="episodeDisplay__Podcastname episodeDisplay__data">
                                {el.podcastTitle}
                            </div>
                            <div className="episodeDisplay__duration episodeDisplay__data">
                                {el.duration}
                            </div>
                            {(transcribeButton && (el.status === 0)) ? <Button variant={"contained"} onClick={transcibeFunction(el.mediaUrl, el.title)}>Transcribe This Episode</Button>: null}
                            {(transcribeButton && (el.status === 1)) ? <Button variant={"contained"}>Pending</Button>: null}
                            {(transcribeButton && (el.status === 2)) ? <Button variant={"contained"}>Pending</Button>: null}
                            {(transcribeButton && (el.status === 3)) ? <Button variant={"contained"} onClick={viewTranscript(el.id)}>Review Transcript</Button>: null}
                            {(transcribeButton && (el.status === 4)) ? <Button variant={"contained"} onClick={viewTranscript(el.id)}>View Transcript</Button>: null}
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )

}

export default EpisodeDisplay