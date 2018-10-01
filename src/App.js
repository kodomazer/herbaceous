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

	options = [1,2,3,4]
	
	render(){
		return (
			<div>
				<select id="player-count" onChange={this.newGame} value={this.state.playerCount}>
					{this.options.map((value) => {
						return <option value={value} key={value}>{value}</option>
					})}
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
