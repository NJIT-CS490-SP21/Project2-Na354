import logo from './logo.svg';
import './App.css';
import './Board.css';
import { Board } from './Board.js';
import { LogIn } from './LogIn.js';
import { Reset } from './Reset.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import {logedin} from './LogIn.js';

export const socket = io(); // Connects to socket connection

var id = '';
var player = '';
var lastTurn = '0';
export var haslogged = '';
var loged = 0;



function App() {
   const [myList, changeList] = useState(['false','','','','','','','','','','0','0']);
   const [Players, AddPlayer] = useState(['','','','','']);

    useEffect(() => {
    // Listening for a chat event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
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
      console.log("LOGGING IN");
      console.log(id);
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
    });
  }, []);



  if (id != ""){
      return (<div> <Board list={myList} changeList={changeList}/> <Reset/> </div>);
  }
  else
   return (
       <div>
       <LogIn/>
       </div>
       );
}

export default App;
