import React from 'react';
import Board from './board';

export default (props) => (
  <Board
    {...props}
    key={props.ctx.currentPlayerMoves}
  />
)