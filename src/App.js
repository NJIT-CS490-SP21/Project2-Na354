import logo from './logo.svg';
import './App.css';
import './Board.css';
import { Board } from './Board.js';
import { LogIn } from './LogIn.js';
import { Reset } from './Reset.js';
import { Leaderboard } from './Leaderboard.js';
import { Display } from './DisplayL.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import {logedin} from './LogIn.js';
import {LeaderOpen} from './Leaderboard.js';

export const socket = io(); // Connects to socket connection

var id = '';
var lastTurn = '0';
export var haslogged = '';
var loged = 0;
var isWinner = 'false';


function App() {
   const [myList, changeList] = useState(['false','','','','','','','','','','0','0']);
   const [Players, AddPlayer] = useState(['','','','','']);
   const [Winner, DisplayWinner] = useState(['']);
   const [Leader_Data, Updateboard] = useState(['']);
    
    
    
    
    useEffect(() => {
    socket.on('board', (data) => {
        const newList = [...data.message];
        newList[10] = id;

        console.log(newList);
        console.log(id);
        changeList(newList);
    });
  }, []);

  useEffect(() => {
    socket.on('LogIn', (data) => {
        //const newList = [...data.message];
       // console.log(newList);
        
    if (logedin == 'true' && loged == 0){
      id = data.id;
      const newList = [...data.board];
      newList[10] = id;
      changeList(newList);
 
      loged++;
     
    }
    //AddPlayer(newList);
    //console.log(Players);
    });
  }, []);
  
  useEffect(() => {
    socket.on('Reset', (data) => {
        const newList = [...data];
        id = '';
        loged--;
        console.log(newList);
        changeList(newList);
        isWinner = 'false';
    });
  }, []);
      
  useEffect(() => {
    
    socket.on('Leaderboard', (data) => {

    if (LeaderOpen == 'true');        
     const newList = [...data];
     console.log(newList);
     Updateboard(newList);
    });
  }, []);
  
  useEffect(() => {
    
    socket.on('winner', (data) => {
        console.log("winner detected");
        const newList = [Winner];
        newList[0] = data;
        DisplayWinner(newList);
        isWinner = 'true';
    
    });
  }, []);
  
      
  
    if(isWinner == 'true'){
        return(<div> The winner is: {Winner} <Reset/> </div>);
    }

    if (LeaderOpen == "true"){
        return(<div><Leaderboard list={Leader_Data}/>
        <table>
            <tr>
                <th>Username</th>
                <th>rank</th>
                <th>wins</th>
            </tr>
            {Leader_Data.map(item => <Display name={item} />)}
    
    </table>
    </div>);
        
    }

    else if (id != ""){
         return (<div> <Board list={myList} changeList={changeList}/> <Reset/> <Leaderboard/> </div>);
        
    }
    
    else if (id == "") {
        return (<div> <LogIn/> </div>);
        
    }
}

export default App;
