import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { playAudio } from "../utils";

const Player = ({
  audioRef,
  setSongInfo,
  songInfo,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  songs,
  setSongs,
}) => {
  useEffect(
    () => {
      const newSongs = songs.map((stateSong) => {
        if (stateSong.id === currentSong.id) {
          return { ...stateSong, active: true };
        } else {
          return { ...stateSong, active: false };
        }
      });
      setSongs(newSongs);
    },
    // Runs everytime when our current song gets updated.
    [currentSong]
  );

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

  const skipTrackHandler = (direction) => {
    let currentSongIndex = songs.findIndex((s) => s.id === currentSong.id);
    if (direction === "forward") {
      // skip forward
      currentSongIndex++;
    } else {
      // skip back
      currentSongIndex--;
    }
    // mod ensures that index out of bounds don't happen.
    setCurrentSong(songs[(songs.length + currentSongIndex) % songs.length]);
    playAudio(isPlaying, audioRef);
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
        <FontAwesomeIcon
          className="skip-back"
          onClick={() => skipTrackHandler("back")}
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          onClick={() => skipTrackHandler("forward")}
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

function formatTime(time) {
  if (!time) return "00:00";
  else
    return (
      ("00" + Math.floor(time / 60)).slice(-2) +
      ":" +
      ("00" + Math.floor(time % 60)).slice(-2)
    );
}

export default Player;
