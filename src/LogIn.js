import React, { useRef } from 'react';
import './LogIn.css';
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
    <div className="container">
    <div className="login">
      <input className= "text" ref={inputRef} type="text" />
      <button className= "button" onClick={onClickButton}>Login</button>
    </div>
    </div>
  );
}
