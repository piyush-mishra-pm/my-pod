import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,faAngleLeft,faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Player = () => {
    return (
        <div className="player-container">
            <h1>Player</h1>
            <div className="time-controls-container">
                <p>00:00</p>
                <input type="range" />
                <p>11:11</p>
            </div>
            <div className="play-controls-container">
                <FontAwesomeIcon className='skip-back' icon={faAngleLeft}/>
                <FontAwesomeIcon className='play' icon={faPlay}/>
                <FontAwesomeIcon className='skip-forward' icon={faAngleRight}/>
            </div>
        </div>
    );
};

export default Player;
