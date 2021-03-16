import React, { useState, useEffect } from 'react';
import './App.css';
import './Board.css';
import io from 'socket.io-client';
import { Board } from './Board';
import { LogIn, logedin } from './LogIn';
import { Reset } from './Reset';
import { Leaderboard, LeaderOpen } from './Leaderboard';
import { Display } from './DisplayL';

export const socket = io(); // Connects to socket connection

let id = '';
let loged = 0;
let isWinner = 'false';

function App() {
  const [myList, changeList] = useState([
    'false',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '0',
    '0',
  ]);

  const [Winner, DisplayWinner] = useState(['']);
  const [LeaderData, Updateboard] = useState(['']);

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
      // const newList = [...data.message];
      // console.log(newList);

      if (logedin === 'true' && loged === 0) {
        id = data.id;
        const newList = [...data.board];
        newList[10] = id;
        changeList(newList);

        loged++;
      }
      // AddPlayer(newList);
      // console.log(Players);
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
      if (LeaderOpen === 'true');
      const newList = [...data];
      console.log(newList);
      Updateboard(newList);
    });
  }, []);

  useEffect(() => {
    socket.on('winner', (data) => {
      console.log('winner detected');
      const newList = [Winner];
      newList[0] = data;
      DisplayWinner(newList);
      isWinner = 'true';
    });
  }, []);

  if (isWinner === 'true') {
    return (
      <div>
        {' '}
        The winner is:
        {' '}
        {Winner}
        {' '}
        <Reset />
        {' '}
      </div>
    );
  }

  if (LeaderOpen === 'true') {
    return (
      <div>
        <Leaderboard list={LeaderData} />
        <table>
          <tr>
            <th>Username</th>
            <th>rank</th>
            <th>wins</th>
          </tr>
          {LeaderData.map((item) => (
            <Display name={item} />
          ))}
        </table>
      </div>
    );
  } if (id !== '') {
    return (
      <div>
        {' '}
        <Board list={myList} changeList={changeList} />
        {' '}
        <Reset />
        {' '}
        <Leaderboard />
        {' '}
      </div>
    );
  } if (id === '') {
    return (
      <div>
        {' '}
        <LogIn />
        {' '}
      </div>
    );
  }
}

export default App;
