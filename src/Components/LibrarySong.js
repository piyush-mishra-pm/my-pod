import React from "react";
import { playAudio } from "../utils";

const LibrarySong = ({
  song,
  songs,
  setSongs,
  setCurrentSong,
  id,
  audioRef,
  isPlaying,
}) => {
  const songSelectHandler = () => {
    setCurrentSong(song);
    audioRef.current.play();

    // Set Selected song as active, and set others as inactive
    const newSongs = songs.map((stateSong) => {
      if (stateSong.id === id) {
        return { ...stateSong, active: true };
      } else {
        return { ...stateSong, active: false };
      }
    });

    setSongs(newSongs);
    playAudio(isPlaying, audioRef);
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song-item ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h4>{song.name}</h4>
        <h5>{song.artist}</h5>
      </div>
    </div>
  );
};

export default LibrarySong;
