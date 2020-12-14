import React, { useEffect, useState } from "react";

const SpeakerSection = (props) =>{
    const speakerName = props.speaker
    const stateUpdater = props.stateUpdater
    const number = props.number
    const sections = props.sections
    const changeSectionSpeaker = props.changeSectionSpeaker


    return(
        <>
        <div className="speakerSecontion" id={`speakerSection${number}`}>
            {speakerName + ":"}
        </div>
        </>
    )
}

export default SpeakerSection