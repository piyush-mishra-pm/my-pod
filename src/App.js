import React, { useState, useRef } from "react";

import "./styles/App.scss";

import Song from "./Components/Song";
import Player from "./Components/Player";
import Library from "./Components/Library";
import Nav from "./Components/Nav";

import data from "./Assets/data";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  const audioRef = useRef(null);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    // Caltulate percentage played:
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animation = Math.round(100 * (roundedCurrent / roundedDuration));

    setSongInfo({
      ...songInfo,
      currentTime,
      duration,
      animationPercentage: animation,
    });
  };

  const autoSkipOnSongEndHandler = async () => {
    // Increment to the index for next song.
    let currentSongIndex = songs.findIndex((s) => s.id === currentSong.id) + 1;
    await setCurrentSong(
      songs[(songs.length + currentSongIndex) % songs.length]
    );

    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        audioRef={audioRef}
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
        isPlaying={isPlaying}
        libraryStatus={libraryStatus}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={autoSkipOnSongEndHandler}
      />
    </div>
  );
}

export default App;
