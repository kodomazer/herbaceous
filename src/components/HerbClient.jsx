import React , {Component} from 'react';
import { Client } from 'boardgame.io/react';
import makeGame from '../game/makeGame';
import Board from './board';

class PassToPlay extends Component {
  constructor(props) {
    super(props);

    this.ClientWithPlayers = Client({
      game: makeGame(this.props.playerCount),
      board: Board,
      // multiplayer: true,
      // debug: false,
    });
    this.state = {
      playerNum: 0,
    }
  }

  passPlayer = (e) => {
    e.preventDefault();
    var nextPlayer = this.state.playerNum + 1;
    if (nextPlayer >= this.props.playerCount) {
      nextPlayer = 0;
    }
    this.setState({playerNum:nextPlayer});
  }

  render() {
    var ClientWithPlayers = this.ClientWithPlayers;
    return (
      <div>
        <button onClick={this.passPlayer}> Pass Board To Next Player</button>
        <ClientWithPlayers playerID={this.state.playerNum.toString()}/>
      </div>
    );
  }
}

export default PassToPlay
