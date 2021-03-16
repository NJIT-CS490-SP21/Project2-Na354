import React from 'react';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import {Username} from './LogIn.js';
import {socket} from './App.js';

export function Display(props) {
    const hStyle = { color: 'red' };
    console.log("displaying data");
    
    
    if (props.name[0] == Username){
        return(<tr>
    <td style={ hStyle }>{props.name[0]}</td>
    <td style={ hStyle }>{props.name[1]}</td>
    <td style={ hStyle }>{props.name[2]}</td>
    </tr>
            );
    }
    
    else
        return (
        <tr>
        <td>{props.name[0]}</td>
        <td>{props.name[1]}</td>
        <td>{props.name[2]}</td>
        </tr>);

}