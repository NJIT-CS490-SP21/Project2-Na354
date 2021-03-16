import React from 'react';
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
      <div>
        <button type="button" tabIndex={0} onClick={onClickButton}>LeaderBoard</button>
      </div>
    );
  } return (
    <div>
      <button type="button" tabIndex={0} onClick={onClickButton}>LeaderBoard</button>
    </div>
  );
}
