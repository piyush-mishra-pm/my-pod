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
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  songs,
  setSongs,
}) => {
  // nextPrevSong: song which will become active (after skipping fwd or bwd).
  const activeLibraryHandler = (nextPrevSong) => {
    const newSongs = songs.map((stateSong) => {
      if (stateSong.id === nextPrevSong.id) {
        return { ...stateSong, active: true };
      } else {
        return { ...stateSong, active: false };
      }
    });
    setSongs(newSongs);
  };

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

  const skipTrackHandler = async (direction) => {
    let currentSongIndex = songs.findIndex((s) => s.id === currentSong.id);
    if (direction === "forward") {
      // skip forward
      currentSongIndex++;
    } else {
      // skip back
      currentSongIndex--;
    }
    // mod ensures that index out of bounds don't happen.
    const newSongIndex = (songs.length + currentSongIndex) % songs.length;

    await setCurrentSong(songs[newSongIndex]);
    activeLibraryHandler(songs[newSongIndex]);

    if (isPlaying) audioRef.current.play();
  };

  // Styling for animated track background based on percentage song played.
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player-container">
      <h1>Player</h1>
      <div className="time-controls-container">
        <p>{formatTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
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
