import React from "react";
import Length from "./Length";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';


const Bar = (props) =>{
    const setClickedTime = (e) =>{
        const bar = document.querySelector(".AudioPlayer__TimeSlider").getBoundingClientRect();
        const percent = ((e.pageX - bar.left) / bar.width);
        
        props.setClickedTime(Math.floor(props.length * percent))
    }


    const PrettoSlider = withStyles({
        root: {
          color: '#1cb3ff',
          height: 8,
        },
        thumb: {
          height: 17,
          width: 17,
          backgroundColor: '#1cb3ff',
          border: '2px solid currentColor',
          marginTop: -4,
          marginLeft: -12,
          '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
          },
        },
        active: {},
        valueLabel: {
          left: 'calc(-50% + 4px)',
        },
        track: {
          height: 8,
          borderRadius: 4,
        },
        rail: {
          height: 8,
          borderRadius: 4,
        },
      })(Slider);
    return (
        <div className="AudioPlayer__Section AudioPlayer__LengthAndBar">
            <div className="AudioPlayer__LengthContainer">
                <Length length={props.length} currentTime={props.currentTime} />
            </div>
            <div onClick={setClickedTime} className="AudioPlayer__BarContainer">
                <PrettoSlider className={"AudioPlayer__TimeSlider"}  value={(props.currentTime/props.length) *100} />
            </div>
    </div>
    )
}

export default Bar;