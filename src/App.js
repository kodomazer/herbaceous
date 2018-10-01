// src/App.js

import React from 'react';
import HerbClient from './components/HerbClient';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			playerCount:2,
		};
	}
	render(){
		return (
			<div>
				<select id="player-count" onChange={this.newGame}>
					<option value={4}>4</option>
					<option value={3}>3</option>
					<option value={2} selected="selected">2</option>
					<option value={1}>1</option>
				</select>
				<HerbClient playerCount={this.state.playerCount}/>
			</div>
		);
	}
	newGame = (event) => {
    const playerCount = event.target.value;
		this.setState({playerCount});
	}
}

export default App;
