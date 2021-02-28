import React from 'react';
import './Board.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import {haslogged} from './App.js';
const socket = io();

export function LogIn() {
    
    const [UserName, ChangeName] = useState(['']);
    const inputRef = useRef(null);
    
    function onClickButton(){
        const userText = inputRef.current.value;
        ChangeName(userText);
        haslogged = 'test';
        socket.emit('LogIn', {message: userText});
    }
    
    return(
    <div>
    <input ref={inputRef} type="text"/>
    <button onClick={onClickButton}>Add to List</button>
    </div>
    );
}