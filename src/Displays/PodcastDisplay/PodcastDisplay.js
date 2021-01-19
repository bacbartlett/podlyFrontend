import React, { useState } from "react"
import { useHistory } from "react-router"

//this expects an array of podcast objects
//a podcast object is the model from the database
const PodcastDisplay = (props) =>{
    const {podcasts, clickStub, title, additionOption} = props
    const {results, totalPages} = podcasts
    const history = useHistory()

    const [displayModule, setDisplayModule] = useState(false)

    const createClickFunction = (id) =>{
        return () =>{
            history.push(clickStub + "/" + id)
        }
    }

    return(
        <>
        <div className="center" key={1}>
        <h2>{title}</h2>
        </div>
        <div className="center" key={2}>
        <div className="podcastDisplay">
            {results.map((el, i) =>{
                return(
                    <div className="podcastDisplayAdjuster" key={i}>
                        <div onClick={createClickFunction(el.id)} className="podcastDisplay__Image" style={{backgroundImage:`url(${el.photoUrl})`}}>
                            <div className="podcastDisplay__Title">
                                {el.name}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        </div>
        </>
    )
}

export default PodcastDisplay