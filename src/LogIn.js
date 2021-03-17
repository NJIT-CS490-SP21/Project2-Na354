import React, { useRef } from 'react';
import './Board.css';
import { socket } from './App';

export let logedin = '';
export let Username = '';
export function LogIn() {
  logedin = '';
  const inputRef = useRef(null);

  function onClickButton() {
    const userText = inputRef.current.value;
    Username = userText;
    logedin = 'true';
    socket.emit('LogIn', { message: userText });
  }

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={onClickButton}>Add to List</button>
    </div>
  );
}
