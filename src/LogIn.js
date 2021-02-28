import React from 'react';
import './Board.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
const socket = io();

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
    <button onClick={onClickButton}>Add to List</button>
    </div>
    );
}