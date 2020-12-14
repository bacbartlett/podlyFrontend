import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import {updateWordArr} from "../../Store/actions"


const Text = (props) =>{
    const dispatch = useDispatch()
    const {text, specialKey, speaker} = props
    const editorMode = props.editorMode === 2
    

    //tell the editor to get the word arrs
    useEffect(()=>{
        dispatch(updateWordArr())
    }, [])

    

    return(
        <>
        <div>
            {text.map((el, i) =>{
                return <span className="Editor__Word" speaker={el.speaker} starttime={el.startTime} sectionindex={specialKey} wordindex={i} endtime={el.endTime} key={specialKey.toString() + i.toString()}>{el.formatted + " "}</span>
            })}
    </div>
    </> 
    )
}

export default Text