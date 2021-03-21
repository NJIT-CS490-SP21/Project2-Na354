import React from 'react';
import PropTypes from 'prop-types';
import { Username } from './LogIn';
import './Display.css';

export function Display(props) {
  Display.propTypes = {
    name: PropTypes.instanceOf(Array).isRequired,
  };
  const hStyle = { color: 'red' };
  console.log('displaying data');

  const lister = props.name;
  if (lister[0] === Username) {
    return (
      <tr>
        <td className = 'block' style={hStyle}>{lister[0]}</td>
        <td className = 'block' style={hStyle}>{lister[1]}</td>
        <td className = 'block' style={hStyle}>{lister[2]}</td>
      </tr>
    );
  } return (
    <tr>
      <td className = 'block'> {lister[0]}</td>
      <td className = 'block'>{lister[1]}</td>
      <td className = 'block'>{lister[2]}</td>
    </tr>
  );
}

export default Display;
