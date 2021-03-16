import React from 'react';
import PropTypes from 'prop-types';
import { Username } from './LogIn';

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
        <td style={hStyle}>{lister[0]}</td>
        <td style={hStyle}>{lister[1]}</td>
        <td style={hStyle}>{lister[2]}</td>
      </tr>
    );
  } return (
    <tr>
      <td>{lister[0]}</td>
      <td>{lister[1]}</td>
      <td>{lister[2]}</td>
    </tr>
  );
}
