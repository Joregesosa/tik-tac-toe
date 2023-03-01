// import logo from './logo.svg';
// import './App.css';
import React, { useState } from 'react';
import { Title } from '../title';
import { TableContainer } from '../tableContainer';
import { TableItems } from '../tableItems';
import { Scores } from '../scores';
import { CustomPopUp } from '../customPopUp';

let playerChange = 2; // identicador de jugador en turno
let steps = 0; // conteo de movidas de cada jugador
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
let winner = false; // identificador de partida 
function App() {
  const [isActive, setActive] = React.useState(false);
  const [jugadas, setJugada] = React.useState(gameTable);
  const [score, setScore] = React.useState(scores);
  const [turn, setTurn] = React.useState(true);

  const player1 = " rocket_launch";
  const player2 = "flutter_dash";
  let gameResult = winner ? 'Player ' + playerChange : 'Empate';

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

  // logica del juego
  const play = (id) => {

    const jugadaIndex = jugadas.findIndex(jugada => jugada.id === id);
    const newGameTable = [...gameTable];

    // evitar modificacion de jugadas
    if (jugadas[jugadaIndex].value === '') {

      // cambio de turno
      playerChange = playerChange === 1 ? 2 : 1;
      setTurn(playerChange ===2) //cambio de turno a nivel grafico
      
      // verifica jugador en turno para establecer icon
      jugadas[jugadaIndex].value = playerChange === 1 ? player1 : player2;
      
      // guardar jugada
      setJugada(newGameTable);

      // aumentar el contador de jugadas
      steps++;

      if (steps > 4) {

        //function para analizar jugador despues de la cuarta jugada 
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
          if (steps == 9 && !isAwinner) {
            //  Actualizar empates
            updateScore(3);

            // llamar ventana PopUp
            setActive(true);
          }
        }

        //almacenar posibles convinaciones para ganar el juego
        let possibilities;

        /* 
           A partir del quinto paso se activan las posibilidadedes de que un jugador pueda ganar; 
           con la finalidad de evitar un analisis de todo el tablero de juego ,se establecio este SWITCH CASE 
           de manera que solo se analicen las posibilidades de ganar en base a la posicion en la que jugo el jugador 
           en turno.
        */
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


  return (
    <React.Fragment>

      <Title />

      <TableContainer>

        {jugadas.map(jugada => (
          <TableItems
            key={jugada.id}
            value={jugada.value}
            id={jugada.id}
            onClick={() => play(jugada.id)}
          />
        ))}

      </TableContainer>

      <Scores
        scores={score}
        playerTurn ={turn}
      />

      <CustomPopUp
        title={'WINNER'}
        subTitle={gameResult}
        buttonText={'New Game'}
        active={isActive}
        onClick={() => newGame()}
      />
    </React.Fragment>
  );
}

export default App;
