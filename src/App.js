// src/App.js

import React from 'react';
import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';

const Herb = Game({
  setup: () => {
	let deck = MakeDeck();
	return {deck};
  },

  moves: {
    shuffle(G, ctx) {
      let deck = [...G.deck]; // don't mutate original state.
	  for(var i = deck.length-1;i>0;i--){
		  
        var j = Math.floor(ctx.random.Number() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
	  }
      return { ...G, deck }; // don't mutate original state.
    },
  },
});

const MakeDeck = () => {	
	var deck= Array(72).fill(null);
	var index = 0;
	var code = 'a';
	for(var i = 0;i<7;i++){
		for(var j = 0;j<9;j++){
			deck[index]=code;
			index++;
		}
		code=nextCard(code);
	}
	for(i = 1;i<4;i++){
		for(j = 0;j<3;j++){
			deck[index] = i;
			index++;
		}
	}
	return deck;
};

function nextCard(current){
	return String.fromCharCode(current.charCodeAt(0)+1)
}

const client = Client({ game: Herb });

class gameApp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			playerCount:0,
			current:client,
		};
	}
	setClient(client){
		this.setState({
			current:client,
		});
	}
	render(){
		const Client = this.state.current;
		return (
			<div>
				<select id="player-count" onChange={this.newGame}>
					<option value={4}>4</option>
					<option value={3}>3</option>
					<option value={2}>2</option>
					<option value={1}>1</option>
				</select>
				<Client/>
			</div>
		);
	}
	newGame=(event)=>{
		//TODO create new game with correct number of players
	}
}
const App = gameApp;

export default App;
