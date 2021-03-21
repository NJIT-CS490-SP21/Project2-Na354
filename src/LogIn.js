import React from 'react';
import './Board.css';
import { useState, useRef, useEffect } from 'react';
import { socket } from './App';

export var logedin = '';

export function LogIn() {
    logedin = '';
    const inputRef = useRef(null);
    
    function onClickButton(){
        const userText = inputRef.current.value;
        logedin = 'true';
        socket.emit('LogIn', {message: userText});
    }
    
    return(
    <div>
    <input ref={inputRef} type="text"/>
    <button onClick={onClickButton}>Login</button>
    </div>
    );
}
