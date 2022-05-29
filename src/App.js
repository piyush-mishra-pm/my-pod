import React from 'react';

import "./styles/App.scss";

import Song from './Components/Song';
import Player from './Components/Player';



function App() {
  return (
      <div className="App">
          <h1>Music Player</h1>
          <Song/>
          <Player/>
      </div>
  );
}

export default App;
