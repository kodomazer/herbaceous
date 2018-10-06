import React , {Component} from 'react';
import { Client } from 'boardgame.io/react';
import makeGame from '../game/makeGame';
import BoardWrapper from './boardWrapper';

class PassToPlay extends Component {
  constructor(props) {
    super(props);

    this.ClientWithPlayers = Client({
      game: makeGame(this.props.playerCount),
      board: BoardWrapper,
      // multiplayer: true,
      // debug: false,
    });
  }

  render() {
    var ClientWithPlayers = this.ClientWithPlayers;
    return (
      <div>
        <ClientWithPlayers/>
      </div>
    );
  }
}

export default PassToPlay
