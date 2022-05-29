import React, {useState} from 'react';

import "./styles/App.scss";

import Song from './Components/Song';
import Player from './Components/Player';

import data from './Assets/data';


function App() {

  const [songs, setSongs] = useState(data());
  const [currentSong,setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
      <div className="App">
          <h1>Music Player</h1>
          <Song currentSong={currentSong}/>
          <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong}/>
      </div>
  );
}

export default App;
