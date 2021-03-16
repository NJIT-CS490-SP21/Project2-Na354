import React from 'react';
import './Board.css';
import { socket } from './App';

export function Reset() {
  function onClickButton() {
    console.log('resetbutton');
    socket.emit('Reset');
  }

  return (
    <div>
      <button onClick={onClickButton}>Reset Game</button>
    </div>
  );
}
