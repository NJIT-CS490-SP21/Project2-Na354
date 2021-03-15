import React from 'react';
import './Board.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import {socket} from './App.js';
export function Reset() {
    
    function onClickButton(){
        console.log('resetbutton');
        socket.emit('Reset');
    }
    
    return(
    <div>
    <button onClick={onClickButton}>Reset Game</button>
    </div>
    );
}