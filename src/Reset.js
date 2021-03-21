import React from "react";
import "./Reset.css";
import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
const socket = io();

export function Reset() {
  function onClickButton() {
    console.log("resetbutton");
    socket.emit("Reset");
  }

  return (
    
    <div className = 'bar'>
    <div className = 'center'>
      <button className = 'button' onClick={onClickButton}>Reset Game</button>
    </div>
    </div>
  );
}