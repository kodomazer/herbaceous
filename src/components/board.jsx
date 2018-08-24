import React,  {Component} from 'react';
import Player from './player';
import Garden from './garden';
import Deck from './deck';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
    };
  }

  onDraw = () => this.props.moves.pass() // TODO?

  onSelectCommunity = () => {
    this.props.moves.plantCommunity();
  }

  onSelectPrivate = (playerId, event) => {
    console.log(playerId);
    event && event.preventDefault();
    this.props.moves.plantPrivate();
  }

  render() {
    const playerID = this.props.playerID;
    const players = this.props.G.players;
    const selfPlayer = players.find(({id}) => {
      return id === playerID;
    });
    const otherPlayers = players.filter(({id}) => id !== playerID);
    return (
      <div>
        <Deck
          activeCard={this.props.G.activeCard}
          onDraw={this.onDraw}
        />
        <Garden
          onSelect={this.onSelectCommunity}
          herbs={this.props.G.communityGarden}
        />
        <Player
          onSelect={this.onSelectPrivate.bind(null, this.props.playerID)}
          player={selfPlayer}
        />
      {otherPlayers.map((player) => (
        <Player
          key={player.id}
          onSelect={this.onSelectPrivate.bind(null, player.id)}
          player={player}
        />
      ))}
      </div>
    );
  }
}
export default Board
