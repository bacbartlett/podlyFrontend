import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import {updateWordArr} from "../../Store/actions"


const Text = (props) =>{
    const dispatch = useDispatch()
    const {text, specialKey, speaker} = props
 
    const editorMode = (props.editorMode === 2 || props.editorMode === 1)
    
    
    const reinsertMetaData = (e) =>{

        const spans = e.target.childNodes
        const results = []

        const selected = document.querySelectorAll(".Editor__SelectedWord")
        selected.forEach(el=>{
            el.classList.remove("Editor__SelectedWord")
        })

        
        for(let i = 0; i < spans.length; i++){
            let inner = spans[i].innerHTML.split("")
            

            //This was here to remove the highlighting, but removing the tag should work better
            // if((inner.includes("<") && inner.includes(">"))){
            //     const tempInner = []
            //     let insideTheBrackets = false
            //     for(let k = 0; k < inner.length; k++){
            //         if(inner[k]=== "<"){
            //             insideTheBrackets = true
            //         }
            //         if(!insideTheBrackets){
            //             tempInner.push(inner[k])
            //         }
            //         if(inner[k]=== ">"){
            //             insideTheBrackets = false
            //         }
            //     }
            //     inner = tempInner
            //     spans[i].innerHTML = tempInner.join("")
            // }
            


            let counter = 0;
            for(let j = 0; j < inner.length; j++){
                if(inner[j] === " "){
                    counter++
                }
                if(counter === 2){
                    const editted = {
                        index: i,
                        words: inner.join(""),
                        node: spans[i]
                    }
                    results.push(editted)
                    break
                }
            }
        }
        for(let i = 0; i < results.length; i++){
            const edit = results[i]
            let startTime
            if(results[i].index === 0){
                startTime = spans[1].getAttribute("starttime") - 1
            } else{
                startTime = spans[edit.index - 1].getAttribute("endtime")
            }
            let endTime
            if(results[i].index === spans.length -1){
                endTime = spans[spans.length - 2].getAttribute("endtime") + 1
            } else{
                endTime = spans[edit.index + 1].getAttribute("starttime")
            }
            const wordsArr = edit.words.split(" ")
            const timePerWord = (endTime - startTime) / wordsArr.length
            for(let i = 0; i < wordsArr.length; i++){
                const node = document.createElement("span")
                node.innerHTML = wordsArr[i] + " "
                //gets rid of dangling space
                if(i === wordsArr.length - 1){
                    node.innerHTML = wordsArr[i]
                }
                node.setAttribute("starttime", startTime + (timePerWord * i))
                node.setAttribute("endtime", startTime + (timePerWord * (i + 1)))
                node.setAttribute("sectionindex", specialKey)
                node.setAttribute("speaker", speaker)
                node.classList.add("Editor__Word")
                e.target.insertBefore(node, edit.node)
            }
            e.target.removeChild(edit.node)
            
            
        }

        dispatch(updateWordArr())
    }

    //tell the editor to get the word arrs
    useEffect(()=>{
        dispatch(updateWordArr())
    }, [])

    

    return(
        <>
        {editorMode ? <div onBlur={reinsertMetaData} id={specialKey} className={'textSection'} contentEditable={true}>
                {text.map((el, i) =>{
                    return <span className="Editor__Word"  speaker={el.speaker} starttime={el.startTime} sectionindex={specialKey} wordindex={i} endtime={el.endTime} key={specialKey.toString() + i.toString()}>{el.formatted + " "}</span>
                })}
        </div> : <div id={specialKey} className={'textSection'}>
            {text.map((el, i) =>{
                return <span className="Editor__Word" speaker={el.speaker} starttime={el.startTime} sectionindex={specialKey} wordindex={i} endtime={el.endTime} key={specialKey.toString() + i.toString()}>{el.formatted + " "}</span>
            })}
    </div>}
    </> 
    )
}

export default Text