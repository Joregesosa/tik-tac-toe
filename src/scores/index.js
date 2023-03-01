import React from "react";
import './socres.css'

function Scores(props) {
    return (
        <div className="scores_container">

            <h2>Scores</h2>
            <div>
                <span>
                    <h3 className={`${props.playerTurn && 'player--turn'}`}>Player 1</h3>
                    <p>{props.scores[0].player1}</p>
                </span>

                <span>
                    <h3 className={`${!props.playerTurn && 'player--turn'}`} >Player 2</h3>
                    <p>{props.scores[0].player2}</p>
                </span>

                <span>
                    <h3>Empates</h3>
                    <p>{props.scores[0].empates}</p>
                </span>
            </div>
        </div>
    )
}
export { Scores };