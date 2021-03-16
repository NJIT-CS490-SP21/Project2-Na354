import React from "react";
import { useState, useRef, useEffect } from "react";
import { Display } from "./DisplayL.js";
import io from "socket.io-client";
import { socket } from "./App.js";

export var LeaderOpen = "false";

export function Leaderboard() {
  function onClickButton() {
    if (LeaderOpen == "false") {
      LeaderOpen = "true";
    } else LeaderOpen = "false";

    socket.emit("Leaderboard");
  }

  if (LeaderOpen == "false") {
    return (
      <div>
        <button onClick={onClickButton}>LeaderBoard</button>
      </div>
    );
  } else
    return (
      <div>
        <button onClick={onClickButton}>LeaderBoard</button>
      </div>
    );
}
