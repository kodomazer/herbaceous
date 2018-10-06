import React,  {Component} from 'react';
import Player from './player';
import Garden from './garden';
import Deck from './deck';
import _ from 'lodash';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      G: props.G,
    };
  }

  onDraw = () => this.props.moves.pass() // TODO?

  onSelectCommunity = () => {
    this.props.moves.plantCommunity();
  }

  onSelectCommunityCard = (cardId) => {
      var card = _.find(this.state.G.communityGarden,({id}) => id === cardId);
      card.selected = !card.selected;     
      this.setState({G: this.state.G});
  }

  onSelectPrivate = (playerId) => {
    console.log(playerId);
    this.props.moves.plantPrivate();
  }

  onSelectPrivateCard = (playerId, cardId) => {
    var player = _.find(this.state.G.players,({id}) => id === playerId);
    var card = _.find(player.privateGarden, ({id}) => id === cardId);
    card.selected = !card.selected;
    this.setState({G: this.state.G});
  }

  render() {
    const playerID  = this.props.ctx.currentPlayer;
    // const playerID = this.props.playerID;
    const players = this.state.G.players;
    const {selfPlayer, otherPlayers} = _.groupBy(players, ({id}) => id===playerID ? 'selfPlayer' : 'otherPlayers');
    return (
      <div className='board'>
        <Deck
          activeCard={this.state.G.activeCard}
          onDraw={this.onDraw}
        />
        <Garden
          gardenName={'Community Garden'}
          onSelect={this.onSelectCommunity}
          onSelectCard={this.selectPublicCard}
          herbs={this.state.G.communityGarden}
        />
        <Player
          onSelect={this.onSelectPrivate.bind(null, this.props.playerID)}
          onSelectCard={this.selectPrivateCard}
          onSelectPot={this.selectPot}
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
