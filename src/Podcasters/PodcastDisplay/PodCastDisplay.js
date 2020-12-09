import React from "react"


const PodcastDisplay = (props) =>{
    return(
        <p>{JSON.stringify(props.info)}</p>
    )
}

export default PodcastDisplay