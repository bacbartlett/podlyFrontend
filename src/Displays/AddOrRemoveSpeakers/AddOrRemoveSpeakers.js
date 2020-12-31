import React, { useEffect, useState } from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from "react-redux";
import {saveSpeakers, deleteSpeaker, addSpeaker, setSpeakers} from "../../Store/actions"

const AddOrRemoveSpeakers = (props) =>{
    const speakers = useSelector(state=>state.speakers)
    const dispatch = useDispatch()
    const {id} = props
    const [adding, setAdding] = useState(false)
    const [newSpeaker, setNewSpeaker] = useState("")
    const [stateSpeakers, setSpeakers] = useState(speakers)

    const createRemoveFunction = (speakerName) =>{
        return ()=>{
            console.log("running")
            dispatch(deleteSpeaker(speakerName))
        }
    }

    const changeAdding = () => setAdding(true)

    const handleTyping = e => setNewSpeaker(e.target.value)

    const saveSpeaker = e => {
        dispatch(addSpeaker(newSpeaker))
        setNewSpeaker("")
    }

    useEffect(()=>{
        return ()=>{
            saveSpeakers(id, speakers)
        }
    }, [speakers])

    useEffect(()=>{
        setSpeakers(speakers)
    }, [speakers])

    console.log(stateSpeakers, speakers)

    return(
        <div className="speakerEdit">
            {stateSpeakers.map((el, i)=>{
                return(<div className="speakerSection">
                <TextField id={`speaker ${i}`} type="text" value={speakers[i]} disabled label="Speaker" />
                <Button variant="contained" className="submitButton" onClick={createRemoveFunction(el)}>Remove</Button>
                </div>)
            })}
            {adding ? <div className="speakerSection">
                <TextField onChange={handleTyping} type="text" label={"Add Speaker"} id="addSpeakerInput" value={newSpeaker} />
                    <Button className="saveSpeaker" onClick={saveSpeaker} variant="contained" >Save Speaker </Button>
                    </div>
                 : <Button className="addSpeaker" onClick={changeAdding} variant="contained">Add Speaker </Button>}
        </div>
    )
}

export default AddOrRemoveSpeakers