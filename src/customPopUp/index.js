import React from "react";
import { GameContext } from "../GameContext";
import './customPopUp.css'
function CustomPopUp() {
    const { popUpTitle, gameResult, popUpButtonText, isActive,
        newGame } = React.useContext(GameContext);
    return (
        <div className={`customPopup--container ${isActive && 'active'} `}>


            <h2>{popUpTitle}</h2>

            <h3>{gameResult}</h3>

            <button
                onClick={newGame}
            >{popUpButtonText}</button>
        </div>
    )
}

export { CustomPopUp };