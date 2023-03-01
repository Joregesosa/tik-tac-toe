import React from "react";
import './customPopUp.css'
function CustomPopUp(props) {
    return (
        <div className={`customPopup--container ${props.active && 'active'} `}>


            <h2>{props.title}</h2>

            <h3>{props.subTitle}</h3>

            <button
                onClick={props.onClick}
            >{props.buttonText}</button>
        </div>
    )
}

export { CustomPopUp };