import React from 'react';
import './Board.css';
import PropTypes from 'prop-types';
import { socket } from './App';

export function Board(props) {
  Board.propTypes = {
    list: PropTypes.instanceOf(Array).isRequired,
  };
  function onClickButton(test) {
    const newList = [...props.list];
    if (props.list[10] === props.list[11]) {
      // console.log(newList);
      if (newList[0] === 'false' && newList[11] === '0') {
        if (newList[test] === '') {
          newList[test] = 'x';
          newList[0] = 'true';
          newList[11] = '1';
          console.log(newList);
          console.log('done with board.js');
          props.changeList(newList);
          socket.emit('board', { message: newList });
        }
      } else if (newList[test] === '') {
        newList[test] = 'o';
        newList[0] = 'false';
        newList[11] = '0';
        console.log(newList);
        console.log('done with board.js');
        props.changeList(newList);
        socket.emit('board', { message: newList });
      }
    } else {
      console.log(newList);
      console.log('props is working as such');
    }
  }
  const lister = props.list;

  return (
    <div className="board">
      <div role="button" tabIndex={0} onClick={() => onClickButton(1)} onKeyDown={() => onClickButton(1)} className="box">
        {' '}
        {lister[1]}
        {' '}
      </div>
      <div role="button" tabIndex={0} onClick={() => onClickButton(2)} onKeyDown={() => onClickButton(2)} className="box">
        {' '}
        {lister[2]}
        {' '}
      </div>
      <div role="button" tabIndex={0} onClick={() => onClickButton(3)} onKeyDown={() => onClickButton(3)} className="box">
        {' '}
        {lister[3]}
        {' '}
      </div>
      <div role="button" tabIndex={0} onClick={() => onClickButton(4)} onKeyDown={() => onClickButton(4)} className="box">
        {' '}
        {lister[4]}
        {' '}
      </div>
      <div role="button" tabIndex={0} onClick={() => onClickButton(5)} onKeyDown={() => onClickButton(5)} className="box">
        {' '}
        {lister[5]}
        {' '}
      </div>
      <div role="button" tabIndex={0} onClick={() => onClickButton(6)} onKeyDown={() => onClickButton(6)} className="box">
        {' '}
        {lister[6]}
        {' '}
      </div>
      <div role="button" tabIndex={0} onClick={() => onClickButton(7)} onKeyDown={() => onClickButton(7)} className="box">
        {' '}
        {lister[7]}
        {' '}
      </div>
      <div role="button" tabIndex={0} onClick={() => onClickButton(8)} onKeyDown={() => onClickButton(8)} className="box">
        {' '}
        {lister[8]}
        {' '}
      </div>
      <div role="button" tabIndex={0} onClick={() => onClickButton(9)} onKeyDown={() => onClickButton(9)} className="box">
        {' '}
        {lister[9]}
        {' '}
      </div>
    </div>
  );
}
export default Board;
