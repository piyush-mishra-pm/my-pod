import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  audioRef,
  setSongInfo,
  songInfo,
  currentSong,
  isPlaying,
  setIsPlaying,
}) => {
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  return (
    <div className="player-container">
      <h1>Player</h1>
      <div className="time-controls-container">
        <p>{formatTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{formatTime(songInfo.duration)}</p>
      </div>
      <div className="play-controls-container">
        <FontAwesomeIcon className="skip-back" icon={faAngleLeft} />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon className="skip-forward" icon={faAngleRight} />
      </div>
    </div>
  );
};

function formatTime(time) {
  return (
    ("00" + Math.floor(time / 60)).slice(-2) +
    ":" +
    ("00" + Math.floor(time % 60)).slice(-2)
  );
}

export default Player;
