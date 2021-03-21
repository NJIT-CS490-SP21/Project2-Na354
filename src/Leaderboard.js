import React from 'react';
import './Leaderboard.css';
import { socket } from './App';

export var LeaderOpen = 'false';

export function Leaderboard() {
  function onClickButton() {
    if (LeaderOpen === 'false') {
      LeaderOpen = 'true';
    } else LeaderOpen = 'false';

    socket.emit('Leaderboard');
  }

  if (LeaderOpen === 'false') {
    return (
      <div className = 'bar-2'>
        <button className = "button" tabIndex={0} onClick={onClickButton}>LeaderBoard</button>
      </div>
    );
  } return (
    <div className = 'bar-2'>
      <button className="button" tabIndex={0} onClick={onClickButton}>LeaderBoard</button>
    </div>
  );
}
