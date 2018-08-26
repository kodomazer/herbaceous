import React,  {Component} from 'react';
import Player from './player';
import Garden from './garden';
import Deck from './deck';
import _ from 'lodash';

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

  onSelectPrivate = (playerId) => {
    console.log(playerId);
    this.props.moves.plantPrivate();
  }

  render() {
    const playerID = this.props.playerID;
    const players = this.props.G.players;
    const {selfPlayer, otherPlayers} = _.groupBy(players, ({id}) => id===playerID ? 'selfPlayer' : 'otherPlayers');
    return (
      <div className='board'>
        <Deck
          activeCard={this.props.G.activeCard}
          onDraw={this.onDraw}
        />
        <Garden
          gardenName={'Community Garden'}
          onSelect={this.onSelectCommunity}
          herbs={this.props.G.communityGarden}
        />
        <Player
          onSelect={this.onSelectPrivate.bind(null, this.props.playerID)}
          player={selfPlayer[0]}
          self={true}
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
