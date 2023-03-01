import React from "react";
import { GameContext } from "../GameContext";
import './socres.css'

function Scores() {
    const { score, turn } = React.useContext(GameContext);
    return (
        <div className="scores_container">

            <h2>Scores</h2>
            <div>
                <span>
                    <h3 className={`${turn && 'player--turn'}`}>Player 1</h3>
                    <p>{score[0].player1}</p>
                </span>

                <span>
                    <h3 className={`${!turn && 'player--turn'}`} >Player 2</h3>
                    <p>{score[0].player2}</p>
                </span>

                <span>
                    <h3>Empates</h3>
                    <p>{score[0].empates}</p>
                </span>
            </div>
        </div>
    )
}
export { Scores };