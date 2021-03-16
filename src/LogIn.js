import React from 'react';
import './Board.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import {socket} from './App.js';

export var logedin = '';
export var Username = '';
export function LogIn() {
    logedin = '';
    const inputRef = useRef(null);
    
    function onClickButton(){
        const userText = inputRef.current.value;
        Username = userText;
        logedin = 'true';
        socket.emit('LogIn', {message: userText});
    }
    
    return(
    <div>
    <input ref={inputRef} type="text"/>
    <button onClick={onClickButton}>Add to List</button>
    </div>
    );
}