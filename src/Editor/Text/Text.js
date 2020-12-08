import React from "react"

const Text = (props) =>{
    const text = props.text
    const specialKey = props.specialKey
    const handleWordClick = props.handleWordClick
    const editorMode = props.editorMode === 2
    console.log(editorMode)
    const removeEditable = (e) =>{
        console.log("firering")
        props.setEditorMode(0)
    }
    return(
        <>
        {editorMode ? <div onBlur={removeEditable} contentEditable={true}>
                {text.map((el, i) =>{
                    return <span className="Editor__Word" onClick={handleWordClick} starttime={el.startTime} sectionindex={specialKey} wordindex={i} endtime={el.endTime} key={specialKey.toString() + i.toString()}>{el.formatted + " "}</span>
                })}
        </div> : <div>
            {text.map((el, i) =>{
                return <span className="Editor__Word" onClick={handleWordClick} starttime={el.startTime} sectionindex={specialKey} wordindex={i} endtime={el.endTime} key={specialKey.toString() + i.toString()}>{el.formatted + " "}</span>
            })}
    </div>}
    </> 
    )
}

export default Text