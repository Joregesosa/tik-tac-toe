import React from 'react';
import { AppUI } from './AppUI';
import { GameProvider } from '../GameContext';

function App() {

  return (
    <GameProvider>
      <AppUI/>
    </GameProvider>
  );
}

export default App;
