import logo from './logo.svg';
import './App.css';
import './Board.css';
import { Board } from './Board.js';
import { LogIn } from './LogIn.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection

var id = '';
var player = '';
var lastTurn = '0';
export var haslogged = '';



function App() {
   const [myList, changeList] = useState(['false','','','','','','','','','','0','0']);
  
    useEffect(() => {
    // Listening for a chat event emitted by the server. If received, we
    // run the code in the function that is passed in as the second arg
    socket.on('board', (data) => {
        const newList = [...data.message];
        newList[10] = id;
        console.log(newList);
        changeList(data.message);
    });
  }, []);
  
  
  useEffect(() => {
      
    socket.on('LogIn', (data) => {
    if (haslogged == ''){
      player = data.message;
      id = data.id;
      const newList = [...data.board];
      newList[10] = id;
      changeList(newList);
      console.log("LOGGING IN");
      console.log(id)
      haslogged = 'no need';
    }
    });
  }, []);
  
 
  
  if (id != ""){
      return (<div> <Board list={myList} changeList={changeList}/> </div>);
  }
  else
  console.log('NOT WORKING');
   return (
       <div>
       <LogIn/>
       </div>
       );
}

export default App;