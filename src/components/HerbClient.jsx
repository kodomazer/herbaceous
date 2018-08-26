import React from 'react';
import { Client } from 'boardgame.io/react';
import makeGame from '../game/makeGame';
import Board from './board';

export default ({playerCount}) => {
  const ClientWithPlayers = Client({
    game: makeGame(playerCount),
    board: Board,
    // multiplayer: true,
    // debug: false,
  });
  return <ClientWithPlayers playerID={'0'}/>;
}
