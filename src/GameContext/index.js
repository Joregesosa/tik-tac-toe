import React, {useState} from "react";
const GameContext = React.createContext();

/* Variables Generales */

let playerChange = 2; // identicador de jugador en turno
let steps = 0; // conteo de movidas de cada jugador
let popUpButtonText = 'New Game';
let popUpTitle = 'WINNER';
let gameTable = [
    { id: 'tbItm_sp_1', value: '' },
    { id: 'tbItm_sp_2', value: '' },
    { id: 'tbItm_sp_3', value: '' },
    { id: 'tbItm_sp_4', value: '' },
    { id: 'tbItm_sp_5', value: '' },
    { id: 'tbItm_sp_6', value: '' },
    { id: 'tbItm_sp_7', value: '' },
    { id: 'tbItm_sp_8', value: '' },
    { id: 'tbItm_sp_9', value: '' }
];// mesa de juego

let scores = [
    {
        player1: 0,
        player2: 0,
        empates: 0
    }];// puntuaciones de cada jugador

let winner = false; // identifica el estado de la partida

function GameProvider(props) {
    
    const [isActive, setActive] = useState(false);
    const [jugadas, setJugada] = useState(gameTable);
    const [score, setScore] = useState(scores);
    const [turn, setTurn] = useState(true);
    const player1 = " rocket_launch";
    const player2 = "flutter_dash";
    let gameResult = winner ? 'Player ' + playerChange : 'Empate';


    // logica del juego
    const play = (id) => {

        const jugadaIndex = jugadas.findIndex(jugada => jugada.id === id);
        const newGameTable = [...gameTable];

        // evitar modificacion de jugadas
        if (jugadas[jugadaIndex].value === '') {


            playerChange = playerChange === 1 ? 2 : 1; // cambio de turno
            setTurn(playerChange === 2) //cambio de turno a nivel grafico


            jugadas[jugadaIndex].value = playerChange === 1 ? player1 : player2; // verifica jugador en turno para establecer icon
            setJugada(newGameTable); // guardar jugada


            steps++;// aumentar el contador de jugadas

            /* 
                  A partir del quinto paso se activan las posibilidadedes de que un jugador pueda ganar; 
                  con la finalidad de evitar un analisis de todo el tablero de juego ,se establecio este SWITCH CASE  y el if (stepes > 4)
                  de manera que solo se analicen las posibilidades de ganar en base a la posicion en la que jugo el jugador 
                  en turno.
            */
            if (steps > 4) {


                let possibilities; //almacenar posibles convinaciones para ganar el juego ( solo para no redeclarar la variable)

                switch (jugadaIndex) {

                    case 0:

                        possibilities = [[0, 1, 2], [0, 3, 6], [0, 4, 8]];
                        winner = analizarTablero(possibilities);

                        break;
                    case 1:

                        possibilities = [[0, 1, 2], [1, 4, 7]];
                        winner = analizarTablero(possibilities);

                        break;
                    case 2:

                        possibilities = [[0, 1, 2], [2, 5, 8], [2, 4, 6]];
                        winner = analizarTablero(possibilities);

                        break;
                    case 3:

                        possibilities = [[3, 4, 5], [0, 3, 6]];
                        winner = analizarTablero(possibilities);

                        break;
                    case 4:

                        possibilities = [[3, 4, 5], [1, 4, 7], [0, 4, 8], [2, 4, 6]];
                        winner = analizarTablero(possibilities);

                        break;
                    case 5:

                        possibilities = [[3, 4, 5], [2, 5, 8]];
                        winner = analizarTablero(possibilities);

                        break;
                    case 6:

                        possibilities = [[0, 3, 6], [2, 4, 6], [6, 7, 8]];
                        winner = analizarTablero(possibilities);

                        break;
                    case 7:

                        possibilities = [[1, 4, 7], [6, 7, 8]];
                        winner = analizarTablero(possibilities);

                        break;
                    default:
                        possibilities = [[0, 4, 8], [2, 5, 8], [6, 7, 8]];
                        winner = analizarTablero(possibilities);
                        break;
                }
            }

        }

    };

    /* verificar si hay un ganador*/
    function analizarTablero(arr) {
        let isAwinner;
        for (let i = 0; i < arr.length; i++) {

            if ((jugadas[arr[i][0]].value === jugadas[arr[i][1]].value) &&
                (jugadas[arr[i][1]].value === jugadas[arr[i][2]].value)) {

                isAwinner = true;

                // actualizar score 
                updateScore(playerChange);


                // llamar ventana PopUp
                setActive(true);
                return isAwinner;
            }

        }

        /* comprobacion para empates */
        if (steps === 9 && !isAwinner) {
            //  Actualizar empates
            updateScore(3);

            // llamar ventana PopUp
            setActive(true);
        }
    }

    // actaulizar marcadores
    const updateScore = (val) => {
        const newScores = [...scores];
        switch (val) {
            case 1:
                newScores[0].player1++;
                break;
            case 2:
                newScores[0].player2++;
                break;
            default:
                newScores[0].empates++;
                break;
        }

        setScore(newScores);
    }

    //  onclick PopUp buttom
    const newGame = () => {
        const newGameTable = [...gameTable];
        newGameTable.forEach(element => {
            element.value = '';
        });
        setJugada(newGameTable);
        setActive(false);
        steps = 0;
    }
    
    return (
        <GameContext.Provider value={{
            jugadas,
            play,
            score,
            turn,
            popUpTitle,
            gameResult,
            popUpButtonText,
            isActive,
            newGame
        }}>

            {props.children}
        </GameContext.Provider>
    );
}

export {GameContext , GameProvider};