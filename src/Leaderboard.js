import React from 'react';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

export var LeaderOpen = 'false';

export function Leaderboard() {
    
   function onClickButton(){
        console.log('LeaderBoardButton');
        
        if (LeaderOpen == 'false'){
            LeaderOpen = 'true';
        }
        else
            LeaderOpen = 'false';
        
        console.log(LeaderOpen);
        socket.emit('Leaderboard')
    }
    
    if(LeaderOpen == 'false') {
    return(
    <div><button onClick={onClickButton}>LeaderBoard</button></div>
    );
    }
    else
    return(<div> 
        <button onClick={onClickButton}>LeaderBoard</button> 
        <table>
            <tr>
                <th>Username</th>
                <th>rank</th>
                <th>wins</th>
            </tr>
    <td>Abadio</td>
    <td>100</td>
    <td>10</td>
    </table> 
    </div>);
}