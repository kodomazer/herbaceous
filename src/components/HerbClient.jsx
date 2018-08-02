import React from 'react';
import { Client } from 'boardgame.io/react';
import makeGame from '../game/makeGame';

export default ({playerCount}) => {
  const ClientWithPlayers = Client({game: makeGame(playerCount)});
  return <ClientWithPlayers/>;
}
