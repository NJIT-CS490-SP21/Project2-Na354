import React from 'react';
import './Board.css';
import { useState, useRef } from 'react';

export function Board() {
    const [myList, changeList] = useState(['false','','','','','','','','','']);
    
    function onClickButton(test){
        const newList = [...myList];
        if(newList[0] == 'false'){
            newList[test] = 'x';
            newList[0] = 'true';
        }
        else {
           newList[test] = "o";
           newList[0] = 'false';
        }
        
        changeList(newList);
    }
    

    return <div class="board">
  <div onClick={() => onClickButton(1)} class="box"> {myList[1]} </div>
  <div onClick={() => onClickButton(2)} class="box"> {myList[2]} </div>
  <div onClick={() => onClickButton(3)} class="box"> {myList[3]} </div>
  <div onClick={() => onClickButton(4)} class="box"> {myList[4]} </div>
  <div onClick={() => onClickButton(5)} class="box"> {myList[5]} </div>
  <div onClick={() => onClickButton(6)} class="box"> {myList[6]} </div>
  <div onClick={() => onClickButton(7)} class="box"> {myList[7]} </div>
  <div onClick={() => onClickButton(8)} class="box"> {myList[8]} </div>
  <div onClick={() => onClickButton(9)} class="box"> {myList[9]} </div>
</div>;
    
    }
   
    
