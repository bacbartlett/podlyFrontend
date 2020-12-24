import React from "react"
import { useHistory } from "react-router"

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
                            {(transcribeButton && (el.status === 0)) ? <button onClick={transcibeFunction(el.mediaUrl, el.title)}>Transcribe This Episode</button>: null}
                            {(transcribeButton && (el.status === 1)) ? <button >Pending</button>: null}
                            {(transcribeButton && (el.status === 2)) ? <button >Pending</button>: null}
                            {(transcribeButton && (el.status === 3)) ? <button onClick={viewTranscript(el.id)}>Review Transcript</button>: null}
                            {(transcribeButton && (el.status === 4)) ? <button onClick={viewTranscript(el.id)}>View Transcript</button>: null}
                        </div>
                    )
                })}
            </div>
        </div>
        </>
    )

}

export default EpisodeDisplay