import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Display } from './DisplayL.js';
import io from 'socket.io-client';

const socket = io();

export var LeaderOpen = 'false';


export function Leaderboard() {

const [data, changeData] = useState([['Abadio','100','5'], ['Sickist','96','3']]);


   function onClickButton(){
        
        if (LeaderOpen == 'false'){
            LeaderOpen = 'true';
        }
        else
            LeaderOpen = 'false';
        
        socket.emit('Leaderboard');
    }
    
    if(LeaderOpen == 'false') {
    return(
    <div><button onClick={onClickButton}>LeaderBoard</button></div>
    );
    }
    else
    return(<div> 
        <button onClick={onClickButton}>LeaderBoard</button> 
        
    </div>);
}