import React from "react";

const SpeakerSection = (props) =>{
    const speakerName = props.speaker
    const stateUpdater = props.stateUpdater

    return(
        <div className="speakerSecontion">
            <h3>{speakerName}:</h3>
        </div>
    )
}

export default SpeakerSection